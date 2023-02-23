const [N, M, R] = input[0].split(" ").map(Number);

const matrix = Array.from({ length: N }, (_, i) => input[i + 1].split(" "));

const levelRange = Math.floor(Math.min(N, M) / 2);
const lastRow = N - 1;
const lastColumn = M - 1;
let count = 0;

while (count < R) {
  for (let level = 0; level < levelRange; level++) {
    let highRowTemp; // 마지막으로 남는 요소는 아래로 이동
    let valueToLeft = matrix[level][lastColumn - level];

    let lowRowTemp; // 마지막으로 남는 요소는 위로 이동
    let valueToRight = matrix[lastRow - level][level];

    for (let y = lastColumn - level; y > level; y--) {
      highRowTemp = matrix[level][y - 1];
      matrix[level][y - 1] = valueToLeft;
      valueToLeft = highRowTemp;

      lowRowTemp = matrix[lastRow - level][lastColumn - y + 1];
      matrix[lastRow - level][lastColumn - y + 1] = valueToRight;
      valueToRight = lowRowTemp;
    }

    let leftColumnTemp;
    let valueToDown = highRowTemp;

    let rightColumnTemp;
    let valueToUp = lowRowTemp;
    for (let x = level; x < lastRow - level; x++) {
      leftColumnTemp = matrix[x + 1][level];
      matrix[x + 1][level] = valueToDown;
      valueToDown = leftColumnTemp;

      rightColumnTemp = matrix[lastRow - x - 1][lastColumn - level];
      matrix[lastRow - x - 1][lastColumn - level] = valueToUp;
      valueToUp = rightColumnTemp;
    }
  }

  count++;
}

let result = "";
matrix.forEach((row, i) => {
  if (i > 0) result += "\n";
  result += row.join(" ");
});
console.log(result);
