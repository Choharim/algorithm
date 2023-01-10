const n = input.shift();

function solution(n, arr) {
  let dp = Array.from({ length: n }, (v) =>
    Array.from({ length: n }).fill(BigInt(0))
  );

  dp[0][0] = BigInt(1);

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (!arr[x][y] || !dp[x][y]) continue; // 점프할 능력이 안되거나, 자신으로 갈 수 있는 방법이 없을 때

      if (y + arr[x][y] < n) {
        dp[x][y + arr[x][y]] += dp[x][y];
      }

      if (x + arr[x][y] < n) {
        dp[x + arr[x][y]][y] += dp[x][y];
      }
    }
  }

  return dp[n - 1][n - 1].toString();
}

console.log(
  solution(
    +n,
    input.map((v) => v.split(" ").map(Number))
  )
);
