const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function findNumberOfWays(inputData) {
  const [time, distance] = inputData;
  const timeList = time.replace("Time: ", "").replace(/ +/g, " ").trim().split(" ").map(Number);
  const distanceList = distance.replace("Distance: ", "").replace(/ +/g, " ").trim().split(" ").map(Number);
  console.log("Time:", timeList);
  console.log("Distance:", distanceList);
  let answer = 1;
  timeList.forEach((time, idx) => {
    let totalWays = 0;
    const targetDistance = distanceList[idx];
    for (let t = 1; t < time; t++) {
      const distanceMoved = t * (time - t);
      if (distanceMoved > targetDistance) {
        totalWays += 1;
      }
    }

    if (totalWays !== 0) answer *= totalWays;
  });

  return answer;
}
(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", findNumberOfWays(inputData));
})();
