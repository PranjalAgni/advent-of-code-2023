const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function parseColorfulCards(input) {
  const [winnerCards, givenCards] = input.replace(/Card \d+: /, "").split(" | ");
  const winnerCardsList = winnerCards.replace(/\s+/g, " ").trim().split(" ").map(Number);
  const givenCardsList = givenCards.replace(/\s+/g, " ").trim().split(" ").map(Number);
  return [winnerCardsList, givenCardsList];
}

function calculatePoints(inputData) {
  let answer = 0;
  for (const input of inputData) {
    const [winnerCardsList, givenCardsList] = parseColorfulCards(input);
    const winnerCards = new Set(winnerCardsList);
    let matches = 0;
    for (const cardValue of givenCardsList) {
      if (winnerCards.has(cardValue)) {
        matches++;
      }
    }

    answer += matches === 0 ? 0 : Math.pow(2, matches - 1);
  }

  return answer;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", calculatePoints(inputData));
})();
