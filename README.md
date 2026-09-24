# London, in Thirty-Three Parts

A scrolling, illustrated atlas of London's 32 boroughs and the City of London: where their names come from, how they were stitched together, and the odd stories each one still keeps.

Ride the **Borough Line** from the Roman City out through the inner ring and round the outer boroughs, 33 stops in all. The hand-drawn-style map follows you the whole way, and every scroll step changes it. Along the way:

- **Prologue**: Londinium → two cities → the old shires → the County of London (1889) → Greater London (1965)
- **33 stops**, each with the Old English meaning of the name, 2021 Census figures, a short history, three curiosities and the borough motto
- **What's in a name?**: an interactive guide to the Saxon word endings (*-ham*, *-ton*, *-ey*, *-hithe*, *-wich*…) and where they turn up on the map
- **By the numbers**: the map turns into circle cartograms sized by population, area and density

It's plain HTML, CSS and JavaScript with no build step and no frameworks. The map is 33 pre-projected SVG shapes plus a river.

## Running it

Serve the folder with any static server, e.g.

```sh
python3 -m http.server
```

then open <http://localhost:8000>. It also works as-is on GitHub Pages. Deep links work too, e.g. `#hackney` or `#greenwich`.

## Files

| Path | What |
| --- | --- |
| `index.html` | page shell |
| `css/style.css` | all styling |
| `js/content.js` | all the words: borough stories, etymologies, counties |
| `js/main.js` | map, camera, scroll states, route line, interactions |
| `js/london-data.js` | generated map geometry |
| `tools/build-map.mjs` | regenerates `js/london-data.js` |

## Rebuilding the map data

```sh
curl -L -o lad.json https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/eng/lad.json
npm i d3-geo @turf/turf polylabel
node tools/build-map.mjs lad.json
```

## Sources

Boundaries: ONS Local Authority Districts (2013). Contains National Statistics data © Crown copyright and database right 2013; contains OS data © Crown copyright 2013 (Open Government Licence). Populations: ONS Census 2021. Place-name meanings mostly follow A. D. Mills, *A Dictionary of London Place-Names*.
