# States Visited Tracker

A lightweight static web app for tracking which U.S. states you have visited.

## Features

- Searchable list of all 50 states
- Tile map view based on a square tile grid layout
- Geo map view powered by Leaflet with clickable state boundaries
- Shared visited-state tracking across all views
- Region and status filters
- Local browser persistence with `localStorage`
- Copy/reset actions for the visited list

## Run Locally

This project does not require a build step.

You can:

1. Open [`index.html`](./index.html) directly in a browser

or

1. Serve the folder locally
2. Open the local URL in your browser

Example:

```powershell
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

## Project Structure

```text
.
|- index.html
|- styles.css
|- app.js
|- data/
|  |- admin1-us.js
|  |- states_square_tile_template.csv
|- vendor/
|  |- leaflet.css
|  |- leaflet.js
```

## Deployment

This app can be hosted on GitHub Pages because it is fully static.

### GitHub Pages

1. Push the project to a GitHub repository
2. Open the repository settings
3. Go to `Pages`
4. Choose `Deploy from a branch`
5. Select your main branch and the repository root

The site will then be available at:

```text
https://<username>.github.io/<repo>/
```

## Notes

- Visit data is stored per browser, not in a backend
- If you clear browser storage, visited states will reset
- The geo map uses local Leaflet assets and bundled state-boundary data

## Data and References

- Leaflet: <https://leafletjs.com/>
- U.S. state boundary source: <https://datahub.io/core/geo-admin1-us>
- Tile map reference: <https://www.fla-shop.com/resources/us-square-tile-grid-map/us-square-tile-grid-map.png>
- Tile grid CSV template: [`data/states_square_tile_template.csv`](./data/states_square_tile_template.csv)
- Tile grid CSV source gist: <https://gist.github.com/rlvaugh/8b3077127c238ade4cfc1bc41ecd72b8#file-states_square_tile_template-csv>
