const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function findNumberOfWays(inputData) {
  const [time, distance] = inputData;
  const totalTime = parseInt(time.replace("Time: ", "").replace(/ +/g, "").trim());
  const totalDistance = parseInt(distance.replace("Distance: ", "").replace(/ +/g, "").trim());
  console.log("Time:", totalTime);
  console.log("Distance:", totalDistance);

  let answer = 0;
  for (let t = 1; t < totalTime; t++) {
    const distanceMoved = t * (totalTime - t);
    if (distanceMoved > totalDistance) {
      answer += 1;
    }
  }

  return answer;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 2:", findNumberOfWays(inputData));
})();
