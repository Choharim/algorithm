const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split("\n");
