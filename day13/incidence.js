const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function preprocessMatrix(inputData) {
  const N = inputData.length;
  let start = 0;
  let end = 0;
  const matrixes = [];
  while (end < N) {
    const row = inputData[end];
    if (row == "") {
      const matrix = inputData.slice(start, end);
      matrixes.push(matrix);
      start = end + 1;
    }

    end += 1;
  }

  return matrixes;
}

function checkRows(matrix, rows, cols) {
  const ans = [-1, -1];
  for (let row = 1; row < rows; row++) {
    let isSame = true;
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] !== matrix[row - 1][col]) {
        isSame = false;
        break;
      }
    }

    if (isSame) return [row - 1, row];
  }

  return ans;
}

function checkCols(matrix, rows, cols) {
  const ans = [-1, -1];
  for (let col = 1; col < cols; col++) {
    let isSame = true;
    for (let row = 0; row < rows; row++) {
      if (matrix[row][col] !== matrix[row][col - 1]) {
        isSame = false;
        break;
      }
    }

    if (isSame) return [col - 1, col];
  }

  return ans;
}

function findReflection(inputData) {
  const matrixes = preprocessMatrix(inputData);
  console.log("Matrixes:", matrixes);
  let answer = 0;
  for (const matrix of matrixes) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const [col1, col2] = checkCols(matrix, rows, cols);
    console.log("Cols ", col1, col2);
    if (col1 === -1 && col2 === -1) {
      const [row1, row2] = checkRows(matrix, rows, cols);
      console.log(row1, row2);
      answer += 100 * row1;
    } else {
      answer += col1;
    }
  }

  return answer;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "sample.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", findReflection(inputData));
})();
