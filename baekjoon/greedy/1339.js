const N = Number(input[0]);

const hash = {};
for (let i = 1; i <= N; i++) {
  const alphabets = input[i];

  for (let j = 0; j < alphabets.length; j++) {
    hash[alphabets[j]] =
      (hash[alphabets[j]] ?? 0) + 10 ** (alphabets.length - j - 1);
  }
}

const sorted = Object.values(hash).sort((a, b) => b - a);

let maxSum = 0;
for (let i = 0; i < sorted.length; i++) {
  maxSum += sorted[i] * (9 - i);
}
console.log(maxSum);
