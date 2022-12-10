/**
 * @문제 - 방향그래프가 주어지면 1번 정점에서 N번 정점으로 가는 모든 경로의 가지 수를 출력하는 프 로그램을 작성하세요.
 * // solution(1, 5, [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 1],
    [2, 3],
    [2, 5],
    [3, 4],
    [4, 2],
    [4, 5],
  ])
 */
function makeGraphList(vertexArr) {
  let hash = {};

  for (let i = 0; i < vertexArr.length; i++) {
    if (hash[vertexArr[i][0]] === undefined) {
      hash[vertexArr[i][0]] = [];
    }
    hash[vertexArr[i][0]].push(vertexArr[i][1]);
  }

  return hash;
}
function solution(start, end, vertexArr) {
  const graphList = makeGraphList(vertexArr);
  let count = 0;
  let result = "";

  function DFS(s, visited = [], check = {}) {
    if (s === end) {
      count++;
      visited = [...visited, end];

      result += visited.join(" ");
      result += "\n";
    } else {
      check[s] = true;
      visited = [...visited, s];

      for (let i = 0; i < graphList[s].length; i++) {
        if (check[graphList[s][i]]) continue;

        DFS(graphList[s][i], visited, check);
        delete check[graphList[s][i]];
      }
    }
  }
  DFS(start);

  return `${result}${count}`;
}
function solution(start, end, vertexArr) {
  const graphList = makeGraphList(vertexArr);
  let count = 0;
  let result = "";

  function DFS(s, visited = [], check = {}) {
    if (s === end) {
      count++;
      check[end] = true;
      visited.push(end);

      result += visited.join(" ");
      result += "\n";
    } else {
      check[s] = true;
      visited.push(s);

      for (let i = 0; i < graphList[s].length; i++) {
        if (check[graphList[s][i]]) continue;

        DFS(graphList[s][i], visited, check);

        delete check[graphList[s][i]];
        visited.pop();
      }
    }
  }
  DFS(start);

  return `${result}${count}`;
}
