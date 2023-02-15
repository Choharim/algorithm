const [n, m] = input[0].split(" ").map(Number);

const map = [];
const distance = Array.from({ length: n }, () => Array(m).fill(-1)); // 목표 지점에서 갈 수 없는 곳은 -1을 지정해야 하므로 -1로 초기화합니다.
const queue = [];

for (let x = 1; x <= n; x++) {
  row = input[x].split(" ").map(Number);
  map[x - 1] = row; // map 이차원 배열을 생성합니다.

  for (let y = 0; y < m; y++) {
    if (map[x - 1][y] === 2) {
      queue.push([x - 1, y]);
      distance[x - 1][y] = 0;
    } else if (map[x - 1][y] === 0) {
      distance[x - 1][y] = 0;
    }
  }
}

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
while (queue.length) {
  [a, b] = queue.shift();

  for (let i = 0; i < 4; i++) {
    const cx = a + dx[i];
    const cy = b + dy[i];
    if (cx < 0 || cx >= n || cy < 0 || cy >= m) continue;
    if (map[cx][cy] !== 1 || distance[cx][cy] > -1) continue;

    // 이전에 방문하지 않았으며 map에서 1인 곳을 방문합니다.
    queue.push([cx, cy]);
    distance[cx][cy] = distance[a][b] + 1;
  }
}

let result = "";

distance.forEach((row, x) => {
  result += row.join(" ");
  if (x < n - 1) result += "\n";
});

console.log(result);
