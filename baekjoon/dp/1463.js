function solution(n) {
  let dp = [0, 0, 1, 1];

  for (let i = 4; i <= n; i++) {
    let min = dp[i - 1];

    if (i % 3 === 0) {
      min = Math.min(min, dp[i / 3]);
    }
    if (i % 2 === 0) {
      min = Math.min(min, dp[i / 2]);
    }

    dp[i] = min + 1;
  }

  return dp[n];
}
console.log(solution(+input[0]));
