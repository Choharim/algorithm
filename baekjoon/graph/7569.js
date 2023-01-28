const [M, N, H] = input[0].split(" ").map(Number);

const box = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Array(H))
);

let total = M * N * H;
const queue = [];

for (let n = 1; n <= N; n++) {
  for (let h = 0; h < H; h++) {
    const row = input[n + N * h].split(" ").map(Number);

    for (let m = 0; m < M; m++) {
      box[n - 1][m][h] = row[m];

      if (row[m] === 1) {
        queue.push([n - 1, m, h]);
        total--; // 익은 토마토 갯수
      } else if (row[m] === -1) {
        total--; // 빈 곳 갯수
      }
    }
  }
}

let days = 0;

let idx = 0;
const dx = [0, 1, 0, -1, 0, 0];
const dy = [1, 0, -1, 0, 0, 0];
const dz = [0, 0, 0, 0, 1, -1];

while (idx < queue.length) {
  [x, y, z] = queue[idx];
  idx++;

  for (let i = 0; i < 6; i++) {
    const cx = x + dx[i];
    const cy = y + dy[i];
    const cz = z + dz[i];
    if (cx < 0 || cx >= N || cy < 0 || cy >= M || cz < 0 || cz >= H) continue;
    if (box[cx][cy][cz] === 0) {
      total--; // 익혀진 갯수

      queue.push([cx, cy, cz]);
      box[cx][cy][cz] = box[x][y][z] + 1;
    }
    if (idx === queue.length) {
      days = box[x][y][z] - 1;
    }
  }
}

console.log(total ? -1 : days);
