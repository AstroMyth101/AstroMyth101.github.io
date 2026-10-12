'use strict';
const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const origin = process.env.PR37_BASE_URL || 'http://127.0.0.1:8765';
const results = [];
const faults = [];

async function test(name, run) {
  try {
    const detail = await run();
    results.push({name, ok:true, detail:detail || 'passed'});
  } catch (err) {
    results.push({name, ok:false, detail:err.stack || String(err)});
  }
}
function capture(page, label) {
  page.on('pageerror', e => faults.push(label + ': pageerror: ' + e.message));
  page.on('requestfailed', request => faults.push(label + ': request failed: ' + request.url() + ' ' + request.failure()?.errorText));
}
async function navigate(page, route) {
  const response = await page.goto(origin + route, {waitUntil:'load',timeout:20000});
  assert.equal(response?.status(), 200, route + ' HTTP status');
  await page.locator('body').waitFor();
}
function themeColor(theme) {return theme==='dark' ? '#070d19' : '#eef2f8';}
async function checkTheme(page, theme) {
  assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
  assert.equal(await page.locator('meta[name="theme-color"]').getAttribute('content'),themeColor(theme));
  assert.equal(await page.locator('.theme-toggle').getAttribute('aria-label'), theme==='dark' ? 'Switch to light theme' : 'Switch to dark theme');
}
(async () => {
  const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  try {
    const desktop = await browser.newContext({viewport:{width:1365,height:900},colorScheme:'dark',reducedMotion:'reduce'});
    const page = await desktop.newPage(); capture(page,'desktop');
    await test('Homepage and initial system dark theme',async()=>{
      await navigate(page,'/');
      assert.equal(await page.locator('html').getAttribute('class'),'js');
      await checkTheme(page,'dark');
      assert.equal(await page.locator('script[src="/assets/js/theme-init.js"]').count(),1);
      return 'dark initialized via external JS';
    });
    await test('CSP blocks inline JavaScript (violation event)',async()=>{
      const out=await page.evaluate(async()=>{
        const meta=document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        const policy=meta?.content || '';
        let fired=false;
        const promise=new Promise(resolve=>{
          const listener=e=>{if(e.violatedDirective.startsWith('script-src')) {fired=true;resolve(e.violatedDirective);}};
          document.addEventListener('securitypolicyviolation',listener,{once:true});
          setTimeout(()=>resolve(null),2000);
        });
        const script=document.createElement('script');
        script.textContent='window.__pr37InjectedScriptExecuted = true;';
        document.body.appendChild(script);
        const directive=await promise;
        return {policy, directive, executed:!!window.__pr37InjectedScriptExecuted};
      });
      assert.match(out.policy,/script-src 'self'/);
      assert.doesNotMatch(out.policy,/script-src[^;]*'unsafe-inline'/);
      assert.equal(out.executed,false);
      assert.match(out.directive||'',/^script-src/);
      return 'inline script blocked; violation '+out.directive;
    });
    await test('Theme button changes color, aria-label, and localStorage',async()=>{
      await page.locator('.theme-toggle').click();
      await page.waitForFunction(()=>document.documentElement.dataset.theme==='light');
      await checkTheme(page,'light');
      assert.equal(await page.evaluate(()=>localStorage.getItem('theme')),'light');
      return 'dark → light persisted';
    });
    await test('Theme preference survives a page reload',async()=>{
      await page.reload({waitUntil:'load'});
      await checkTheme(page,'light');
      return 'light persisted across reload';
    });
    await test('Theme can switch back and survive another reload',async()=>{
      await page.locator('.theme-toggle').click();
      await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
      await page.reload({waitUntil:'load'});
      await checkTheme(page,'dark');
      assert.equal(await page.evaluate(()=>localStorage.getItem('theme')),'dark');
      return 'light → dark, persisted';
    });
    await test('System light theme is respected with no saved preference',async()=>{
      const ctx=await browser.newContext({viewport:{width:1100,height:800},colorScheme:'light',reducedMotion:'reduce'});
      try{
        const p=await ctx.newPage();capture(p,'system-light');
        await navigate(p,'/');
        await checkTheme(p,'light');
        assert.equal(await p.evaluate(()=>localStorage.getItem('theme')),null);
        return 'light system preference detected';
      }finally{await ctx.close();}
    });
    await test('Initializer executes before DOMContentLoaded',async()=>{
      const ctx=await browser.newContext({colorScheme:'dark',reducedMotion:'reduce'});
      try{
        const p=await ctx.newPage();capture(p,'head-timing');
        await p.addInitScript(()=>{
          document.addEventListener('DOMContentLoaded',()=>{
            window.__pr37AtDCL={js:document.documentElement.classList.contains('js'),theme:document.documentElement.dataset.theme};
          },{once:true});
        });
        await navigate(p,'/');
        assert.deepEqual(await p.evaluate(()=>window.__pr37AtDCL),{js:true,theme:'dark'});
        return 'initialized by DOMContentLoaded (not direct paint measurement)';
      }finally{await ctx.close();}
    });
    await desktop.close();

    const mobile=await browser.newContext({viewport:{width:390,height:844},colorScheme:'dark',reducedMotion:'no-preference',isMobile:true,hasTouch:true});
    const m=await mobile.newPage();capture(m,'mobile');
    await test('Mobile navigation opens and Escape closes',async()=>{
      await navigate(m,'/');
      const toggle=m.locator('.nav-toggle');
      const links=m.locator('#nav-links');
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-expanded'),'true');
      assert.match(await links.getAttribute('class')||'',/is-open/);
      await m.keyboard.press('Escape');
      assert.equal(await toggle.getAttribute('aria-expanded'),'false');
      assert.doesNotMatch(await links.getAttribute('class')||'',/is-open/);
      return 'menu opened and closed';
    });
    await test('Hero canvas initializes and is visible under motion enabled',async()=>{
      const canvas=m.locator('canvas[data-canvas="scope"]');
      assert.equal(await canvas.count(),1);
      await canvas.scrollIntoViewIfNeeded();
      await m.waitForFunction(()=>{
        const c=document.querySelector('canvas[data-canvas="scope"]');
        return c && c.width>0 && c.height>0 && c.classList.contains('is-armed') && c.getContext('2d');
      },null,{timeout:6000});
      const v=await canvas.evaluate(c=>({width:c.width,height:c.height,live:c.classList.contains('is-live')}));
      assert.ok(v.width>0&&v.height>0);
      return JSON.stringify(v);
    });
    await test('Project navigation follows a real link',async()=>{
      await m.locator('.nav-toggle').click();
      await m.locator('#nav-links a[href="/projects/"]').click();
      await m.waitForURL('**/projects/');
      assert.equal(await m.locator('main').count(),1);
      return 'navigated to /projects/';
    });
    await mobile.close();

    await test('Built AVIF/WebP images decode across project pages',async()=>{
      const ctx=await browser.newContext({viewport:{width:1280,height:960},reducedMotion:'reduce'});
      try{
        const p=await ctx.newPage();capture(p,'images');
        const routes=['/','/projects/','/projects/speed-reduction-gearbox/','/projects/pipe-inspection-robot/','/projects/soft-robotic-glove/'];
        let decoded=0,sourceFormats=new Set(),imageRoutes=0;
        for(const route of routes){
          await navigate(p,route);
          const count=await p.locator('img[src]').count();
          if(count===0)continue;
          imageRoutes++;
          const found=await p.evaluate(async()=>{
            const imgs=[...document.querySelectorAll('img[src]')];
            const sources=[...document.querySelectorAll('picture source')].map(x=>x.type);
            for(const img of imgs){
              img.loading='eager';
              await img.decode();
              if(!img.naturalWidth || !img.naturalHeight)throw Error('Image missing dimensions: '+img.currentSrc);
            }
            return {images:imgs.length,sources};
          });
          decoded+=found.images;
          for(const s of found.sources)sourceFormats.add(s);
        }
        assert.ok(imageRoutes>=3,'Too few representative pages with images');
        assert.ok(decoded>=8,'Too few decoded images: '+decoded);
        assert.ok(sourceFormats.has('image/avif'),'AVIF responsive source missing');
        assert.ok(sourceFormats.has('image/webp'),'WebP responsive source missing');
        return JSON.stringify({routes:routes.length,imageRoutes,decoded,formats:[...sourceFormats]});
      }finally{await ctx.close();}
    });
    await test('Unexpected script/page/network errors',async()=>{
      // The CSP probe deliberately emits a script-src console error, not a pageerror.
      assert.deepEqual(faults,[]);
      return 'no pageerrors or failed requests';
    });
  }finally{await browser.close();}
  console.log('PR37_PLAYWRIGHT_REPORT '+JSON.stringify({passed:results.filter(x=>x.ok).length,failed:results.filter(x=>!x.ok).length,results}));
  if(results.some(x=>!x.ok))process.exitCode=1;
})().catch(e=>{console.error('PR37_PLAYWRIGHT_FATAL',e.stack||String(e));process.exitCode=1;});
