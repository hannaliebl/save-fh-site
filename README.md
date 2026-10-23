# Save Fort Hill — campaign site

Static site built with [Eleventy](https://www.11ty.dev/), edited by volunteers through [Pages CMS](https://pagescms.org/), and hosted on GitHub Pages. No client-side JavaScript.

## Local development

```sh
npm install
npm start          # http://localhost:8080 (live reload)
npm run build      # outputs _site/
```

## Where content lives

| File | What it is | Edited by |
|------|------------|-----------|
| `src/_data/site.json` | Sign-up link, contact email, announcement banner, footer | CMS |
| `src/index.md` | Home page (hero, key facts, main text) | CMS |
| `src/_data/press.json` | Press coverage list (sorted by date automatically) | CMS |
| `src/faq.md` | FAQ questions and answers (answers are Markdown in front matter) | CMS |
| `src/press.md`, `src/contact.md` | Press and Contact page text | CMS |
| `src/assets/uploads/` | Photos uploaded through the CMS | CMS |
| `src/*.11tydata.json` | Which layout each page uses (kept out of front matter so CMS saves can't drop it) | Maintainers |
| `src/_includes/`, `src/assets/css/` | Templates and styles | Maintainers |
| `.pages.yml` | What the CMS shows editors | Maintainers |
| `src/_data/meta.js` | Site URL and `noindex` (set by the deploy workflow) | Maintainers |

Markdown is **not** run through Nunjucks (`markdownTemplateEngine: false`), so editor text containing `{{` can't break the build.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml` → builds → publishes to GitHub Pages. Saves in Pages CMS are pushes to `main`, so they deploy too (about 1 minute). If a build fails, the previous site stays live and GitHub emails the committer.

URLs in templates are root-relative (`/press/`); `HtmlBasePlugin` adds the `/<repo>/` prefix on `*.github.io`. On a custom domain the prefix becomes `/` automatically.

### First-time setup

1. Create the GitHub repo and push `main`.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, and install the Pages CMS app on this repo.
4. In Pages CMS, open the repo → **Settings → Collaborators** → invite editors by email.

### Launch checklist

1. Custom domain: Settings → Pages → Custom domain, then add the DNS records GitHub shows. Tick "Enforce HTTPS". Path prefix and share-image URLs update automatically.
2. In `.github/workflows/deploy.yml`, set `NOINDEX: "false"` so search engines can index the site.

## Adding a page

1. Create `src/<name>.md` and `src/<name>.11tydata.json` (pick or add a layout in `src/_includes/layouts/`).
2. Add it to the nav in `src/_includes/partials/header.njk`.
3. Add an entry in `.pages.yml` so editors can edit it.
