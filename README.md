# LB Advice — website

Static site (HTML / CSS / JS, no build step). Visual language follows the L&B group reference
site (lbcapitalsgr.it): Meghana + Lato, UIkit icon set, pill buttons and nav states, sticky header
with full-width dropbar. Main UI colour is `#E5E4E2` (reference: `#C5D9C9`).

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html                    Home
la-societa.html               Chi Siamo › La Società
professionisti.html           Chi Siamo › Professionisti (+ professionista.html profile template)
track-record.html             Chi Siamo › Track Record
aree-di-attivita.html         Aree di Attività (+ attivita-*.html detail pages)
mercati.html                  Mercati (+ mercato-energia-infrastrutture.html)
contatti.html                 Contatti
cerca.html                    Search results

css/tokens.css                Colours, type scale, spacing — change the brand here
css/base.css                  Reset, typography, layout primitives
css/header.css                Header, dropdowns, dropbar, search, off-canvas
css/components.css            Buttons, cards, sliders, filters, footer…
css/pages.css                 Page-specific layout

js/icons.js                   UIkit icons (MIT) injected into <span data-icon="…">
js/nav.js                     Dropdown/dropbar, search drop, mobile off-canvas
js/slider.js                  Scroll-snap sliders with prev/next
js/filters.js                 Track Record / Professionisti filters (reads data-* on items)
js/search.js                  Site search (cerca.html)
js/data/search-index.js       Search index, one entry per page

assets/fonts/                 Meghana (woff2 + otf)
assets/images/                Logos + uploaded images
```

## Content notes

- All images are placeholders (`.ph` elements). Replace each with an `<img>` (or a background image).
- Logos live in `assets/images/` (`logo.svg`, `logo-white.svg`).
- Filter dropdowns fill themselves from the `data-*` attributes on each card
  (`data-mercati`, `data-area`, `data-anno`, `data-ruolo`, `data-tipologia`; multiple values separated by `|`).
- Header and footer are repeated in every page; edit them in all pages when they change.
