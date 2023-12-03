const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

const formatGames = (games) => {
  const formattedGames = [];
  for (const game of games) {
    const [gameIdDetails, cubes] = game.split(":");
    const id = +gameIdDetails.trim().split(" ").at(-1);
    const cubesSubsetList = cubes.split(";");
    const cubesCount = {
      red: 0,
      blue: 0,
      green: 0,
    };
    for (const cubeSubset of cubesSubsetList) {
      const segments = cubeSubset.trim();
      const segmentList = segments.split(",");
      for (const segment of segmentList) {
        const [count, color] = segment.trim().split(" ");
        cubesCount[color] = Math.max(cubesCount[color], +count);
      }
    }

    formattedGames.push({
      id,
      ...cubesCount,
    });
  }

  return formattedGames;
};
const findPossibleGames = (inputData) => {
  let sum = 0;
  const formattedGames = formatGames(inputData);
  for (const game of formattedGames) {
    let product = game["red"] * game["blue"] * game["green"];
    sum += product;
  }
  return sum;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Answer: ", findPossibleGames(inputData));
})();
