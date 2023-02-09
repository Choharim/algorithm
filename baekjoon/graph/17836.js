const [n, m, deadTime] = input[0].split(" ").map(Number);

const matrix = Array(n);
for (let i = 1; i < input.length; i++) {
  matrix[i - 1] = input[i].split(" ").map(Number);
}

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const queue = [[0, 0]]; // x,y
const times = Array.from({ length: n }, () => Array(m));
times[0][0] = 0;

let timeWithoutPower = Number.MAX_SAFE_INTEGER;
let timeWithPower = Number.MAX_SAFE_INTEGER;

while (queue.length) {
  [x, y] = queue.shift();

  if (times[x][y] > deadTime) break;

  if (x === n - 1 && y === m - 1) {
    timeWithoutPower = times[x][y];
    break;
  }

  for (let i = 0; i < 4; i++) {
    const cx = x + dx[i];
    const cy = y + dy[i];
    if (cx < 0 || cx >= n || cy < 0 || cy >= m) continue;
    if (matrix[cx][cy] === 1) continue;

    if (matrix[cx][cy] === 2) {
      calcTimeWithPower(cx, cy, times[x][y] + 1);
    }

    times[cx][cy] = times[x][y] + 1;
    queue.push([cx, cy]);
    matrix[cx][cy] = 1;
  }
}

function calcTimeWithPower(x, y, t) {
  const time = n - 1 - x + m - 1 - y + t;

  if (time <= deadTime) {
    timeWithPower = time;
  }
}

const minTime = Math.min(timeWithoutPower, timeWithPower);
console.log(minTime === Number.MAX_SAFE_INTEGER ? "Fail" : minTime);
