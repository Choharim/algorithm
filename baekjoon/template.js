// input 1줄
// let input = require("fs")
//   .readFileSync(__dirname + "/input.txt")
//   .toString()
//   .trim();
// console.log(input);

// input 1줄 이상
let input = require("fs")
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .trim()
  .split("\n");
input = input.map((i) => i.split(" ").map(Number));
console.log(input);

// 위의 input이 안될 때
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// let input = [];
// rl.on("line", function (line) {
//   input.push(line.toString());
// }).on("close", function () {
//   console.log(input);

//   let result = "";

//   console.log(result);
//   process.exit();
// });
