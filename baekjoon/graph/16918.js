const [R, C, N] = input[0].split(" ").map(Number);

const matrix = Array.from({ length: R }, () => Array(C).fill(0));
for (let i = 1; i <= R; i++) {
  line = input[i].split("");

  for (let j = 0; j < C; j++) {
    if (line[j] === "O") {
      matrix[i - 1][j] = 3;
    }
  }
}

let time = 0;
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let prevMatrix;
while (time < N) {
  time++;

  prevMatrix = [...matrix].map((v) => [...v]);

  if (time % 2) {
    decreaseTime();
  } else {
    fillBomb();
  }
}

function fillBomb() {
  for (let x = 0; x < R; x++) {
    for (let y = 0; y < C; y++) {
      if (matrix[x][y] === 0) {
        DFS(x, y);
      }
    }
  }

  function DFS(x, y) {
    const stack = [[x, y]];

    while (stack.length) {
      [a, b] = stack.pop();

      matrix[a][b] = 3;

      for (let i = 0; i < 4; i++) {
        const cx = a + dx[i];
        const cy = b + dy[i];
        if (cx < 0 || cx >= R || cy < 0 || cy >= C) continue;

        if (matrix[cx][cy] === 0) {
          stack.push([cx, cy]);
        }
      }
    }
  }

  decreaseTime(3);
}

function decreaseTime(withoutTime) {
  for (let x = 0; x < R; x++) {
    for (let y = 0; y < C; y++) {
      if (withoutTime === matrix[x][y]) continue;

      if (prevMatrix[x][y] === 1) {
        for (let i = 0; i < 4; i++) {
          const cx = x + dx[i];
          const cy = y + dy[i];
          if (cx < 0 || cx >= R || cy < 0 || cy >= C) continue;

          matrix[cx][cy] = 0;
        }
      }

      if (matrix[x][y] > 0) matrix[x][y] -= 1;
    }
  }
}

function printResult() {
  let result = "";

  for (let x = 0; x < R; x++) {
    for (let y = 0; y < C; y++) {
      if (matrix[x][y] > 0) {
        result += "O";
      } else {
        result += ".";
      }
    }

    if (x < R - 1) result += "\n";
  }
  return result;
}
console.log(printResult(matrix));
