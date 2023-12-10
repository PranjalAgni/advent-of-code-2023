const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function isAllZero(arr) {
  return arr.every((el) => el === 0);
}

function getSum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

function extrapolateNextValues(inputData) {
  const historyList = inputData.map((input) => input.split(" ").map(Number));
  let answer = 0;
  historyList.forEach((history) => {
    let endValues = [];
    while (!isAllZero(history)) {
      const N = history.length;
      let temp = [];
      for (let idx = 0; idx < N - 1; idx++) {
        temp.push(history[idx + 1] - history[idx]);
      }
      endValues.push(history[N - 1]);
      history = temp;
    }

    answer += getSum(endValues);
  });

  return answer;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", extrapolateNextValues(inputData));
})();
