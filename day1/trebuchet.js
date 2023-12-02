const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

const findCalibrationValue = (lines) => {
  let sum = 0;
  for (const line of lines) {
    let start = 0;
    let end = line.length - 1;
    let digits = [];
    let isStartFound = false;
    let isEndFound = false;
    while (start <= end && (!isStartFound || !isEndFound)) {
      if (!isStartFound && line[start] >= "0" && line[start] <= "9") {
        isStartFound = true;
        digits[0] = line[start];
      }

      if (!isEndFound && line[end] >= "0" && line[end] <= "9") {
        isEndFound = true;
        digits[1] = line[end];
      }

      if (!isStartFound) start += 1;
      if (!isEndFound) end -= 1;
    }

    if (digits.length === 1) {
      digits.push(digits[0]);
    }

    sum += parseInt(digits.join(""));
  }

  return sum;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Calibirated value: ", findCalibrationValue(inputData));
})();
