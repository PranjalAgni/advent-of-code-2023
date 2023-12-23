const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function findTotalLoad(inputData) {
  console.log("Input = ", inputData);
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "sample.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", findTotalLoad(inputData));
})();
