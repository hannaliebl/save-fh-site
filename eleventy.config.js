import { HtmlBasePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";

// Same settings as Eleventy's default Markdown renderer.
const md = markdownIt({ html: true });

// Self-hosted variable fonts (latin subset only). Copied from node_modules so
// visitors never make a request to a third-party font CDN.
const FONT_FILES = [
  "archivo/files/archivo-latin-wdth-normal.woff2",
  "source-serif-4/files/source-serif-4-latin-opsz-normal.woff2",
  "source-serif-4/files/source-serif-4-latin-opsz-italic.woff2",
];

export default function (eleventyConfig) {
  // Rewrites root-relative URLs ("/press/", "/assets/...") to include the
  // path prefix, so the site works at username.github.io/repo/ and at a
  // custom domain without template changes.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  for (const file of FONT_FILES) {
    eleventyConfig.addPassthroughCopy({
      [`node_modules/@fontsource-variable/${file}`]: `assets/fonts/${file.split("/").pop()}`,
    });
  }

  // CMS dates are stored as "yyyy-MM-dd"; format without timezone drift.
  eleventyConfig.addFilter("longDate", (value) => {
    if (!value) return "";
    const date = new Date(`${String(value).slice(0, 10)}T12:00:00Z`);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  // For Markdown stored in front matter fields (e.g. FAQ answers).
  eleventyConfig.addFilter("markdown", (value) => md.render(String(value ?? "")));

  eleventyConfig.addFilter("isoDate", (value) => String(value ?? "").slice(0, 10));

}

export const config = {
  dir: {
    input: "src",
    includes: "_includes",
    data: "_data",
  },
  // Editors write Markdown in the CMS. Don't run it through Nunjucks, or a
  // stray "{{" in their text would break the build.
  markdownTemplateEngine: false,
  htmlTemplateEngine: "njk",
  pathPrefix: process.env.PATH_PREFIX || "/",
};
