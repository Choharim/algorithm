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
function solution(start, end, vertexArr) {
  const graphList = makeGraphList(vertexArr);
  let count = 0;
  let result = "";

  let check = {};
  let visited = [];

  function DFS(s) {
    if (s === end) {
      count++;

      result += visited.join(" ");
      result += "\n";
    } else {
      for (let i = 0; i < graphList[s].length; i++) {
        if (check[graphList[s][i]]) continue;

        check[graphList[s][i]] = true;
        visited.push(graphList[s][i]);
        DFS(graphList[s][i]);

        delete check[graphList[s][i]];
        visited.pop();
      }
    }
  }
  check[start] = true;
  visited.push(start);
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
  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  // let visited = [];
  let count = 0;

  function DFS(x, y) {
    if (x === end && y === end) {
      grid[x][y] = 1;
      // visited.push([x, y]);

      count++;
    } else {
      grid[x][y] = 1;
      // visited.push([x, y]);

      for (let i = 0; i < 4; i++) {
        if (x + dx[i] < 0 || x + dx[i] > end) continue;
        if (y + dy[i] < 0 || y + dy[i] > end) continue;
        if (grid[x + dx[i]][y + dy[i]]) continue;

        DFS(x + dx[i], y + dy[i]);

        grid[x + dx[i]][y + dy[i]] = 0;
        // visited.pop();
      }
    }
  }
  DFS(0, 0);

  return count;
}

function solution(grid) {
  const end = grid.length - 1;
  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  // let visited = [];
  let count = 0;

  function DFS(x, y) {
    if (x === end && y === end) {
      count++;
    } else {
      for (let i = 0; i < 4; i++) {
        if (x + dx[i] < 0 || x + dx[i] > end) continue;
        if (y + dy[i] < 0 || y + dy[i] > end) continue;
        if (grid[x + dx[i]][y + dy[i]]) continue;

        grid[x + dx[i]][y + dy[i]] = 1;
        // visited.push([x + dx[i], y + dy[i]]);
        DFS(x + dx[i], y + dy[i]);

        grid[x + dx[i]][y + dy[i]] = 0;
        // visited.pop();
      }
    }
  }
  grid[0][0] = 1;
  // visited.push([0, 0]);
  DFS(0, 0);

  return count;
}
// review
function solution(grid) {
  const end = grid.length - 1;

  let count = 0;

  function DFS(x, y) {
    if (x === end && y === end) {
      count++;
    } else {
      for (const [a, b] of [
        [x, y + 1],
        [x, y - 1],
        [x - 1, y],
        [x + 1, y],
      ]) {
        if (a < 0 || a > end) continue;
        if (b < 0 || b > end) continue;
        if (grid[a][b]) continue;

        grid[a][b] = 1;
        DFS(a, b);

        grid[a][b] = 0;
      }
    }
  }
  grid[0][0] = 1;
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
//solution(1)
function solution(root) {
  let queue = [];
  let visited = [];

  queue.push(root);

  let dequeue;
  while (queue.length) {
    dequeue = queue.shift();
    if (dequeue > 7) break;

    visited.push(dequeue);

    if (dequeue * 2 + 1 > 7) continue;
    queue.push(dequeue * 2);
    queue.push(dequeue * 2 + 1);
  }

  return visited;
}

//review
function solution(root = 1) {
  let queue = [];
  let dequeue;
  let level = 0;

  let visited = [];

  function BFS() {
    while (queue.length) {
      let cycle = queue.length;

      level++;

      while (cycle) {
        dequeue = queue.shift();
        visited.push(dequeue);

        if (level < 3) {
          queue.push(dequeue * 2);
          queue.push(dequeue * 2 + 1);
        }

        cycle--;
      }
    }
  }
  queue.push(root);
  BFS();

  return visited;
}

/**
 * @문제 - 현수의 위치와 송아 지의 위치가 수직선상의 좌표 점으로 주어지면 현수는 현재 위치에서 송아지의 위치까지 다음 과 같은 방법으로 이동한다. 송아지는 움직이지 않고 제자리에 있다.
 * 현수는 스카이 콩콩을 타고 가는데 한 번의 점프로 앞으로 1, 뒤로 1, 앞으로 5를 이동할 수 있다.
 * 최소 몇 번의 점프로 현수가 송아지의 위치까지 갈 수 있는지 구하는 프로그램을 작성 하세요.
 *
 * 입력
 * 5 14 // 현수 위치, 송아지 위치
 * 출력
 * 3
 */
function solution(start, end) {
  const move = [1, -1, 5];
  let queue = [];
  let check = {};

  function BFS() {
    queue.push([start, 0]);
    check[start] = true;

    while (queue.length) {
      [position, level] = queue.shift();

      for (let i = 0; i < move.length; i++) {
        if (position + move[i] === end) return level + 1;
        if (position + move[i] < 1 || position + move[i] > 10000) continue;
        if (check[position + move[i]]) continue;

        check[position + move[i]] = true;
        queue.push([position + move[i], level + 1]);
      }
    }
  }
  return BFS();
}
function solution(start, end) {
  const move = [1, -1, 5];
  let queue = [];
  let check = {};
  let dequeue;
  let cycle;

  let level = 0;

  function BFS() {
    queue.push(start);
    check[start] = true;

    while (queue.length) {
      cycle = queue.length;

      level++;
      for (let i = 1; i <= cycle; i++) {
        dequeue = queue.shift();

        for (let j = 0; j < move.length; j++) {
          if (dequeue + move[j] < 1 || dequeue + move[j] > 10000) continue;
          if (check[dequeue + move[j]]) continue;
          if (dequeue + move[j] === end) {
            return;
          }

          queue.push(dequeue + move[j]);
          check[dequeue + move[j]] = true;
        }
      }
    }
  }
  BFS();

  return level;
}

// review
function solution(start, end) {
  let queue = [];
  let dequeue;
  let check = {};

  let level = 0;

  function BFS() {
    while (queue.length) {
      let cycle = queue.length;

      while (cycle) {
        dequeue = queue.shift();

        for (const x of [dequeue + 1, dequeue - 1, dequeue + 5]) {
          if (check[x]) continue;
          if (x < 1 || x > 10000) continue;
          if (x === end) return level + 1;

          queue.push(x);
          check[x] = true;
        }

        cycle--;
      }

      level++;
    }
  }

  queue.push(start);
  check[start] = true;
  return BFS();
}

/**
 * @문제 - N*N의 섬나라 아일랜드의 지도가 격자판의 정보로 주어집니다.
 * 각 섬은 1로 표시되어 상하좌 우와 대각선으로 연결되어 있으며, 0은 바다입니다.
 * 섬나라 아일랜드에 몇 개의 섬이 있는지 구하는 프로그램을 작성하세요.
 */

// solution([
//   [1, 1, 0, 0, 0, 1, 0],
//   [0, 1, 1, 0, 1, 1, 0],
//   [0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 0, 1, 1],
//   [1, 1, 0, 1, 1, 0, 0],
//   [1, 0, 0, 0, 1, 0, 0],
//   [1, 0, 1, 0, 1, 0, 0],
// ])
function solution(islandBoard) {
  const dx = [0, 0, -1, 1, 1, 1, -1, -1];
  const dy = [-1, 1, 0, 0, 1, -1, 1, -1];
  const n = islandBoard.length;

  let count = 0;

  function DFS(x, y) {
    islandBoard[x][y] = 0;

    for (let i = 0; i < dx.length; i++) {
      if (x + dx[i] < 0 || x + dx[i] >= n) continue;
      if (y + dy[i] < 0 || y + dy[i] >= n) continue;
      if (!islandBoard[x + dx[i]][y + dy[i]]) continue;

      DFS(x + dx[i], y + dy[i]);
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (islandBoard[i][j]) {
        count++;

        DFS(i, j);
      }
    }
  }

  return count;
}

// review
function solution(matrix) {
  const end = matrix.length - 1;

  let count = 0;

  function DFS(x, y) {
    matrix[x][y] = 0;

    for (const [a, b] of [
      [x, y + 1],
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x + 1, y + 1],
      [x - 1, y - 1],
      [x + 1, y - 1],
    ]) {
      if (a < 0 || a > end) continue;
      if (b < 0 || b > end) continue;
      if (!matrix[a][b]) continue;

      DFS(a, b);
    }
  }

  matrix.forEach((row, x) => {
    row.forEach((num, y) => {
      if (!num) return;

      count++;
      DFS(x, y);
    });
  });

  return count;
}

/***
 * queue에 넣을 때 islandBoard를 0으로 해주어야 불필요하게 같은 곳이 queue에 들어가지 않음
 */
function solution(islandBoard) {
  const n = islandBoard.length;
  const dx = [0, 0, -1, 1, 1, 1, -1, -1];
  const dy = [-1, 1, 0, 0, 1, -1, 1, -1];
  let queue = [];

  let count = 0;

  function BFS() {
    while (queue.length) {
      [x, y] = queue.shift();

      for (let k = 0; k < dx.length; k++) {
        if (x + dx[k] < 0 || x + dx[k] >= n) continue;
        if (y + dy[k] < 0 || y + dy[k] >= n) continue;
        if (!islandBoard[x + dx[k]][y + dy[k]]) continue;

        islandBoard[x + dx[k]][y + dy[k]] = 0;
        queue.push([x + dx[k], y + dy[k]]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (islandBoard[i][j]) {
        count++;

        islandBoard[i][j] = 0;
        queue.push([i, j]);
        BFS();
      }
    }
  }

  return count;
}
