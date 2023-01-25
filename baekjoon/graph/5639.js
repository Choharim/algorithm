let result = [];
function dfs(start, end) {
  if (start > end) return;
  if (start === end) {
    result.push(input[start]);
    return;
  }

  let newEnd = end + 1;
  for (let i = start + 1; i <= end; i++) {
    if (input[start] < input[i]) {
      newEnd = i;
      break;
    }
  }

  dfs(start + 1, newEnd - 1);
  dfs(newEnd, end);
  result.push(input[start]);
}

dfs(0, input.length - 1);

console.log(result.join("\n"));

// stack
// let result = [];
// let stack = [];
// stack.push([0, input.length - 1]);

// while (stack.length) {
//   [start, end] = stack.pop();

//   let newEnd = end + 1;
//   for (let i = start + 1; i <= end; i++) {
//     if (input[start] < input[i]) {
//       newEnd = i;
//       break;
//     }
//   }

//   if (start + 1 <= newEnd - 1) stack.push([start + 1, newEnd - 1]);
//   if (newEnd <= end) stack.push([newEnd, end]);

//   result.unshift(input[start]);
// }
// console.log(result.join("\n"));
