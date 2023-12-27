const getQuotientRemainder = (numerator, denominator) => {
  const quotient = parseInt(numerator / denominator);
  const remainder = numerator % denominator;

  return { quotient, remainder };
};

const getMinCount = (num) => {
  const coins = [
    { unit: 25, count: 0 },
    { unit: 10, count: 0 },
    { unit: 5, count: 0 },
    { unit: 1, count: 0 },
  ];

  let remain = num;

  coins.forEach((coin, i) => {
    const { quotient, remainder } = getQuotientRemainder(remain, coin.unit);

    coin.count = quotient;
    remain = remainder;
  });

  const counts = coins.map((coin) => coin.count);

  return counts.join(" ");
};

let result = "";
input.forEach((value, i) => {
  if (i === 0) return;

  if (i > 1) {
    result += "\n";
  }

  result += `${getMinCount(value)}`;
});

console.log(result);
