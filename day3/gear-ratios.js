const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function printData(inputData) {
  const rows = inputData.length;
  for (let row = 0; row < rows; row++) {
    let str = "";
    for (let col = 0; col < inputData[row].length; col++) {
      str += inputData[row][col];
    }
    console.log(str);
  }
}

function isSymbol(character) {
  return character !== "." && isNaN(character);
}

function isValid(newRow, newCol, rows, cols) {
  return newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols;
}

function parseAndVisitCompleteNumber(inputData, rows, cols, newRow, newCol, visitedMap) {
  let start = newCol - 1;
  let prefix = "";
  while (isValid(newRow, start, rows, cols) && !isNaN(inputData[newRow][start])) {
    prefix = inputData[newRow][start] + prefix;
    visitedMap.set(`${newRow}-${start}`, true);
    start -= 1;
  }
  let end = newCol + 1;
  let suffix = "";
  while (isValid(newRow, end, rows, cols) && !isNaN(inputData[newRow][end])) {
    suffix += inputData[newRow][end];
    visitedMap.set(`${newRow}-${end}`, true);
    end += 1;
  }

  const number = parseInt(prefix + inputData[newRow][newCol] + suffix);
  return number;
}

function findPartSum(inputData) {
  printData(inputData);
  const rows = inputData.length;
  const cols = inputData[0].length;
  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  const visitedMap = new Map();
  let answer = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (isSymbol(inputData[row][col])) {
        for (const dir of directions) {
          const newRow = row + dir[0];
          const newCol = col + dir[1];
          if (
            isValid(newRow, newCol, rows, cols) &&
            !isNaN(inputData[newRow][newCol]) &&
            !visitedMap.has(`${newRow}-${newCol}`)
          ) {
            visitedMap.set(`${newRow}-${newCol}`, true);
            const partNumber = parseAndVisitCompleteNumber(inputData, rows, cols, newRow, newCol, visitedMap);
            answer += partNumber;
          }
        }
      }
    }
  }
  return answer;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Answer: ", findPartSum(inputData));
})();
