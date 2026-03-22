# Product Research: States-Visited Tracking Landscape

Research date: 2026-03-21

## Executive Summary

The largest audience overlap is not from niche travel trackers but from broad map platforms. The clearest traffic leaders I could verify are Google Maps/My Maps (using `maps.google.com` as a traffic proxy) and MapChart. The closest product-shaped competitors to this repository are MapMaker.io and Fla-Shop, because they offer a dedicated "visited states" flow with shareable URLs, stats, and embeddable output.

This repository is stronger on simplicity, privacy, and self-hosting. It is weaker on sharing, exporting, and public distribution.

## Most-Visited Options I Could Verify

| Product | Public traffic signal | What it offers | Relevance |
| --- | --- | --- | --- |
| Google My Maps | `maps.google.com` estimated at ~88.5M monthly visits via HypeStat; this is a proxy for the Google Maps ecosystem, not My Maps alone | Custom maps, layers, file import, sharing, download/print | Highest-reach option, but not purpose-built for visited-states tracking |
| MapChart | Semrush shows `mapchart.net` at 1.62M visits in December 2025 | State/county maps, legends, image download, Excel import, account save/share in Plus | Biggest dedicated map-making competitor |
| MapLoco | HypeStat estimates ~40K monthly visits | Visited-place maps, image downloads, no-account flow | Smaller niche option; current status is uncertain |

## Closest Product Comparators

### MapMaker.io

MapMaker.io has the closest direct user experience to this app. Its visited-states page supports instant click-to-select, checklist selection, live stats, shareable URLs, social sharing, and embeddable maps. It also states that no sign-up is required and the URL acts as the save file. Separately, the main MapMaker editor supports exports in PNG, JPEG, and SVG.

### Fla-Shop

Fla-Shop also offers a dedicated visited-states flow with color customization, labels, stats, unique URLs, and embed code. Its broader U.S. editor stores settings in `localStorage` and allows exporting settings as JSON. It is closer to a commercial lead-generation product than a pure consumer travel tracker, but its free tool still sets a good baseline for sharing and embedding.

## Comparison With This Repository

### Where this app is better

- Lower friction: fully static, no account, no backend, fast load
- Better interaction variety: list view, square tile map, and geo map in one app
- Better small-state usability: the tile map is easier to tap than many geographic map-only competitors
- Better privacy posture: state data stays in browser `localStorage`
- Better portability: easy to self-host on GitHub Pages

### Where this app is behind

- No shareable URL for visited states
- No image export or downloadable card/map
- No embed mode for publishing a public map
- No import/export for user data
- No multi-status tracking such as "visited", "lived in", or "want to visit"
- No collaboration or cross-device sync

## Product Implications

If the goal is a better personal tracker, the next features should be:

1. URL-based sharing so a visited-state set can be copied and reopened anywhere.
2. Export options: PNG for social sharing and JSON/CSV for backup.
3. Read-only embed mode for blogs or personal sites.
4. Optional multi-state categories instead of a single visited boolean.
5. Import from CSV/JSON to reduce lock-in and encourage migration from other tools.

If the goal is differentiation rather than parity, the strongest unique angle is the combination of tile-map usability plus private, self-hosted simplicity.

## Notes on Evidence

- I could verify comparable public traffic estimates for Google Maps/My Maps, MapChart, and MapLoco.
- I could verify product features for MapMaker.io and Fla-Shop, but I did not find a similarly clean, indexed public traffic estimate for them during this pass.
- MapLoco pages still showed a notice saying its visitor-mapping service would cease on February 20, 2026. Because that date is already past, I treat its current operating status as uncertain.

## Sources

- Google My Maps Help: https://support.google.com/mymaps/?hl=en
- Google My Maps import help: https://support.google.com/mymaps/answer/3024836
- Google My Maps share/download help: https://support.google.com/mymaps/answer/3109452
- Google Maps traffic proxy: https://hypestat.com/info/maps.google.com
- MapChart homepage: https://www.mapchart.net/
- MapChart Plus sharing: https://www.mapchart.net/plus.html
- MapChart traffic: https://www.semrush.com/website/mapchart.net/overview/
- MapMaker visited states: https://www.mapmaker.io/visited-states
- MapMaker homepage: https://www.mapmaker.io/
- Fla-Shop visited states: https://www.fla-shop.com/visited-states/
- Fla-Shop U.S. editor: https://www.fla-shop.com/editor/usa/
- MapLoco homepage: https://www.maploco.com/
- MapLoco traffic estimate: https://hypestat.com/info/maploco.com
