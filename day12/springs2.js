const path = require("path");
const { readInput, convertInputToList } = require("../utils/data");

function findPossibleArrangements(rows) {
  let scaleFactor = 5;
  let res = rows
    .map((row) => {
      let [arr, conf] = row.split(" ");
      return {
        arr: Array.from(
          {
            length: scaleFactor,
          },
          () => arr
        )
          .join("?")
          .split(""),
        conf: Array.from(
          {
            length: scaleFactor,
          },
          () => conf.split(",").map((x) => parseInt(x))
        ).flat(),
      };
    })
    .reduce((acc, { arr, conf }) => {
      let n = arr.length;
      let m = conf.length;
      let p = Math.max(...conf);
      // let dp[n][m][p]
      let dp = Array.from(
        {
          length: n + 1,
        },
        () =>
          Array.from(
            {
              length: m + 1,
            },
            () =>
              Array.from(
                {
                  length: p + 1,
                },
                () => 0
              )
          )
      );

      // base cases
      dp[0][0][0] = 1;
      let cnt = 0;
      for (let i = 1; i <= n; i++) {
        if (arr[i - 1] === "#") cnt++;
        else cnt = 0;
        if (cnt) dp[i][0][cnt] = 1;
      }
      for (let i = 1; i <= n; i++)
        if (arr[i - 1] === "#") break;
        else dp[i][0][0] = 1;

      // dp loop
      for (let i = 1; i <= n; i++) {
        if (arr[i - 1] === ".")
          for (let j = 1; j <= m; j++) dp[i][j][0] = dp[i - 1][j - 1][conf[j - 1]] + dp[i - 1][j][0];
        else if (arr[i - 1] === "#")
          for (let j = 0; j <= m; j++) for (let k = 0; k < p; k++) dp[i][j][k + 1] = dp[i - 1][j][k];
        else {
          // if replace with '.'
          for (let j = 1; j <= m; j++) dp[i][j][0] = dp[i - 1][j - 1][conf[j - 1]] + dp[i - 1][j][0];

          // if replace with '#'
          for (let j = 0; j <= m; j++) for (let k = 0; k < p; k++) dp[i][j][k + 1] = dp[i - 1][j][k];
        }
      }

      return acc + dp[n][m][0] + dp[n][m - 1][conf[m - 1]];
    }, 0);

  return res;
}

(async () => {
  const INPUT_PATH = path.join(__dirname, "input.txt");
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log("Part 2:", findPossibleArrangements(inputData));
})();
