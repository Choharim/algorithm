const [f, s, g, u, d] = input[0].split(" ").map(Number);

function solution() {
  if (s === g) {
    return 0;
  }

  const df = [u, -d];
  let level = 0;
  let queue = [];
  let check = [];

  check[s] = 1;
  queue.push([s, level]);

  while (queue.length) {
    [floor, lv] = queue.shift();

    level = lv + 1;

    for (let i = 0; i < df.length; i++) {
      if (floor + df[i] < 1 || floor + df[i] > f) continue;
      if (check[floor + df[i]]) continue;
      if (floor + df[i] === g) {
        return level;
      }

      check[floor + df[i]] = 1;
      queue.push([floor + df[i], level]);
    }
  }

  return "use the stairs";
}

console.log(solution());
