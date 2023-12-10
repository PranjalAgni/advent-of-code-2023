const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function isAllZero(arr) {
  return arr.every((el) => el === 0);
}

function getDifference(arr) {
  let answer = arr[arr.length - 1];
  for (let idx = arr.length - 2; idx >= 0; idx--) {
    answer = arr[idx] - answer;
  }

  return answer;
}

function extrapolateNextValues(inputData) {
  const historyList = inputData.map((input) => input.split(" ").map(Number));
  let answer = 0;
  historyList.forEach((history) => {
    let startValues = [];
    while (!isAllZero(history)) {
      const N = history.length;
      let temp = [];
      for (let idx = 0; idx < N - 1; idx++) {
        temp.push(history[idx + 1] - history[idx]);
      }
      startValues.push(history[0]);
      history = temp;
    }

    console.log("Start values: ", startValues, getDifference(startValues));
    answer += getDifference(startValues);
  });

  return answer;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 2:", extrapolateNextValues(inputData));
})();
