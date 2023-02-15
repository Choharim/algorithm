const [COULMN, ROW] = input[0].split(" ").map(Number);

const box = Array(ROW);
for (let i = 1; i < input.length; i++) {
  box[i - 1] = input[i].split(" ").map(Number);
}

let count = COULMN * ROW;
const queue = [];
let days = 0;

box.forEach((row, x) => {
  row.forEach((num, y) => {
    if (num === 1) {
      queue.push([x, y]);
      count--; // 처음부터 익은 갯수
    } else if (num === -1) {
      count--; // 없는 갯수
    }
  });
});

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let idx = 0;
while (idx < queue.length) {
  [x, y] = queue[idx];
  idx++;

  for (let i = 0; i < 4; i++) {
    const cx = x + dx[i];
    const cy = y + dy[i];

    if (cx < 0 || cx >= ROW || cy < 0 || cy >= COULMN) continue;
    if (box[cx][cy] === 0) {
      count--; // 익혀진 갯수
      box[cx][cy] = box[x][y] + 1;
      queue.push([cx, cy]);
    }
  }

  if (idx === queue.length) {
    days = box[x][y] - 1; // 마지막 날짜만 저장합니다.
  }
}

console.log(count ? -1 : days);
