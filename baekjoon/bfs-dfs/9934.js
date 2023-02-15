const L = Number(input[0]);
const array = input[1].split(" ").map(Number);
const resultArray = Array.from({ length: L }, () => []);

function DFS(start, end, level) {
  if (start > end) return;

  const middle = (start + end) / 2;

  resultArray[level].push(array[middle]); // 부모

  DFS(start, middle - 1, level + 1); // 왼쪽 영역
  DFS(middle + 1, end, level + 1); //  오른쪽 영역
}

DFS(0, array.length - 1, 0);

let result = "";
resultArray.forEach((v, i) => {
  result += v.join(" ");

  if (i < resultArray.length - 1) result += "\n";
});

console.log(result);
