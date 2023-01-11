let testCase;
for (let i = 0; i < input.length; i++) {
  testCase = input[i].split(" ").map(Number);

  console.log(solution(testCase[1], testCase[0]));
}

function solution(m, n) {
  let dp = {};

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (j === i) {
        dp[`${i},${j}`] = 1;
      } else if (j === 1) {
        dp[`${i},${j}`] = i;
      } else {
        dp[`${i},${j}`] = dp[`${i - 1},${j - 1}`] + dp[`${i - 1},${j}`];
      }
    }
  }

  return dp[`${m},${n}`];
}
