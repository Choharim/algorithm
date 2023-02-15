const [N, K] = input.split(" ").map(Number);

if (N === K) {
  console.log(0);
  return;
}

const times = Array.from({ length: 100000 }, () => -1);

const queue = [N];
times[N] = 0;

while (queue.length) {
  pos = queue.shift();

  for (let nextPos of [pos + 1, pos - 1, pos * 2]) {
    if (nextPos < 0 || nextPos > 100000) continue;
    if (times[nextPos] > -1) continue;

    if (nextPos === K) {
      console.log(times[pos] + 1);
      return;
    }

    queue.push(nextPos);
    times[nextPos] = times[pos] + 1;
  }
}
