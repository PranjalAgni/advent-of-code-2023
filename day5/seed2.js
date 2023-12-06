const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

const RANGE_MAPS_NAMESPACE = [
  "seedToSoil",
  "soilToFertilizer",
  "fertilizerToWater",
  "waterToLight",
  "lightToTemperature",
  "temperatureToHumidity",
  "humidityToLocation",
];

function expandSeeds(seeds) {
  const expandedSeeds = [];
  const totalSeeds = seeds.length;
  let idx = 0;
  while (idx < totalSeeds) {
    const endValue = seeds[idx] + seeds[idx + 1] - 1;

    expandedSeeds.push({
      start: seeds[idx],
      end: Math.floor(endValue / 2),
    });

    idx += 2;
  }

  return expandedSeeds;
}

function buildsAllRangeLists(mapRangeData) {
  const rows = mapRangeData.length;
  const allMaps = {};
  let rangeList = [];
  let namePos = -1;

  for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
    /**
     * @type {String}
     */
    const row = mapRangeData[rowIdx];
    if (row === "" || rowIdx === rows - 1) {
      allMaps[RANGE_MAPS_NAMESPACE[namePos]] = rangeList;
    } else if (row.includes("map:")) {
      namePos += 1;
      rangeList = [];
    } else {
      // do main parsing here
      const [soil, seed, range] = row.split(" ").map(Number);
      rangeList.push({
        from: seed,
        to: seed + range - 1,
        fromEq: soil,
      });
    }
  }

  return allMaps;
}

function findLowestLocation(inputData) {
  const initalSeedsText = inputData[0];
  const seeds = initalSeedsText.split("seeds: ").slice(1)[0].split(" ").map(Number);
  const expandedSeeds = expandSeeds(seeds);
  console.log("Seeds:", expandedSeeds);
  const allMaps = buildsAllRangeLists(inputData.slice(2));
  let lowestLocation = Number.MAX_SAFE_INTEGER;
  for (const seedObj of expandedSeeds) {
    let seed = seedObj.start;
    let maxTries = 250_0000;
    while (seed <= seedObj.end) {
      let mapId = 0;
      let value = seed;
      while (mapId < RANGE_MAPS_NAMESPACE.length) {
        const mapName = RANGE_MAPS_NAMESPACE[mapId];
        const rangeList = allMaps[mapName];
        for (const entry of rangeList) {
          if (value >= entry.from && value <= entry.to) {
            value = entry.fromEq + value - entry.from;
            break;
          }
        }

        mapId += 1;
      }
      seed += 1;
      maxTries -= 1;
      lowestLocation = Math.min(lowestLocation, value);
      // console.log("Seed:", seed, "Location:", value);
    }
  }

  return lowestLocation;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 2: ", findLowestLocation(inputData));
})();
