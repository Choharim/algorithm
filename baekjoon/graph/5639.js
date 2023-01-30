const array = input.map(Number);
const result = [];

// 재귀 이용
function DFS(start, end) {
  if (start > end) {
    return;
  } else if (start === end) {
    result.push(array[start]);
    return;
  }

  const root = array[start];
  let rightStart = end + 1;

  for (let i = start + 1; i <= end; i++) {
    if (array[i] > root) {
      rightStart = i;
      break;
    }
  }

  DFS(start + 1, rightStart - 1);
  DFS(rightStart, end);

  result.push(root);
}

DFS(0, array.length - 1);

console.log(result.join("\n"));

// Stack 이용
const stack = [[0, array.length - 1]];

while (stack.length) {
  [start, end] = stack.pop();

  result.unshift(array[start]);

  let rightStart = end + 1;
  for (let i = start + 1; i <= end; i++) {
    if (array[start] < array[i]) {
      rightStart = i;
      break;
    }
  }

  if (start + 1 <= rightStart - 1) stack.push([start + 1, rightStart - 1]);
  if (rightStart <= end) stack.push([rightStart, end]);
}
