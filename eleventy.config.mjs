import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import Image from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

// Optimize a source image (in src/_images/...) into responsive webp + original format.
async function imageShortcode(src, alt = "", sizes = "(min-width: 760px) 720px, 100vw") {
  const metadata = await Image(src, {
    widths: [480, 960, 1440],
    formats: ["webp", null],
    outputDir: "./_site/assets/img/",
    urlPath: "/assets/img/",
  });
  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  });
}

export default function (eleventyConfig) {
  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    stylesheet: "/assets/feed.xsl",
    collection: { name: "posts", limit: 0 },
    metadata: {
      language: "en",
      title: "Rashid Al-Ma'awali — Writing",
      subtitle: "Notes on embedded control, robotics, and mechatronics.",
      base: "https://AstroMyth101.github.io/",
      author: { name: "Rashid Al-Ma'awali" },
    },
  });

  // ---- Passthrough copy (assets served at site root) ----
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Rebuild when CSS/JS change during `--serve`
  eleventyConfig.addWatchTarget("src/assets/");

  // ---- Markdown library (HTML allowed, self-linking heading anchors) ----
  const md = markdownIt({ html: true, linkify: true, typographer: true }).use(
    markdownItAnchor,
    {
      permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
      level: [2, 3],
    }
  );
  eleventyConfig.setLibrary("md", md);

  // Render a markdown string to block-level HTML (used by case-study sections)
  eleventyConfig.addFilter("markdown", (content) =>
    content ? md.render(String(content)) : ""
  );
  // Render a markdown string inline (no <p> wrapper)
  eleventyConfig.addFilter("markdownInline", (content) =>
    content ? md.renderInline(String(content)) : ""
  );

  // ---- Small helpers ----
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("isoDate", (d) =>
    d ? new Date(d).toISOString() : ""
  );
  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  // ---- Collections ----
  eleventyConfig.addCollection("projects", (api) =>
    api
      .getFilteredByGlob("src/projects/*.md")
      .sort((a, b) => (a.data.order || 99) - (b.data.order || 99))
  );
  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  eleventyConfig.addCollection("projectDomains", (api) => {
    const set = new Set();
    api.getFilteredByGlob("src/projects/*.md").forEach((p) => {
      if (p.data.domain) set.add(p.data.domain);
    });
    return [...set].sort();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html", "11ty.js"],
  };
}
