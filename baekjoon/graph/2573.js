const [N, M] = input[0].split(" ").map(Number);

const nextMatrix = Array.from({ length: N });
for (let i = 1; i <= N; i++) {
  nextMatrix[i - 1] = input[i].split(" ").map(Number);
}

let years = 0;
let currentMatrix;
let check;
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
while (true) {
  let groupCount = 0;
  check = Array.from({ length: N }, () => Array(M));
  currentMatrix = [...nextMatrix].map((v) => [...v]);

  // 1 ~ 마지막 행 전까지만 확인합니다.
  for (let x = 1; x < N; x++) {
    // 1 ~ 마지막 열 전까지만 확인합니다.
    for (let y = 1; y < M; y++) {
      if (!currentMatrix[x][y] || check[x][y]) continue;

      groupCount++;
      DFS(x, y);
    }
  }

  if (!groupCount) {
    console.log(0);
    return;
  } else if (groupCount >= 2) {
    console.log(years);
    return;
  }

  years++;
}

function DFS(x, y) {
  const stack = [[x, y]];
  check[x][y] = 1;

  while (stack.length) {
    [a, b] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const cx = a + dx[i];
      const cy = b + dy[i];
      if (cx < 0 || cx >= N || cy < 0 || cy >= M) continue;

      // 주변 바다의 갯수만큼 높이를 깎아줍니다.
      if (!currentMatrix[cx][cy] && nextMatrix[a][b] > 0) {
        nextMatrix[a][b]--;
      }

      if (!currentMatrix[cx][cy] || check[cx][cy]) continue;

      stack.push([cx, cy]);
      check[cx][cy] = 1;
    }
  }
}
