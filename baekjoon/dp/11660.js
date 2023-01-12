const size = +input[0].split(" ")[0];
const matrix = input.slice(1, size + 1).map((r) => r.split(" ").map(Number));

let dp = Array.from({ length: size + 1 }, () => Array(size + 1).fill(0));

for (let i = 1; i <= size; i++) {
  for (let j = 1; j <= size; j++) {
    dp[i][j] =
      dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1] + matrix[i - 1][j - 1];
  }
}

let result = "";
for (let i = size + 1; i < input.length; i++) {
  [x1, y1, x2, y2] = input[i].split(" ").map(Number);

  result += dp[x2][y2] - dp[x2][y1 - 1] - dp[x1 - 1][y2] + dp[x1 - 1][y1 - 1];

  if (i < input.length - 1) result += "\n";
}

console.log(result);
