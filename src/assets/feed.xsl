<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="utf-8" indent="yes"
    doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="atom:feed/atom:title"/> — RSS feed</title>
        <style>
          :root {
            --bg:#08111f; --panel:#0f172a; --text:#e5edf7; --muted:#9fb0c7;
            --accent:#38bdf8; --line:rgba(159,176,199,0.18);
            --font:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }
          @media (prefers-color-scheme: light) {
            :root { --bg:#f8fafc; --panel:#ffffff; --text:#0f172a;
                    --muted:#475569; --accent:#0369a1; --line:rgba(15,23,42,0.12); }
          }
          * { box-sizing: border-box; }
          body { margin:0; font-family:var(--font); background:var(--bg);
                 color:var(--text); line-height:1.6; }
          .wrap { max-width:720px; margin:0 auto; padding:3rem 1.25rem 4rem; }
          .eyebrow { color:var(--accent); font-weight:700; letter-spacing:0.12em;
                     text-transform:uppercase; font-size:0.8rem; margin:0 0 0.5rem; }
          h1 { font-size:clamp(1.6rem,4vw,2.3rem); margin:0 0 0.5rem; line-height:1.15; }
          .subtitle { color:var(--muted); font-size:1.1rem; margin:0 0 2rem; }
          .banner { border:1px solid var(--line); background:var(--panel);
                    border-radius:14px; padding:1.1rem 1.25rem; margin-bottom:2.5rem;
                    color:var(--muted); font-size:0.95rem; }
          .banner strong { color:var(--text); }
          .url { font-family:ui-monospace,Consolas,monospace; background:var(--bg);
                 border:1px solid var(--line); border-radius:8px; padding:0.5rem 0.7rem;
                 display:inline-block; margin-top:0.75rem; color:var(--text);
                 word-break:break-all; }
          ul { list-style:none; padding:0; margin:0; }
          li { border-top:1px solid var(--line); padding:1.25rem 0; }
          .date { display:block; color:var(--accent); font-weight:700;
                  font-size:0.8rem; margin-bottom:0.35rem; }
          li a { color:var(--text); text-decoration:none; font-weight:600; font-size:1.15rem; }
          li a:hover { color:var(--accent); }
          .home { display:inline-block; margin-top:2.5rem; color:var(--accent);
                  text-decoration:none; font-weight:700; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <p class="eyebrow">RSS feed</p>
          <h1><xsl:value-of select="atom:feed/atom:title"/></h1>
          <p class="subtitle"><xsl:value-of select="atom:feed/atom:subtitle"/></p>
          <div class="banner">
            <strong>This is a web feed,</strong> meant for a feed reader rather than a browser.
            Copy the address below into a reader (NetNewsWire, Feedly, Inoreader, …) to subscribe
            and get new posts automatically.
            <div><span class="url"><xsl:value-of select="atom:feed/atom:link[@rel='self']/@href"/></span></div>
          </div>
          <ul>
            <xsl:for-each select="atom:feed/atom:entry">
              <li>
                <span class="date"><xsl:value-of select="substring(atom:updated,1,10)"/></span>
                <a href="{atom:link/@href}"><xsl:value-of select="atom:title"/></a>
              </li>
            </xsl:for-each>
          </ul>
          <a class="home" href="{atom:feed/atom:link[not(@rel)]/@href}">← Back to the site</a>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
