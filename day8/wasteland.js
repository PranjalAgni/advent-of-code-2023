const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function constructGraph(nodeList) {
  const graph = {};
  nodeList.forEach((row) => {
    const [source, destination] = row.split(" = ");
    const [left, right] = destination.replace("(", "").replace(")", "").split(", ");
    graph[source] = [left, right];
  });

  console.log("Graph: ", graph);
  return graph;
}

function reachDestination(inputData) {
  const movingInstructions = inputData[0];
  const graph = constructGraph(inputData.slice(2));
  const queue = [];
  queue.push("AAA");
  let steps = 0;
  let dir = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    if (node === "ZZZ") {
      break;
    }
    const move = movingInstructions[dir];
    if (move === "L") {
      queue.push(graph[node][0]);
    } else {
      queue.push(graph[node][1]);
    }

    steps += 1;
    dir += 1;
    dir %= movingInstructions.length;
  }

  return steps;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 1:", reachDestination(inputData));
})();
