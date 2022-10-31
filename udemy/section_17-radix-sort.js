/**
 * @params
 * digit: 1의 자리일 때 0을 전달
 */
function getDigit(number, digit) {
  return Math.floor(number / Math.pow(10, digit)) % 10;
}

function countDigit(number) {
  return `${number}`.length;
}
function countDigit(number) {
  let digit = 0;

  while (number / Math.pow(10, digit) >= 1) {
    digit++;
  }

  return digit;
}
function countDigit(number) {
  if (number === 0) return 1;

  return Math.floor(Math.log10(number)) + 1;
}

function mostDigit(array) {
  let largest = -Infinity;

  for (let index = 0; index < array.length; index++) {
    const digit = countDigit(array[index]);
    if (largest < digit) {
      largest = digit;
    }
  }
  return largest;
}

function radixSort(array) {
  let buckets;

  const passthrough = mostDigit(array);

  for (let digit = 0; digit < passthrough; digit++) {
    buckets = [];

    for (let i = 0; i < array.length; i++) {
      const bucket = buckets[getDigit(array[i], digit)];
      if (!bucket) {
        buckets[getDigit(array[i], digit)] = [array[i]];
      } else {
        buckets[getDigit(array[i], digit)].push(array[i]);
      }
    }
    array = buckets.flat(); // array =  [].concat(...buckets)
  }

  return array;
}
