/**
 * @재귀
 */

/**
 * @문제
 * 특정 양의 정수 0까지 카운트다운 하기
 */

/**
 * @방법1
 * 루프를 이용
 */
function countDown(start) {
  for (let index = start; index >= 0; index--) {
    console.log(index);
  }
}

/**
 * @방법2
 * 재귀를 이용
 */
function countDown(start) {
  console.log(start);
  if (start - 1 >= 0) countDown(start - 1);
}

/**
 * @문제
 * n의 계승을 계산해라
 * ex)
 * 5의 계승은 5 * 4 * 3 * 2 * 1 = 120
 */
/**
 * 1. n부터 시작해서 1까지 -1씩 감소된 수가 곱해진다.
 * 2. 즉, 기저 조건은 1이다.
 * 3. 기저 조건부터 확인하며 바로 전 조건을 확인하며 함수를 분석한다.
 */
function factorial(n) {
  if (n === 1) return 1;

  return n * factorial(n - 1);
}

/**
 * @문제
 * x^n 을 구하자.
 */
function power(x, n) {
  if (n === 1) return x;

  return x * power(x, n - 1);
}

/**
 * @문제
 * n번째 피보나치 수를 구해라
 */
function pibonachi(n) {
  if (n < 2) return n;

  return pibonachi(n - 1) + pibonachi(n - 2);
}

/**
 * @문제
 * 배열내에 숫자와 배열이 존재하고 배열내에 또 숫자와 배열이 존재할 수 있다.
 * 배열 내 모든 숫자를 출력해라
 */
function getNumbers(array) {
  for (const element of array) {
    if (typeof element === "number") {
      console.log(element);
    } else {
      getNumbers(element);
    }
  }
}

/**
 * 숫자 배열의 각 숫자를 두 배로 만드는 함수를 작성하라.
 */
function double(array, i = 0) {
  if (i > array.length - 1) return array;

  array[i] *= 2;

  return double(array, i + 1);
}

/**
 * @helper 함수
 * @문제 - 수로 이루어진 배열에서 짝수만 베열에 모아 리턴해라.
 */
function collectEven(array) {
  const even = [];

  function helper(array) {
    if (!array.length) return;

    if (array[0] % 2 === 0) {
      even.push(array[0]);
    }

    helper(array.slice(1));
  }

  helper(array);

  return even;
}

/**
 * @Pure recursion
 * @문제 - 수로 이루어진 배열에서 짝수만 베열에 모아 리턴해라.
 */
function collectEven(array, result = []) {
  if (!array.length) {
    return result;
  }

  if (array[0] % 2 === 0) {
    return collectEven(array.slice(1), [...result, array[0]]);
  } else {
    return collectEven(array.slice(1), result);
  }
}
function collectEven(array) {
  let result = [];

  if (!array.length) {
    return result;
  }

  if (array[0] % 2 === 0) {
    result.push(array[0]);
  }

  result = result.concat(collectEven(array.slice(1)));

  return result;
}
