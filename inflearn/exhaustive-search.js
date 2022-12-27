/**
 * @문제 - 자릿수의 합
 */
function solution(numbers) {
  let maxDigitSum = 0;
  let targetNum;

  function traverse(index = 0) {
    if (index >= numbers.length) return;

    let sum = 0;
    for (let i = 0; i <= Math.log10(numbers[index]); i++) {
      sum += Math.floor((numbers[index] % 10 ** (i + 1)) / 10 ** i);
    }

    if (
      maxDigitSum < sum ||
      (maxDigitSum === sum && targetNum < numbers[index])
    ) {
      maxDigitSum = sum;
      targetNum = numbers[index];
    }

    traverse(index + 1);
  }
  traverse();

  return targetNum;
}

/**
 * @문제 - 뒤집은 소수
 */
function solution(numbers) {
  let result = [];

  function isPrime(num) {
    if (num < 2) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }

    return true;
  }

  function traverse(index = 0) {
    if (index >= numbers.length) return;

    let reverseNum = 0;
    const digit = Math.floor(Math.log10(numbers[index]));
    for (let i = digit; i >= 0; i--) {
      reverseNum +=
        Math.floor((numbers[index] % 10 ** (i + 1)) / 10 ** i) *
        10 ** (digit - i);
    }

    if (isPrime(reverseNum)) {
      result.push(reverseNum);
    }

    traverse(index + 1);
  }
  traverse();

  return result.join(" ");
}

/**
 * @$문제 - 멘토링
 */
function solution(matrix) {
  let hash = {};
  let count = 0;

  matrix.forEach((array, index) => {
    for (let i = 0; i < array.length; i++) {
      const current = hash[array[i]];

      hash[array[i]] = [];

      for (let j = i + 1; j < array.length; j++) {
        if (index === 0 || current?.includes(array[j])) {
          hash[array[i]].push(array[j]);

          if (index === matrix.length - 1) {
            count++;
          }
        }
      }
    }
  });

  return count;
}

/**
 * @$문제 - 졸업 선물
 */
function solution(budget, students) {
  let check = new Set();
  let maxCount = 0;

  function recursion(count = 0, sum = 0) {
    if (sum >= budget) {
      maxCount = Math.max(maxCount, sum === budget ? count : count - 1);
    } else {
      for (let i = 0; i < students.length; i++) {
        if (check.has(i)) continue;

        // ???
        // if (count === 0) {
        //   sum = sum + students[i][0] / 2 + students[i][1];
        // } else {
        //   sum = sum + students[i][0] + students[i][1];
        // }
        check.add(i);
        recursion(
          count + 1,
          count === 0
            ? sum + students[i][0] / 2 + students[i][1]
            : sum + students[i][0] + students[i][1]
        );
        check.delete(i);
      }
    }
  }
  recursion();

  return maxCount;
}

/**
 * @문제 - K번째 큰 수
 */
function solution(k, numbers) {
  let sumStore = new Set();
  let check = new Set();

  function recursion(level = 0, index = 0, sum = 0) {
    if (level === 3) {
      sumStore.add(sum);
    } else {
      for (let i = index; i < numbers.length; i++) {
        if (check.has(i)) continue;

        check.add(i);
        recursion(level + 1, i, sum + numbers[i]);
        check.delete(i);
      }
    }
  }
  recursion();

  const sorted = [...sumStore].sort((a, b) => b - a);

  return sorted[k - 1];
}
