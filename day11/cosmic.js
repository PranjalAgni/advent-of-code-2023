const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function transposeMatrix(matrix) {
  return matrix[0].map((_, col) => matrix.map((row) => row[col]));
}

function twicifyRow(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const expandedMatrix = [];
  for (let row = 0; row < rows; row++) {
    let newRow = [];
    let isGalaxyPresent = false;
    for (let col = 0; col < cols; col++) {
      newRow.push(matrix[row][col]);
      if (matrix[row][col] === "#") {
        isGalaxyPresent = true;
      }
    }

    if (!isGalaxyPresent) {
      expandedMatrix.push(newRow);
    }

    expandedMatrix.push(newRow);
  }

  return expandedMatrix;
}

function expandMatrix(inputData) {
  // row level expansion
  const horizontal = twicifyRow(inputData);
  const transposed = transposeMatrix(horizontal);
  const vertical = twicifyRow(transposed);
  const expanded = transposeMatrix(vertical);
  return expanded;
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
  const expandedMatrix = expandMatrix(inputData);
  const galaxies = getGalaxies(expandedMatrix);
  const distances = [];
  for (let idx = 0; idx < galaxies.length; idx++) {
    for (let jdx = idx + 1; jdx < galaxies.length; jdx++) {
      const galaxy1 = galaxies[idx];
      const galaxy2 = galaxies[jdx];
      distances.push(Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y));
    }
  }
  return distances.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", expandAndFindShortestPath(inputData));
})();
