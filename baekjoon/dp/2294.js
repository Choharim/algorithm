const sum = +input.shift().split(" ")[1];
function solution(k, coins) {
  let dp = [];

  for (let i = 1; i <= k; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i === coins[j]) {
        dp[i] = 1;
        break;
      }
      if (dp[i - coins[j]]) {
        dp[i] = Math.min(
          dp[i] ?? Number.MAX_SAFE_INTEGER,
          dp[i - coins[j]] + 1
        );
      }
    }
  }

  return dp[k] ?? -1;
}

console.log(solution(sum, input.map(Number)));
