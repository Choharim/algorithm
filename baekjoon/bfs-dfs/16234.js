const [N, L, R] = input[0].split(" ").map(Number);

const matrix = Array(N);
for (let i = 1; i < input.length; i++) {
  matrix[i - 1] = input[i].split(" ").map(Number);
}

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

let days = 0;
let visited;
const queue = [];
while (days < 2000) {
  let keepMigration = false;

  visited = Array.from({ length: N }, () => Array(N).fill(0));

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (visited[x][y]) continue;

      const isMigrated = BFS(x, y);

      if (isMigrated && !keepMigration) {
        keepMigration = true;
      }
    }
  }

  if (keepMigration) {
    days++;
  } else {
    break;
  }
}

function BFS(x, y) {
  visited[x][y] = 1;
  queue.push([x, y]);

  let people = matrix[x][y];
  let country = 1;

  let pointer = 0;
  while (pointer < queue.length) {
    const [a, b] = queue[pointer];
    pointer++;

    for (let i = 0; i < 4; i++) {
      const cx = a + dx[i];
      const cy = b + dy[i];
      if (cx < 0 || cx >= N || cy < 0 || cy >= N) continue;
      if (visited[cx][cy]) continue;

      const peopleGap = Math.abs(matrix[cx][cy] - matrix[a][b]);
      if (peopleGap >= L && peopleGap <= R) {
        visited[cx][cy] = 1;
        country++;
        people += matrix[cx][cy];
        queue.push([cx, cy]);
      }
    }
  }

  const peopleNum = Math.floor(people / country);
  while (queue.length) {
    const [x, y] = queue.shift();

    matrix[x][y] = peopleNum;
  }

  return country > 1;
}

console.log(days);
