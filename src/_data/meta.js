// Build-time settings for maintainers (not edited in the CMS).
// SITE_URL and NOINDEX are set in .github/workflows/deploy.yml.
export default {
  // Absolute site URL, needed for social share images. No trailing slash.
  url: (process.env.SITE_URL || "http://localhost:8080").replace(/\/$/, ""),
  // Keep search engines away from the test site until launch.
  noindex: process.env.NOINDEX === "true",
};
