function solution(n) {
  let dp = {};

  dp[3] = 1;
  dp[5] = 1;

  for (let i = 1; i <= n; i++) {
    if (dp[i - 3]) dp[i] = dp[i - 3] + 1;
    if (dp[i - 5])
      dp[i] = Math.min(dp[i] ?? Number.MAX_SAFE_INTEGER, dp[i - 5] + 1);
  }

  return dp[n] ?? -1;
}

console.log(solution(+input));
