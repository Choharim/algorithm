/**
 * @문제 - 방향그래프가 주어지면 1번 정점에서 N번 정점으로 가는 모든 경로의 가지 수를 출력하는 프 로그램을 작성하세요.
 */
/**
 * 인접 리스트 이용
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

/**
 * 인접 행렬 이용
 */
function makeGraphMatrix(vertexArr) {
  let graphMatrix = [];

  for (let i = 0; i < vertexArr.length; i++) {
    if (graphMatrix[vertexArr[i][0] - 1] === undefined) {
      graphMatrix[vertexArr[i][0] - 1] = [];
    }
    graphMatrix[vertexArr[i][0] - 1].push(vertexArr[i][1] - 1);
  }

  return graphMatrix;
}
function solution(start, end, vertexArr) {
  const graphMatrix = makeGraphMatrix(vertexArr);
  let result = "";
  let count = 0;

  function DFS(vertex, visited = [], checked = {}) {
    if (vertex === end) {
      visited.push(end);
      checked[end] = true;

      result += visited.join(" ");
      result += "\n";
      count++;
    } else {
      visited.push(vertex);
      checked[vertex] = true;

      for (let i = 0; i < graphMatrix[vertex - 1].length; i++) {
        if (checked[graphMatrix[vertex - 1][i] + 1]) continue;

        DFS(graphMatrix[vertex - 1][i] + 1, visited, checked);

        visited.pop();
        delete checked[graphMatrix[vertex - 1][i] + 1];
      }
    }
  }
  DFS(start);

  return `${result}${count}`;
}

/**
 * @문제 - 7*7 격자판 미로를 탈출하는 경로의 가지수를 출력하는 프로그램을 작성하세요.
 * 출발점은 격 자의 (1, 1) 좌표이고, 탈출 도착점은 (7, 7)좌표이다. 격자판의 1은 벽이고, 0은 통로이다. 격 자판의 움직임은 상하좌우로만 움직인다
 *
 * 입력 // 7*7격자판
 * 0000000
 * 0111110
 * 0001000
 * 1101011
 * 1100001
 * 1101100
 * 1000000
 *
 * 출력
 * 8 // 출발점에서 도착점까지 갈 수 있는 방법의 수는 8가지
 */
/**
 *  solution([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
  ])
 */
function solution(grid) {
  const end = grid.length - 1;
  let cheked = {};
  // let visited = [];
  let count = 0;

  function DFS(x, y) {
    if (x === end && y === end) {
      cheked[[x, y]] = true;
      // visited.push([x, y]);

      count++;
    } else {
      cheked[[x, y]] = true;
      // visited.push([x, y]);

      for (let i = -1; i <= 1; i += 2) {
        if (x + i < 0 || x + i > end) continue;
        if (cheked[[x + i, y]]) continue;
        if (grid[x + i][y]) continue;

        DFS(x + i, y);

        delete cheked[[x + i, y]];
        // visited.pop();
      }

      for (let j = -1; j <= 1; j += 2) {
        if (y + j < 0 || y + j > end) continue;
        if (cheked[[x, y + j]]) continue;
        if (grid[x][y + j]) continue;

        DFS(x, y + j);
        delete cheked[[x, y + j]];
        // visited.pop();
      }
    }
  }
  DFS(0, 0);

  return count;
}

/**
 * @문제 - 이진트리를 넓이우선탐색해 보세요.
 * root: 1
 * 왼쪽 노드 : 부모의 * 2
 * 오른쪽 노드 : 부모의 * 2 + 1
 * 단계는 3단계 (마지막 노드의 값 7)
 */
function Queue() {
  this.queue = [];

  this.enqueue = function (val) {
    this.queue.push(val);
  };

  this.dequeue = function () {
    return this.queue.shift();
  };
}
function solution(root) {
  const queue = new Queue();

  let visited = [];
  let dequeue;

  function BFS() {
    dequeue = queue.dequeue();

    if (dequeue > 7) {
    } else {
      visited.push(dequeue);

      queue.enqueue(dequeue * 2);
      queue.enqueue(dequeue * 2 + 1);

      BFS();
    }
  }

  queue.enqueue(root);
  BFS();

  return visited;
}
console.log(solution(1));
