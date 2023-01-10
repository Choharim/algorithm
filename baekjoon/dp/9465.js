for (let i = 0; i < input.length; i += 3) {
  console.log(
    solution(+input[i], [
      input[i + 1].split(" ").map(Number),
      input[i + 2].split(" ").map(Number),
    ])
  );
}

function solution(n, arr) {
  const up = 0;
  const down = 1;
  const none = 2;
  let dp = [];

  dp[0] = [arr[up][0], arr[down][0], 0];

  for (let i = 1; i < n; i++) {
    dp[i] = [
      Math.max(dp[i - 1][down], dp[i - 1][none]) + arr[up][i],
      Math.max(dp[i - 1][up], dp[i - 1][none]) + arr[down][i],
      Math.max(...dp[i - 1]),
    ];
  }

  return Math.max(...dp[n - 1]);
}
