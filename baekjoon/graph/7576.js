const [m, n] = input[0].split(" ");

let graph = [];
let temp;

let remainCount = m * n;
let queue = [];
for (let i = 0; i < n; i++) {
  temp = input[i + 1].split(" ").map(Number);
  graph[i] = temp;

  for (let j = 0; j < m; j++) {
    if (temp[j] < 0) {
      remainCount--; // -1 값을 가진 위치의 개수를 빼준다.
    }
    if (temp[j] == 1) {
      queue.push([i, j, 0]); // 행,열,익기위해 필요한 날짜
    }
  }
}

let day = 0;
let queueIdx = 0;
while (queueIdx < queue.length) {
  [x, y, d] = queue[queueIdx];
  queueIdx++;
  remainCount--; // 1이상인 값을 가진 위치의 개수를 빼준다.

  day = d + 1;

  for ([a, b] of [
    [x, y + 1],
    [x + 1, y],
    [x, y - 1],
    [x - 1, y],
  ]) {
    if (a < 0 || a >= n || b < 0 || b >= m) continue;
    if (graph[a][b] === 0) {
      graph[a][b] = day;
      queue.push([a, b, day]);
    }
  }
}
// 상자에 0이 남아있지 않으면 day-1를 리턴한다.
// day - 1을 해주는 이유는 마지막 dequeue한 후 주변에 익힐 수 있는 토마토가 없으면 while문이 종료하는데
// for문에 들어가지 않기 때문에 day = d + 1에서 -1을 해주어야 한다.
console.log(remainCount ? -1 : day - 1);
