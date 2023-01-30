const [M, N, K] = input[0].split(" ").map(Number);

const martix = Array.from({ length: M }, () => Array(N).fill(0));

for (let i = 1; i <= K; i++) {
  [a, b, c, d] = input[i].split(" ").map(Number);

  for (let x = M - d; x <= M - b - 1; x++) {
    for (let y = a; y <= c - 1; y++) {
      if (!martix[x][y]) {
        martix[x][y] = 1;
      }
    }
  }
}

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
const result = [];
for (let x = 0; x < M; x++) {
  for (let y = 0; y < N; y++) {
    if (martix[x][y]) continue;

    result.push(DFS(x, y));
  }
}

function DFS(x, y) {
  let count = 1;
  const stack = [[x, y]];
  martix[x][y] = 1;

  while (stack.length) {
    [a, b] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const cx = a + dx[i];
      const cy = b + dy[i];
      if (cx < 0 || cx >= M || cy < 0 || cy >= N) continue;
      if (martix[cx][cy]) continue;

      count++;
      stack.push([cx, cy]);
      martix[cx][cy] = 1;
    }
  }

  return count;
}

result.sort((a, b) => (a > b ? 1 : -1));

console.log(`${result.length}\n${result.join(" ")}`);
