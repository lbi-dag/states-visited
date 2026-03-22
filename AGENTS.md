# Repository Guidelines

## Project Structure & Module Organization

This repository is a static client-side app for tracking visited U.S. states.

- `index.html`: app shell and UI markup
- `styles.css`: all layout, theme, and responsive styles
- `app.js`: application state, tile-map rendering, filters, persistence, and Leaflet integration
- `data/`: bundled datasets such as `admin1-us.js`, `admin1-us.geojson`, and tile-map CSV references
- `vendor/`: checked-in third-party assets (`leaflet.js`, `leaflet.css`)
- `CNAME`: GitHub Pages domain config

Keep new assets in `data/` or `vendor/` only when they are required at runtime.

## Build, Test, and Development Commands

There is no build step or package manager in this project.

- `python -m http.server 4173`
  Serves the repository locally for browser testing.
- Open `http://127.0.0.1:4173`
  Loads the app with local data and vendor assets.
- `git diff`
  Review all local changes before committing.

Opening `index.html` directly also works for quick checks, but use a local server when validating asset loading and browser behavior.

## Coding Style & Naming Conventions

Use the existing style in each file:

- JavaScript: `const`/`let`, semicolons, double quotes, camelCase for variables and functions
- CSS: kebab-case class names such as `.tile-map` and `.map-tile`
- HTML: keep IDs and `data-*` attributes descriptive and aligned with selectors in `app.js`

Preserve the current formatting style: 2-space indentation in HTML/CSS and 2-space indentation inside object literals and arrays in `app.js`.

## Testing Guidelines

There is no automated test suite yet. Validate changes manually in a browser.

- Confirm list, tile-map, and geo-map views still work
- Check visited-state persistence through page reload
- Verify filters, search, copy, and reset actions
- Re-test responsive layout after any CSS or markup changes

If you add automated tests later, place them in a top-level `tests/` directory and name files `*.test.js`.

## Commit & Pull Request Guidelines

Recent commits use short imperative subjects such as `Update tile map layout` and `add readme`. Follow that pattern with concise, single-purpose commits.

Pull requests should include:

- a short summary of user-visible changes
- linked issue or context when applicable
- screenshots or short notes for UI changes
- manual verification steps you ran locally
