const [N, K] = input[0].split(" ").map(Number);

const queue = [N];
const distance = Array(100000).fill(-1);

distance[N] = 0;

while (queue.length) {
  x = queue.shift();

  for (let a of [2 * x, x + 1, x - 1]) {
    if (a < 0 || a > 100000) continue;
    if (distance[a] > -1) continue;

    if (a === K) {
      console.log(distance[x] + 1);
      return;
    }
    distance[a] = distance[x] + 1;
    queue.push(a);
  }
}

console.log(distance[K]);
