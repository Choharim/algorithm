// const { match } = require("assert");

const { unwatchFile } = require("fs");
const { off } = require("process");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
