function solution(n) {
  let dp = [0, 1];

  let root;
  for (let i = 2; i <= n; i++) {
    root = Math.sqrt(i);

    if (root % 1 === 0) {
      dp[i] = 1;
    } else {
      let min = 3;
      for (let j = 1; j <= root; j++) {
        min = Math.min(min, dp[i - j * j] ?? 0);
      }

      dp[i] = 1 + min;
    }
  }

  return dp[n];
}
console.log(solution(+input[0]));
