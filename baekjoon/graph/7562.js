const n = Number(input[0]);

const result = [];
const dx = [-1, -2, -2, -1, 1, 2, 2, 1];
const dy = [-2, -1, 1, 2, -2, -1, 1, 2];

for (let i = 0; i < n; i++) {
  const startIdx = 1 + i * 3;

  start = input[startIdx + 1].split(" ").map(Number);
  end = input[startIdx + 2].split(" ").map(Number);

  solution(Number(input[startIdx]), start, end);
}

function solution(size, [x, y], [x1, y1]) {
  if (x === x1 && y === y1) {
    result.push(0);
    return;
  }

  const matrix = Array.from({ length: size }, () => Array(size).fill(-1));
  const queue = [[x, y]];
  matrix[x][y] = 0; // 나이트를 사용한 횟수를 저장합니다.

  while (queue.length) {
    [a, b] = queue.shift();

    for (let i = 0; i < 8; i++) {
      const cx = a + dx[i];
      const cy = b + dy[i];
      if (cx < 0 || cx >= size || cy < 0 || cy >= size) continue; // 범위 내에서만 이동합니다.
      if (matrix[cx][cy] > -1) continue; // 방문하지 않는 곳으로만 이동합니다.

      if (cx === x1 && cy === y1) {
        result.push(matrix[a][b] + 1);
        return;
      }
      queue.push([cx, cy]);
      matrix[cx][cy] = matrix[a][b] + 1;
    }
  }
}

console.log(result.join("\n"));
