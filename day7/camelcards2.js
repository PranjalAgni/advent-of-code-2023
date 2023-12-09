const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

const typesOfCards = ["fiveOfKind", "fourOfKind", "fullHouse", "threeOfKind", "twoPair", "onePair", "highCard"];

const cardsvsLabels = {
  "5-1": "fiveOfKind",
  "4-2": "fourOfKind",
  "3-2": "fullHouse",
  "3-3": "threeOfKind",
  "2-3": "twoPair",
  "2-4": "onePair",
  "1-5": "highCard",
};

const labelsStrength = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

function addToRunningAnswer(runningAnswer, label, card, score) {
  if (!runningAnswer[label]) runningAnswer[label] = [];
  if (runningAnswer[label].length >= 1) {
    const total = runningAnswer[label].length;
    for (let idx = 0; idx < total; idx++) {
      const [targetCard] = runningAnswer[label][idx];
      let start = 0;
      let isHighInStrength = false;
      while (start < 5) {
        const a = labelsStrength.indexOf(card[start]);
        const b = labelsStrength.indexOf(targetCard[start]);
        if (a < b) {
          isHighInStrength = true;
          break;
        } else if (b < a) {
          break;
        }
        start += 1;
      }

      if (isHighInStrength) {
        const allCards = runningAnswer[label];
        runningAnswer[label] = [...allCards.slice(0, idx), [card, +score], ...allCards.slice(idx)];
        return;
      }
    }
  }

  runningAnswer[label].push([card, +score]);
}

function findTotalWinning(inputData) {
  console.log(inputData);
  const something = {};
  inputData.forEach((row) => {
    const [card, score] = row.split(" ");
    const map = new Map();
    card.split("").forEach((c) => {
      map.set(c, map.has(c) ? map.get(c) + 1 : 1);
    });

    const totalJCards = map.get("J") || 0;
    let maxCountWithoutJ = 0;
    let numKeys = map.size;
    for (let idx = 0; idx < labelsStrength.length; idx++) {
      const cardType = labelsStrength[idx];
      const count = map.get(cardType) || 0;
      if (cardType !== "J") {
        maxCountWithoutJ = Math.max(maxCountWithoutJ, count);
      }
    }

    if (totalJCards > 0) {
      maxCountWithoutJ += totalJCards;
      if (numKeys > 1) numKeys -= 1;
    }

    // A2JJJ
    // JJJAA
    // JJJJJ
    // KTJJT (2-3) => KTTTT (4-2)

    const label = cardsvsLabels[`${maxCountWithoutJ}-${numKeys}`];

    addToRunningAnswer(something, label, card, score);
  });

  console.log("Something:  ", something);

  let priority = inputData.length;
  let answer = 0;
  typesOfCards.forEach((type) => {
    if (something[type]) {
      something[type].forEach(([card, score]) => {
        answer += priority * score;
        priority -= 1;
      });
    }
  });

  return answer;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 2:", findTotalWinning(inputData));
})();
