const n = Number(input[0]);

const matrix = [];
for (let i = 1; i <= n; i++) {
  matrix[i - 1] = input[i].split("").map(Number);
}

const result = [];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!matrix[i][j]) continue;

    result.push(DFS(i, j));
  }
}

function DFS(x, y) {
  let count = 0;
  const stack = [[x, y]];
  matrix[x][y] = 0;

  while (stack.length) {
    [a, b] = stack.pop();

    count++;

    for (let i = 0; i < 4; i++) {
      const cx = a + dx[i];
      const cy = b + dy[i];

      if (cx < 0 || cx >= n || cy < 0 || cy >= n) continue;
      if (!matrix[cx][cy]) continue;

      stack.push([cx, cy]);
      matrix[cx][cy] = 0;
    }
  }

  return count;
}

result.sort((a, b) => (a > b ? 1 : -1));

console.log(`${result.length}\n${result.join("\n")}`);
