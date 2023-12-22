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

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposedMatrix = [];
  for (let col = 0; col < cols; col++) {
    const rowList = [];
    for (let row = 0; row < rows; row++) {
      rowList.push(matrix[row][col]);
    }
    transposedMatrix.push(rowList);
  }

  return transposedMatrix;
}

function checkReflection(matrix) {
  const reflection = [];
  for (let r = 1; r < matrix.length; r++) {
    reflection.push(r);
    for (let i = r - 1, j = r; i >= 0 && j < matrix.length; i--, j++) {
      if (matrix[i] !== matrix[j]) {
        reflection.splice(reflection.length - 1, 1);
        break;
      }
    }
  }

  return reflection;
}

function findReflection(inputData) {
  const matrixes = preprocessMatrix(inputData);
  console.log("Matrixes:", matrixes);
  let answer = 0;
  for (const matrix of matrixes) {
    const rowsOfReflection = checkReflection(matrix);
    const transposedMatrix = transposeMatrix(matrix);
    console.log("Transposed: ", transposedMatrix);
    const colsOfReflection = checkReflection(transposedMatrix);
    console.log("Rows of reflection:", rowsOfReflection);
    console.log("Cols of reflection:", colsOfReflection);
    if (rowsOfReflection.length > 0) {
      answer += 100 * rowsOfReflection[0];
    }

    if (colsOfReflection.length > 0) {
      answer += colsOfReflection[0];
    }
  }

  return answer;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "sample.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", findReflection(inputData));
})();
