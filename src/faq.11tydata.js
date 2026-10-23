import nav from "./_data/nav.json" with { type: "json" };

// The FAQ is switched on and off with "hidden" in _data/nav.json. When
// hidden, the page isn't built at all (and drops out of the nav and footer).
const hidden = nav.find((item) => item.url === "/faq/")?.hidden;

export default {
  layout: "layouts/faq.njk",
  ...(hidden && { permalink: false, eleventyExcludeFromCollections: true }),
};
