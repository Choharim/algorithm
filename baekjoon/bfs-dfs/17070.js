const N = Number(input[0]);
const matrix = [];
for (let i = 1; i < input.length; i++) {
  matrix[i - 1] = input[i].split(" ").map(Number);
}

const ROW = 0;
const COLUMN = 1;
const CROSS = 2;

let count = 0;
function DFS(Bx, By, pipeType) {
  if (Bx === N - 1 && By === N - 1) {
    count++;

    return;
  }

  if (pipeType === ROW) {
    // -> 옮기기
    if (matrix[Bx]?.[By + 1] === 0) {
      DFS(Bx, By + 1, ROW);

      // ↘ 옮기기
      if (matrix[Bx + 1]?.[By] === 0 && matrix[Bx + 1]?.[By + 1] === 0) {
        DFS(Bx + 1, By + 1, CROSS);
      }
    }

    return;
  }

  if (pipeType === COLUMN) {
    // ↓  옮기기
    if (matrix[Bx + 1]?.[By] === 0) {
      DFS(Bx + 1, By, COLUMN);

      // ↘ 옮기기
      if (matrix[Bx]?.[By + 1] === 0 && matrix[Bx + 1]?.[By + 1] === 0) {
        DFS(Bx + 1, By + 1, CROSS);
      }
    }

    return;
  }

  if (pipeType === CROSS) {
    // -> 옮기기
    if (matrix[Bx]?.[By + 1] === 0) {
      DFS(Bx, By + 1, ROW);
    }

    // ↓  옮기기
    if (matrix[Bx + 1]?.[By] === 0) {
      DFS(Bx + 1, By, COLUMN);
    }

    // ↘ 옮기기
    if (
      matrix[Bx]?.[By + 1] === 0 &&
      matrix[Bx + 1]?.[By] === 0 &&
      matrix[Bx + 1]?.[By + 1] === 0
    ) {
      DFS(Bx + 1, By + 1, CROSS);
    }

    return;
  }
}

DFS(0, 1, ROW);
console.log(count);
