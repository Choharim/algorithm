function solution(n) {
  if (n % 2) return 0;

  let dp = {};

  dp[0] = 1;

  for (let i = 2; i <= n; i += 2) {
    dp[i] = dp[i - 2] * 3;

    for (let j = 4; j <= i; j += 2) {
      dp[i] += dp[i - j] * 2;
    }
  }

  return dp[n];
}

console.log(solution(+input));
