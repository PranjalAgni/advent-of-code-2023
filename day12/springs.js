const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function getWildcardIndicies(sequence) {
  let idx = 0;
  const indexes = [];
  for (const ch of sequence) {
    if (ch === "?") indexes.push(idx);
    idx += 1;
  }
  return indexes;
}

function generateCombinations(permutationLength, prefix, result) {
  if (prefix.length === permutationLength) {
    result.push(prefix);
    return;
  }

  generateCombinations(permutationLength, prefix + "#", result);
  generateCombinations(permutationLength, prefix + ".", result);
}

function isValid(sequence, instructions) {
  let start = 0;
  const N = sequence.length;
  const groups = [];
  while (start < N) {
    while (start < N && sequence[start] !== "#") start += 1;
    let end = start;
    while (end < N && sequence[end] === "#") end += 1;
    const len = end - start;
    if (len > 0) groups.push(len);
    start = end;
  }

  return groups.join(",") === instructions;
}

function fillWildcards(sequence, combination) {
  let idx = 0;
  let result = "";
  for (const ch of sequence) {
    if (ch === "?") {
      result += combination[idx];
      idx += 1;
    } else {
      result += ch;
    }
  }
  return result;
}

function findPossibleArrangements(inputData) {
  let total = 0;
  for (const row of inputData) {
    const [sequence, instructions] = row.split(" ");
    const wildcardIndexes = getWildcardIndicies(sequence);
    const combinations = [];
    generateCombinations(wildcardIndexes.length, "", combinations);
    const filledSequences = combinations.map((combination) => fillWildcards(sequence, combination));
    let ans = 0;
    for (const seq of filledSequences) {
      if (isValid(seq, instructions)) {
        console.log("Seq: ", seq);
        total += 1;
        ans += 1;
      }
    }
  }
  return total;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", findPossibleArrangements(inputData));
})();
