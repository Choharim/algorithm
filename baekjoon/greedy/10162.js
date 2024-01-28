const get몫과나머지 = (number, root) => {
  return {
    quotient: parseInt(number / root),
    remainder: number % root,
  };
};

const getMinCount = (t) => {
  if (t % 10 > 0) return -1;

  let T = t;
  const result = [0, 0, 0];
  const buttons = [300, 60, 10];

  buttons.forEach((button, i) => {
    if (T < button) return;

    const { quotient, remainder } = get몫과나머지(T, button);
    result[i] = quotient;
    T = remainder;
  });

  return result.join(" ");
};

console.log(getMinCount(100));
