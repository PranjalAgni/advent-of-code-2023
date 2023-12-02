const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

const WORDS_TO_NUMBER_MAP = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const replaceWordsWithDigits = (lines) => {
  return lines.map((line) => {
    let modifiedLine = "";
    for (let idx = 0; idx < line.length; idx++) {
      if (line[idx] >= "0" && line[idx] <= "9") {
        modifiedLine += line[idx];
      }
      let segmentLength = 3;
      while (segmentLength < 6) {
        const segment = line.slice(idx, idx + segmentLength);
        if (WORDS_TO_NUMBER_MAP[segment]) {
          modifiedLine += WORDS_TO_NUMBER_MAP[segment];
          idx += segmentLength - 2;
          break;
        }
        segmentLength += 1;
      }
    }

    return modifiedLine;
  });
};
const findCalibrationValue = (lines) => {
  let sum = 0;
  const transformedLines = replaceWordsWithDigits(lines);

  for (const line of transformedLines) {
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

    console.log(line, digits);
    sum += parseInt(digits.join(""));
  }

  return sum;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Calibirated value: ", findCalibrationValue(inputData));
})();
