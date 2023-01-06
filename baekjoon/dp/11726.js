function solution(n) {
  let dp = [0, 1, 2];

  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
  }

  return dp[n];
}
console.log(solution(+input[0]));
