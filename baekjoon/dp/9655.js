function solution(n) {
  const person = ["CY", "SK"];
  let dp = {};

  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = Number(!dp[i - 1]);
  }

  return person[dp[n]];
}

console.log(solution(+input));
