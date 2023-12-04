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
  const cardsWon = new Map();
  const totalCards = inputData.length;

  for (let idx = 0; idx < totalCards; idx++) {
    const [winnerCardsList, givenCardsList] = parseColorfulCards(inputData[idx]);
    // count orignal cards as we visit
    cardsWon.set(idx + 1, cardsWon.has(idx + 1) ? cardsWon.get(idx + 1) + 1 : 1);
    const copiesOfThisCard = cardsWon.get(idx + 1);
    const winnerCards = new Set(winnerCardsList);
    let matches = 0;
    for (const cardValue of givenCardsList) {
      if (winnerCards.has(cardValue)) {
        matches++;
      }
    }

    let nextCardIdx = idx + 1;
    while (matches-- > 0 && nextCardIdx < totalCards) {
      cardsWon.set(
        nextCardIdx + 1,
        cardsWon.has(nextCardIdx + 1) ? cardsWon.get(nextCardIdx + 1) + copiesOfThisCard : copiesOfThisCard
      );
      nextCardIdx += 1;
    }
  }

  cardsWon.forEach((value, key) => {
    console.log(key, value);
    answer += value;
  });

  return answer;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 2:", calculatePoints(inputData));
})();
