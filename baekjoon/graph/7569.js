const [M, N, H] = input[0].split(" ").map(Number);

const box = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => [])
);
let total = N * M * H;
const queue = [];

for (let x = 0; x < N; ++x) {
  for (let z = 0; z < H; ++z) {
    const row = input[x + 1 + N * z].split(" ");
    for (let y = 0; y < M; ++y) {
      box[x][y][z] = +row[y];

      if (row[y] < 0) {
        total--;
      }
      if (row[y] == 1) {
        total--;
        queue.push([x, y, z, 0]);
      }
    }
  }
}

const dx = [0, 0, 0, 0, -1, 1];
const dy = [0, 0, -1, 1, 0, 0];
const dz = [-1, 1, 0, 0, 0, 0];
let queueIdx = 0;
let day = 0;

while (queueIdx < queue.length) {
  [x, y, z, d] = queue[queueIdx];
  queueIdx++;

  day = d + 1;

  for (let i = 0; i < 6; i++) {
    const cx = x + dx[i];
    const cy = y + dy[i];
    const cz = z + dz[i];

    if (cx < 0 || cx >= N || cy < 0 || cy >= M || cz < 0 || cz >= H) continue;
    if (box[cx][cy][cz] === 0) {
      total--;
      box[cx][cy][cz] = day;
      queue.push([cx, cy, cz, day]);
    }
  }
}

console.log(total ? -1 : day - 1);
