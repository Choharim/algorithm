const [count, compairCount, ...line] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

// 문제 - 토마토

// 인접 리스트 생성
const adjacentList = {};

for (let i = 2; i < input.length; i++) {
  [v1, v2] = input[i].split(" ");

  if (!adjacentList[v1]) adjacentList[v1] = [];
  if (!adjacentList[v2]) adjacentList[v2] = [];

  adjacentList[v1].push(v2);
  adjacentList[v2].push(v1);
}

// BFS로 구현
function BFS(startVertex) {
  const visited = [];
  const queue = [];
  let count = 0;

  queue.push(startVertex);
  visited[startVertex] = 1;

  while (queue.length) {
    vertex = queue.shift();

    for (let i = 0; i < adjacentList[vertex].length; i++) {
      if (visited[adjacentList[vertex][i]]) continue;

      count++;
      queue.push(adjacentList[vertex][i]);
      visited[adjacentList[vertex][i]] = 1;
    }
  }

  return count;
}

// DFS - Stack으로 구현
function DFS(startVertex) {
  const visited = [];
  const stack = [];
  let count = 0;

  stack.push(startVertex);
  visited[startVertex] = 1;

  while (stack.length) {
    vertex = stack.pop();

    for (let i = 0; i < adjacentList[vertex].length; i++) {
      if (visited[adjacentList[vertex][i]]) continue;

      count++;
      stack.push(adjacentList[vertex][i]);
      visited[adjacentList[vertex][i]] = 1;
    }
  }

  return count;
}

// DFS - 재귀로 구현
function DFS(startVertex) {
  const visited = [];
  let count = 0;

  function traverse(vertex) {
    visited[vertex] = 1;

    for (let i = 0; i < adjacentList[vertex].length; i++) {
      if (visited[adjacentList[vertex][i]]) continue;

      count++;
      traverse(adjacentList[vertex][i]);
    }
  }
  traverse(startVertex);

  return count;
}
