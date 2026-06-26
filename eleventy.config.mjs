import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

export default function (eleventyConfig) {
  // ---- Passthrough copy (assets served at site root) ----
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Rebuild when CSS/JS change during `--serve`
  eleventyConfig.addWatchTarget("src/assets/");

  // ---- Markdown library (HTML allowed, heading anchors) ----
  const md = markdownIt({ html: true, linkify: true, typographer: true }).use(
    markdownItAnchor,
    { permalink: false, level: [2, 3] }
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
