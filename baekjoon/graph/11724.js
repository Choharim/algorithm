const n = +input.shift().split(" ")[0];

let graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

for (let i = 0; i < input.length; i++) {
  [v1, v2] = input[i].split(" ");

  graph[v1][v2] = 1;
  graph[v2][v1] = 1;
}

let check = [];
let count = 0;
for (let i = 1; i <= n; i++) {
  if (check[i]) continue;

  count++;
  dfs(i);
}

function dfs(vertex) {
  check[vertex] = 1;

  for (let i = 1; i < graph[vertex].length; i++) {
    if (!graph[vertex][i]) continue;
    if (check[i]) continue;

    dfs(i);
  }
}

console.log(count);
