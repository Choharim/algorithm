const [F, S, G, U, D] = input[0].split(" ").map(Number);

if (S === G) {
  console.log(0);
} else {
  const buttons = [U, -D];
  const queue = [S];
  const visited = Array.from({ length: F + 1 });

  visited[S] = 1;

  while (queue.length) {
    floor = queue.shift();

    for (let i = 0; i < buttons.length; i++) {
      const nextFloor = floor + buttons[i];
      if (nextFloor < 1 || nextFloor > F) continue;
      if (visited[nextFloor]) continue;

      if (nextFloor === G) {
        console.log(visited[floor]);
        return;
      }

      visited[nextFloor] = visited[floor] + 1;
      queue.push(nextFloor);
    }
  }

  console.log("use the stairs");
}
