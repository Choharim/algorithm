const n = +input.shift();

let graph = Array.from({ length: n }, () => Array(n).fill(0));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    graph[i][j] = +input[i][j];
  }
}

let total = 0;
let group = [];
let groupCount = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!graph[i][j]) continue;

    total++;
    dfs(i, j);
    group.push(groupCount);
    groupCount = 0;
  }
}

function dfs(x, y) {
  groupCount++;
  graph[x][y] = 0;

  for (let [a, b] of [
    [x, y + 1],
    [x + 1, y],
    [x, y - 1],
    [x - 1, y],
  ]) {
    if (a < 0 || a >= n || b < 0 || b >= n) continue;
    if (!graph[a][b]) continue;

    dfs(a, b);
  }
}

group.sort((a, b) => (a > b ? 1 : -1));

console.log(total);
console.log(group.join("\n"));
