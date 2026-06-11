# LAYA HOME — „Výkresová dokumentace"

Complete redesign. The site behaves like a set of architectural drawings — numbered sheets (List 01–06), title blocks, crop marks, dimension lines that draw themselves — with warm photography breaking through the technical frame. New identity:

- **Palette:** drafting paper `#EFEDE6` · graphite ink `#191A1C` · cyanotype blue `#143062` · redline `#D8431B` (all text combinations contrast-verified ≥ AA)
- **Type:** Archivo (expanded, structural display + body) · Newsreader italic (her voice — quotes, accent words) · Spline Sans Mono (annotations, title blocks)
- **Wordmark is typographic** — `logo.png` is no longer needed.

## Structure
```
index.html        List 01–06: hero (expanding viewport), atlas filmstrip,
                  příběh, nabídka (expanding rows), postup (pinned horizontal
                  + self-drawing floor plan), projekty (cursor preview), kontakt
portfolio.html    Rejstřík — filterable grid, hash deep-links (#kategorie=interier)
projekt.html      detail template → projekt.html?p=<slug> (+ not-found state)
css/style.css     full design system
js/data.js        ★ single source of truth — all 21 projects
js/site.js        shared behaviours + homepage choreography
js/portfolio.js   grid/filter (everything derived from data.js)
js/projekt.js     detail renderer
```

## Assets — drop into repo root, same names as before
`interior_1.jpg … interior_7.jpg`, `nahled_1.jpg … nahled_21.jpg`, `portrait.jpg`. No `logo.png` needed. `favicon.svg` still to be created. Missing files show a labelled drafting placeholder instead of a broken icon.

## Robustness contract (the fix for last time)
Plain scripts, **no ES modules** → works even opened directly from disk (`file://`).
Nothing is hidden by CSS; all "hidden before reveal" states are set by JS only
when GSAP loaded **and** the user allows motion. Verified by a headless test
simulating total CDN failure: heading, footer, steps, grids, filters, detail
and 404 all render statically.

## Run / deploy
Any static host or just open `index.html`. For local serving: `npx serve .`

## Before launch
1. Wire the form: set `FORM_ENDPOINT` in `js/site.js` (Formspree/Web3Forms). Until then it falls back to a prefilled mailto.
2. Confirm `CONTACT_EMAIL` (`info@layahome.cz` is a placeholder, also in the footer).
3. Create `favicon.svg`.
4. Real social URLs → uncomment the footer block.
5. Adding a project = one object in `js/data.js` (id, slug, title, category, image, alt, desc, optional `featured`). Counts, filters, grid, prev/next all derive automatically.
