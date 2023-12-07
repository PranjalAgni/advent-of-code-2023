const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

/**
 * For part two, I realised that looking at every possible seed value would take a ridiculous amount of time. So instead of looking at every seed, I instead looked at every nth seed, where n was the square root of the range, which gave me an approximate answer. I then found which seed this approximate answer was from, and what the preceding seed was, and checked over that range for the true answer.
 */

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
      end: endValue,
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
  const trimmedSeeds = [expandedSeeds[1]];
  for (const seedObj of trimmedSeeds) {
    let seed = seedObj.start;
    console.log("Current range: ", seedObj);
    let currentLowest = Number.MAX_SAFE_INTEGER;
    // let range = seedObj.end - seedObj.start + 1;
    // let skipper = Math.floor(Math.sqrt(range));
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
      lowestLocation = Math.min(lowestLocation, value);
      currentLowest = Math.min(currentLowest, value);
      // console.log("Seed:", seed, "Location:", value);
    }

    console.log("For this range lowest was: ", currentLowest);
  }

  return lowestLocation;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 2: ", findLowestLocation(inputData));
})();
