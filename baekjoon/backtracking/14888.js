const numbers = input[1].split(" ").map(Number);

// frequency counter 생성합니다.
// 사용할 수있는 연산이 있는지 파악합니다.
const operations = ["+", "-", "*", "/"];
const operationCounter = {};
input[2].split(" ").forEach((count, i) => {
  operationCounter[operations[i]] = Number(count);
});

let minAcc = Number.MAX_SAFE_INTEGER;
let maxAcc = Number.MIN_SAFE_INTEGER;

function DFS(numIdx, acc) {
  if (numIdx === numbers.length - 1) {
    minAcc = Math.min(minAcc, acc);
    maxAcc = Math.max(maxAcc, acc);
    return;
  }

  for (const operation of Object.keys(operationCounter)) {
    // 사용할 연산이 없으면 다른 연산을 살펴봅니다.
    if (operationCounter[operation] <= 0) continue;

    operationCounter[operation]--;
    const updatedAcc = calculateObj[operation](acc, numbers[numIdx + 1]);
    DFS(numIdx + 1, updatedAcc);

    // frequency counter를 이전 단계와 동일하게 되돌립니다.
    operationCounter[operation]++;
  }
}

const calculateObj = {
  [operations[0]]: function (a, b) {
    return a + b;
  },
  [operations[1]]: function (a, b) {
    return a - b;
  },
  [operations[2]]: function (a, b) {
    return a * b;
  },
  [operations[3]]: function (a, b) {
    if (a >= 0) {
      return Math.floor(a / b);
    } else {
      return Math.ceil(a / b);
    }
  },
};

DFS(0, numbers[0]);
console.log(`${maxAcc}\n${minAcc}`);
