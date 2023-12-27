const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function printMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let row = 0; row < rows; row++) {
    const data = [];
    for (let col = 0; col < cols; col++) {
      data.push(matrix[row][col]);
    }

    console.log(data.join(" "));
  }

  console.log("============================");
}

function preprocessToMatrix(inputData) {
  const matrix = [];

  for (const row of inputData) {
    matrix.push(row.split(""));
  }

  return matrix;
}

function computeLoad(matrix) {
  let load = 0;
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let row = 0; row < rows; row++) {
    let rocksInTheRow = 0;
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === "O") rocksInTheRow += 1;
    }

    load += rocksInTheRow * (rows - row);
  }

  return load;
}

function findTotalLoad(inputData) {
  const matrix = preprocessToMatrix(inputData);
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let col = 0; col < cols; col++) {
    let start = 0;
    let emptyPositions = [];

    while (start < rows) {
      if (matrix[start][col] === ".") {
        emptyPositions.push(start);
      } else if (matrix[start][col] === "#") {
        emptyPositions = [];
      } else {
        // movable stone
        if (emptyPositions.length > 0) {
          const position = emptyPositions.shift();
          matrix[position][col] = "O";
          matrix[start][col] = ".";
          emptyPositions.push(start);
          // console.log(`At col = ${col + 1} | swapped position ${start} with empty slot ${position}`);
        }
      }
      start += 1;
    }
  }

  return computeLoad(matrix);
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", findTotalLoad(inputData));
})();

// in a loop row < rows:
// find position of "O" let's say target
// iterate in range (0, target - 1)

// we are mantaining a list for storing the empty slots
// if we encounter any # then we clear all empty slots as # is blocked
// if we encounter any stones (O) we check if we have some empty slots
// we pluck the first empty slot thst is `.at(0)` then we shift the stone to
// that empty slot and make the stone as empty slot
// let code it!!!
