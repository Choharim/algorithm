const N = +input[0].split(" ")[0];
const adjacentList = {};

for (let i = 1; i < input.length; i++) {
  [to, from] = input[i].split(" ");

  if (!adjacentList[from]) adjacentList[from] = [];

  adjacentList[from].push(+to); // visited 배열에 접근하기 위해 숫자로 저장합니다.
}

let maxCount = 1;
let result = [];
for (let i = 1; i <= N; i++) {
  count = DFS(i);

  if (maxCount < count) {
    maxCount = count;
    result = [i];
  } else if (maxCount === count) {
    result.push(i);
  }
}

function DFS(start) {
  const stack = [start];
  const visited = Array.from({ length: N + 1 }); // 사용할 배열 길이를 지정합니다.
  let count = 1;

  visited[stack] = 1;

  while (stack.length) {
    cur = stack.pop();

    // 정점 정보만으로 인접 리스트를 생성했으므로 length가 없을 경우가 있습니다.
    if (!adjacentList[cur]) continue;

    for (let i = 0; i < adjacentList[cur].length; i++) {
      const vertex = adjacentList[cur][i];
      if (visited[vertex]) continue;

      count++;
      visited[vertex] = 1;
      stack.push(vertex);
    }
  }

  return count;
}

console.log(result.join(" "));
