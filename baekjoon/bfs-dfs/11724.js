// 인접 리스트 구현
const n = Number(input[0].split(" ")[0]);

const adjacentList = {};

for (let i = 1; i < input.length; i++) {
  [v1, v2] = input[i].split(" ");

  if (!adjacentList[v1]) adjacentList[v1] = [];
  if (!adjacentList[v2]) adjacentList[v2] = [];

  adjacentList[v1].push(v2);
  adjacentList[v2].push(v1);
}

// BFS 순회
function BFS() {
  const visited = [];
  let count = 0;

  for (let v = 1; v <= n; v++) {
    if (visited[v]) continue;

    count++;
    // 혼자 떨어져 있는 정점의 경우 인접 리스트 key에 존재하지 않는다.
    if (adjacentList[v]?.length) traverse(v);
  }

  function traverse(vertex) {
    const queue = [vertex];
    visited[vertex] = 1;

    while (queue.length) {
      v = queue.shift();

      for (let i = 0; i < adjacentList[v].length; i++) {
        if (visited[adjacentList[v][i]]) continue;

        queue.push(adjacentList[v][i]);
        visited[adjacentList[v][i]] = 1;
      }
    }
  }

  return count;
}
