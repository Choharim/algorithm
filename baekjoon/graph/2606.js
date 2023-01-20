const [count, compairCount, ...line] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let graph = {};

for (let i = 0; i < compairCount; i++) {
  [vertex1, vertex2] = line[i].split(" ").map(Number);

  if (!graph[vertex1]) graph[vertex1] = [];
  if (!graph[vertex2]) graph[vertex2] = [];

  graph[vertex1].push(vertex2);
  graph[vertex2].push(vertex1);
}

// dfs
function dfsSolution(startVertex) {
  let count = 0;
  let check = new Set();

  function traverse(vertex) {
    for (let i = 0; i < graph[vertex].length; i++) {
      if (check.has(graph[vertex][i])) continue;

      count++;
      check.add(graph[vertex][i]);
      traverse(graph[vertex][i]);
    }
  }

  check.add(startVertex);
  traverse(startVertex);

  return count;
}
console.log(dfsSolution(1));

// bfs
function bfsSolution(startVertex) {
  let queue = [];
  let check = new Set();
  let count = 0;

  queue.push(startVertex);
  check.add(startVertex);

  let dequeue;
  while (queue.length) {
    dequeue = queue.shift();
    count++;

    for (let i = 0; i < graph[dequeue].length; i++) {
      if (check.has(graph[dequeue][i])) continue;

      queue.push(graph[dequeue][i]);
      check.add(graph[dequeue][i]);
    }
  }

  return count - 1;
}
console.log(bfsSolution(1));
