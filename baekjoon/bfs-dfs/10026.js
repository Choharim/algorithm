const N = Number(input[0]);

const martix = Array.from({ length: N });
for (let i = 1; i <= N; i++) {
  martix[i - 1] = input[i].split("");
}

// B를 방문하면 1체크 합니다.
// R 또는 G를 처음 방문하면 1체크를 합니다. 연결된 R,G에서 R과 G를 구분할 때는 2를 체크합니다.
const visited = Array.from({ length: N }, () => Array(N).fill(0));

let normalCase = 0; // 적록색약이 아닌 사람이 보는 구역 수
let redGreenSameCase = 0; // 적록색약인 사람이 보는 구역 수

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    if (visited[x][y] > 0) continue;

    if (martix[x][y] === "B") {
      traverse(x, y, 1);
      normalCase++;
    } else {
      traverseRorG(x, y, 1);
    }
    redGreenSameCase++;
  }
}

function isValidRange(x, y) {
  if (x < 0 || x >= N || y < 0 || y >= N) return false;
  return true;
}

function traverse(x, y, checkNum) {
  visited[x][y] = checkNum;

  for (let i = 0; i < 4; i++) {
    const cx = x + dx[i];
    const cy = y + dy[i];
    if (!isValidRange(cx, cy)) continue;
    if (martix[cx][cy] !== martix[x][y] || visited[cx][cy] === checkNum)
      continue;

    traverse(cx, cy, checkNum);
  }
}

function traverseRorG(x, y, checkNum) {
  const queue = [[x, y]];
  visited[x][y] = checkNum;

  let index = 0;
  while (index < queue.length) {
    const [a, b] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const cx = a + dx[i];
      const cy = b + dy[i];
      if (!isValidRange(cx, cy)) continue;
      if (martix[cx][cy] === "B" || visited[cx][cy] === checkNum) continue;

      queue.push([cx, cy]);
      visited[cx][cy] = checkNum;
    }
  }

  while (queue.length) {
    const [a, b] = queue.shift();

    if (visited[a][b] === checkNum) {
      traverse(a, b, checkNum + 1);
      normalCase++;
    }
  }
}

console.log(`${normalCase} ${redGreenSameCase}`);
