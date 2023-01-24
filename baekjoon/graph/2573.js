const [n, m] = input[0].split(" ").map(Number);
const currentMatrix = [];
let prevMatrix = Array.from({ length: n }, () => Array(m).fill(0));

for (let i = 1; i <= n; i++) {
  currentMatrix[i - 1] = input[i].split(" ").map(Number);
}

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let icebergCount;
let year = 0;
let check;

while (true) {
  icebergCount = 0;
  check = Array.from({ length: n }, () => Array(m).fill(0));

  prevMatrix = [...currentMatrix].map((v) => [...v]);

  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      if (!currentMatrix[i][j] || check[i][j]) continue;

      icebergCount++;
      bfs(i, j, check);
    }
  }

  if (!icebergCount) {
    year = 0;
    break;
  } else if (icebergCount >= 2) {
    break;
  }

  year++;
}

function bfs(x, y, check) {
  const queue = [[x, y]];

  check[x][y] = 1;

  while (queue.length) {
    [a, b] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const cx = a + dx[i];
      const cy = b + dy[i];
      if (cx < 0 || cx >= n || cy < 0 || cy >= m) continue;

      if (!prevMatrix[cx][cy] && currentMatrix[a][b] >= 1) {
        currentMatrix[a][b] -= 1;
      }

      if (!currentMatrix[cx][cy] || check[cx][cy]) continue;

      check[cx][cy] = 1;
      queue.push([cx, cy]);
    }
  }
}

console.log(year);
