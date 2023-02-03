const N = Number(input[0]);
const matrix = [];
for (let i = 1; i < input.length; i++) {
  matrix[i - 1] = input[i].split(" ").map(Number);
}

const ROW = 0;
const COLUMN = 1;
const CROSS = 2;

const dp = Array.from({ length: N }, () => Array(N).fill([]));
dp[0][0] = [0, 0, 0];
dp[0][1] = [1, 0, 0];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (dp[i][j].length) continue;
    if (matrix[i][j] === 1) {
      dp[i][j] = [0, 0, 0];
      continue;
    }

    const countByDirections = [0, 0, 0];

    // 위에서 온 것
    if (matrix[i - 1]?.[j] === 0) {
      [row, column, cross] = dp[i - 1][j];

      countByDirections[COLUMN] = column + cross;
    }

    // 왼쪽에서 온 것
    if (matrix[i]?.[j - 1] === 0) {
      [row, column, cross] = dp[i][j - 1];

      countByDirections[ROW] = row + cross;
    }

    // 대각선에서 온 것
    if (matrix[i - 1]?.[j] === 0 && matrix[i]?.[j - 1] === 0) {
      [row, column, cross] = dp[i - 1][j - 1];
      countByDirections[CROSS] = row + column + cross;
    }

    dp[i][j] = countByDirections;
  }
}

console.log(dp[N - 1][N - 1].reduce((a, c) => (a += c), 0));
