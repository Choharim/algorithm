function solution(n) {
  let dp = [0, 0, 1];

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1];

    if (i % 3 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 3]);
    }

    if (i % 2 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 2]);
    }

    dp[i] += 1;
  }

  return dp[n];
}

console.log(solution(+input));
