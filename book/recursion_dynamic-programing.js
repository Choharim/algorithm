/**
 * @문제 - 다음 함수에서 불필요한 재귀를 없애라.
 */
function addUntil_100(array) {
  if (!array.length) return 0;

  return addUntil_100(array.slice(0, -1)) + array[array.length - 1] > 100
    ? addUntil_100(array.slice(0, -1))
    : addUntil_100(array.slice(0, -1)) + array[array.length - 1];
}

/**
 * @풀이1
 * 1. 재귀 함수의 결과 값을 변수에 담기
 */
function addUntil_100(array) {
  if (!array.length) return 0;

  const prevResult = addUntil_100(array.slice(0, -1));

  return prevResult + array[array.length - 1] > 100
    ? prevResult
    : prevResult + array[array.length - 1];
}

/**
 * @풀이2
 */
function addUntil_100(array, sum = 0) {
  if (!array.length) return 0;

  if (sum + array[0] <= 100) {
    return addUntil_100(array.slice(1), sum + array[0]);
  }

  return sum;
}

/**
 * @풀이3
 */
function addUntil_100(array) {
  function helper(array, sum = 0) {
    if (!array.length) return 0;

    if (sum + array[0] <= 100) {
      return helper(array.slice(1), sum + array[0]);
    }

    return sum;
  }

  return helper(array);
}

/**
 * @풀이4
 */
function addUntil_100(array) {
  let sum = 0;

  function helper(array) {
    if (!array.length) return;

    if (array[0] + sum <= 100) {
      sum += array[0];

      helper(array.slice(1));
    }
  }

  helper(array);

  return sum;
}

/**
 * @문제 - 다음 함수에서 불필요한 재귀를 없애라.
 */
function golomn(n) {
  if (n === 1) return 1;

  return 1 + golomn(n - golomn(golomn(n - 1)));
}

/**
 * @풀이
 * 1. g(3), g(2)의 각각 실행 순서를 보았을 때 중복되는 부분이 있다.
 * 2. 반복해서 불필요하게 재귀함수를 호출하지 않고 계산된 값을 저장하여 재활용하자.
 */
function golomn(n) {
  function recursion(n, obj = {}) {
    if (n === 1) return 1;

    if (!obj[n]) {
      obj[n] = 1 + recursion(n - recursion(recursion(n - 1, obj), obj), obj);
    }
    return obj[n];
  }

  return recursion(n);
}

/**
 * @문제 - n행 m열의 최단 경로의 수를 메모이제이션으로 개선해라.
 */
function uniquePath(n, m) {
  if (n === 1 || m === 1) return 1;

  return uniquePath(n, m - 1) + uniquePath(n - 1, m);
}

/**
 * @풀이1
 */
function uniquePath(n, m) {
  function recursion(n, m, obj = {}) {
    if (n === 1 || m === 1) return 1;

    if (obj[n]?.[m]) {
      return obj[n][m];
    } else {
      obj = {
        ...obj,
        [n]: {
          ...obj[n],
          [m]: recursion(n, m - 1, obj) + recursion(n - 1, m, obj),
        },
      };

      return obj[n][m];
    }
  }

  return recursion(n, m);
}

/**
 * @풀이2
 */
function uniquePath(n, m) {
  function recursion(n, m, obj = {}) {
    if (n === 1 || m === 1) return 1;

    if (obj[[n, m]]) {
      return obj[[n, m]];
    } else {
      obj[[n, m]] = recursion(n, m - 1, obj) + recursion(n - 1, m, obj);

      return obj[[n, m]];
    }
  }

  return recursion(n, m);
}
