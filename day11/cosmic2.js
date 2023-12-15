const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function emptySpaces(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const horizontal = [];
  const vertical = [];
  for (let row = 0; row < rows; row++) {
    let isGalaxyPresent = false;
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === "#") {
        isGalaxyPresent = true;
        break;
      }
    }

    if (!isGalaxyPresent) {
      horizontal.push(row);
    }
  }

  for (let col = 0; col < cols; col++) {
    let isGalaxyPresent = false;
    for (let row = 0; row < rows; row++) {
      if (matrix[row][col] === "#") {
        isGalaxyPresent = true;
        break;
      }
    }

    if (!isGalaxyPresent) {
      vertical.push(col);
    }
  }

  return {
    horizontal,
    vertical,
  };
}

function getGalaxies(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const galaxies = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === "#") {
        galaxies.push({
          x: row,
          y: col,
        });
      }
    }
  }

  return galaxies;
}

function expandAndFindShortestPath(inputData) {
  const { horizontal, vertical } = emptySpaces(inputData);
  const galaxies = getGalaxies(inputData);
  let total = 0;
  for (let idx = 0; idx < galaxies.length; idx++) {
    for (let jdx = idx + 1; jdx < galaxies.length; jdx++) {
      const galaxy1 = galaxies[idx];
      const galaxy2 = galaxies[jdx];
      total += Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
      for (const h of horizontal) {
        if (h >= galaxy1.y && h <= galaxy2.y) {
          total += 9;
        }
      }

      for (const v of vertical) {
        if (v >= galaxy1.x && v <= galaxy2.x) {
          total += 9;
        }
      }
    }
  }
  return total;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "sample.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 2:", expandAndFindShortestPath(inputData));
})();
