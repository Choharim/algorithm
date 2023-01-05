let dp = [1, 1, 2];

for (let i = 3; i < 11; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

for (let i = 0; i < input.length; i++) {
  console.log(dp[+input[i]]);
}
