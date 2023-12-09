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

function isReachedDestination(queue) {
  let isEnd = true;
  for (let idx = 0; idx < queue.length; idx++) {
    const node = queue[idx];
    if (!node.endsWith("Z")) {
      isEnd = false;
      break;
    }
  }

  return isEnd;
}

function reachDestination(inputData) {
  const movingInstructions = inputData[0];
  const graph = constructGraph(inputData.slice(2));
  let queue = [];
  Object.keys(graph).forEach((node) => {
    if (node.endsWith("A")) {
      queue.push(node);
    }
  });

  console.log("Starting nodes: ", queue);

  let stepsToReachZ = [];
  for (let idx = 0; idx < queue.length; idx++) {
    const node = queue[idx];
    let q = [];
    q.push(node);
    let steps = 0;
    let dir = 0;

    while (q.length > 0) {
      const move = movingInstructions[dir];
      const node = q.shift();

      if (node.endsWith("Z")) break;
      if (move === "L") {
        q.push(graph[node][0]);
      } else {
        q.push(graph[node][1]);
      }

      steps += 1;
      dir += 1;
      dir %= movingInstructions.length;
    }

    stepsToReachZ.push(steps);
    console.log("STEPS TAKEN ========================================== ", steps);
  }

  return `Answer is LCM of these numbers (${stepsToReachZ.join(", ")})`;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 2:", reachDestination(inputData));
})();
