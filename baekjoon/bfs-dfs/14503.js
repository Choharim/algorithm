const [N, M] = input[0].split(" ").map(Number);
const [r, c, d] = input[1].split(" ").map(Number);

const martix = Array(N);
for (let i = 0; i < N; i++) {
  const row = input[i + 2].split(" ").map(Number);

  martix[i] = row;
}

const forwardOffset = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const getTurnedDirection = (direction) => {
  const turn = direction - 1;
  return turn < 0 ? turn + 4 : turn;
};
const getBackPos = (direction) => {
  const back = direction - 2;
  return back < 0 ? back + 4 : back;
};

function BFS() {
  const queue = [[r, c, d]];
  const check = Array.from({ length: N }, () => Array(M).fill(0));
  let count = 0;

  while (queue.length) {
    const [x, y, direction] = queue.shift();

    if (!martix[x][y] && !check[x][y]) {
      check[x][y] = 1;
      count++;
    }

    let newDirection = direction;
    let doClean = false;
    for (let turnCount = 0; turnCount < 4; turnCount++) {
      newDirection = getTurnedDirection(newDirection);
      const cx = forwardOffset[newDirection][0] + x;
      const cy = forwardOffset[newDirection][1] + y;

      if (!martix[cx][cy] && !check[cx][cy]) {
        queue.push([cx, cy, newDirection]);
        doClean = true;
        break;
      }
    }

    if (!doClean) {
      const backDirection = getBackPos(newDirection);
      const cx = x + forwardOffset[backDirection][0];
      const cy = y + forwardOffset[backDirection][1];
      if (!martix[cx][cy]) {
        queue.push([cx, cy, newDirection]);
      } else {
        console.log(count);
        break;
      }
    }
  }
}
BFS();
