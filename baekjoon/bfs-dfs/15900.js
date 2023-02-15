const n = +input[0];

const adjacentList = {};
for (let i = 1; i < input.length; i++) {
  const [v1, v2] = input[i].split(" ").map(Number);

  if (!adjacentList[v1]) adjacentList[v1] = [];
  if (!adjacentList[v2]) adjacentList[v2] = [];

  adjacentList[v1].push(v2);
  adjacentList[v2].push(v1);
}

let possibleGameCount = 0;
const visited = Array({ length: n + 1 });

function DFS(v = 1, level = 0) {
  if (visited[v]) return;

  visited[v] = 1;

  for (let i = 0; i < adjacentList[v].length; i++) {
    const vertex = adjacentList[v][i];

    if (visited[vertex]) continue;

    DFS(vertex, level + 1);
  }

  if (v !== 1 && adjacentList[v].length === 1) possibleGameCount += level;
}

DFS();

console.log(possibleGameCount % 2 ? "Yes" : "No");
