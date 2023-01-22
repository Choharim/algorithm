const size = +input[0];
let matrix = [];
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];
for (let i = 1; i <= size; i++) {
  matrix[i - 1] = input[i].split(" ").map(Number);
}

let safeHeight = [];
let maxCount = 1;
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    if (safeHeight[matrix[i][j]]) continue;

    safeHeight[matrix[i][j]] = 1;
    maxCount = Math.max(maxCount, start(matrix[i][j]));
  }
}

function start(height) {
  let check = Array.from({ length: size }, () => Array(size).fill(0));
  let count = 0;

  function dfs(x, y) {
    check[x][y] = 1;

    for (let i = 0; i < 4; i++) {
      if (
        x + dx[i] < 0 ||
        x + dx[i] >= size ||
        y + dy[i] < 0 ||
        y + dy[i] >= size
      )
        continue;
      if (matrix[x + dx[i]][y + dy[i]] < height || check[x + dx[i]][y + dy[i]])
        continue;

      dfs(x + dx[i], y + dy[i]);
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] < height || check[i][j]) continue;

      count++;
      dfs(i, j);
    }
  }

  return count;
}

console.log(maxCount);
