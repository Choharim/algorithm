const n = Number(input[0]);

const matrix = Array.from({ length: n });
for (let i = 1; i < input.length; i++) {
  matrix[i - 1] = input[i].split(" ").map(Number);
}

let max = 1; // 안전 높이가 1일 때 하나의 그룹이 만들어지므로 최소 1개입니다.
const heightCheck = Array(101);
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
matrix.forEach((row) => {
  row.forEach((num) => {
    if (heightCheck[num] || num === 1) return; // max 기본 값을 안전 높이가 1일 때의 그룹 갯수 1로 지정했으므로 높이 1은 기준으로 지정하지 않습니다.

    heightCheck[num] = traverse(num); // matrix 요소의 값을 기준 높이로 정한 것이므로 최소 그룹의 갯수는 1이다.
    max = Math.max(max, heightCheck[num]);
  });
});

function traverse(height) {
  const visited = Array.from({ length: n }, () => Array(n).fill(0));
  let groupCount = 0;

  matrix.forEach((row, x) => {
    row.forEach((h, y) => {
      if (h < height || visited[x][y]) return;

      groupCount++;
      DFS(x, y);
    });
  });

  function DFS(x, y) {
    const stack = [[x, y]];
    visited[x][y] = 1;

    while (stack.length) {
      [a, b] = stack.pop();

      for (let i = 0; i < 4; i++) {
        const cx = a + dx[i];
        const cy = b + dy[i];
        if (cx < 0 || cx >= n || cy < 0 || cy >= n) continue;
        if (matrix[cx][cy] < height || visited[cx][cy]) continue;

        visited[cx][cy] = 1;
        stack.push([cx, cy]);
      }
    }
  }

  return groupCount;
}

console.log(max);
