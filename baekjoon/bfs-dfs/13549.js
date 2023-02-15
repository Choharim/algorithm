const [N, K] = input[0].split(" ").map(Number);

if (K <= N) {
  return console.log(N - K);
} else {
  const queue = [N];
  const check = Array(100001);
  const time = Array.from({ length: 100001 }, () => 0);
  check[N] = 1;
  time[N] = 0;

  const dx = [2, 1, -1];
  while (queue.length) {
    const x = queue.shift();

    if (x === K) {
      return console.log(time[x]);
    }

    for (let i = 0; i < 3; i++) {
      const cx = i === 0 ? x * dx[i] : x + dx[i];
      if (cx < 0 || cx > 100000) continue;
      if (check[cx]) continue;

      if (i === 0) {
        // 각 연산마다 걸리는 시간이 다르므로 Queue에 넣을 때 우선순위를 고려해야 한다.
        // 최소 시간을 구해야하고 목적지에 도착하면 결과값을 리턴하므로 0초가 걸리는 방법을 우선으로 처리한다.
        queue.unshift(cx);
        time[cx] = time[x];
      } else {
        queue.push(cx);
        time[cx] = time[x] + 1;
      }
      check[cx] = 1;
    }
  }
}
