const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

const cubesLimit = {
  red: 12,
  blue: 14,
  green: 13,
};

const formatGames = (games) => {
  const formattedGames = [];
  for (const game of games) {
    const [gameIdDetails, cubes] = game.split(":");
    const id = +gameIdDetails.trim().split(" ").at(-1);
    const cubesSubsetList = cubes.split(";");
    const formattedCubes = [];
    for (const cubeSubset of cubesSubsetList) {
      const formattedSegment = {};
      const segments = cubeSubset.trim();
      const segmentList = segments.split(",");
      for (const segment of segmentList) {
        const [count, color] = segment.trim().split(" ");
        formattedSegment[color] = +count;
      }

      formattedCubes.push(formattedSegment);
    }

    formattedGames.push({
      id,
      games: formattedCubes,
    });
  }

  return formattedGames;
};

const findPossibleGames = (inputData) => {
  let sum = 0;
  const formattedGames = formatGames(inputData);
  for (const game of formattedGames) {
    let isGameValid = true;
    for (const cube of game.games) {
      const isNotValid = Object.entries(cube).some(([color, count]) => {
        return count > cubesLimit[color];
      });

      if (isNotValid) {
        isGameValid = false;
        break;
      }
    }

    if (isGameValid) sum += game.id;
  }
  return sum;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Answer: ", findPossibleGames(inputData));
})();
