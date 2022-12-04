/**
 * @재귀
 */
/**
 * 1. 재귀함수의 최종 상태는 어떤 조건이든 같아야 한다. 특정 조건에서 리턴되면 어느 조건이든 리턴되는 것이 있어야 한다.
 * (재귀 함수에 값이 리턴되면, 내부에 존재하는 재귀함수도 리턴되어야 최종적으로 리턴된 값을 받아올 수 있다.)
 */

/**
 * @문제 - 특정 양의 정수 0까지 카운트다운 하기
 */

/**
 * @풀이1
 * 루프를 이용
 */
function countDown(start) {
  for (let index = start; index >= 0; index--) {
    console.log(index);
  }
}

/**
 * @풀이2
 * 재귀를 이용
 */
function countDown(n) {
  if (n < 0) return;

  console.log(n);
  countDown(n - 1);
}

/**
 * @문제 - 배열내에 숫자와 배열이 존재하고 배열내에 또 숫자와 배열이 존재할 수 있다.
 * 배열 내 모든 숫자를 배열에 담아 리턴해라.
 */

/**
 * @풀이
 * 1. 배열을 순회하며 숫자면 결과값에 담고 배열이면 이를 반복한다.
 */
function getNumbers(array) {
  let result = [];

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (typeof element === "number") {
      result.push(element);
    } else {
      result = [...result, ...getNumbers(element)];
    }
  }

  return result;
}

/**
 * @문제 - 숫자 배열의 각 숫자를 두 배로 만드는 함수를 작성하라.
 */

/**
 * @풀이1
 * 1. 외부 함수에 결과값을 저장하고, 내부 재귀함수에서 요소를 두배하는 로직을 반복한다.
 */
function double(array) {
  let result = [];

  function helper(i = 0) {
    if (i > array.length - 1) return;

    result.push(array[i] * 2);

    helper(i + 1);
  }

  helper();

  return result;
}

/**
 * @풀이2
 * 1. 인수에 결과값을 저장한다.
 */
function double(array) {
  function helper(i = 0, result = []) {
    if (i > array.length - 1) return result;

    return helper(i + 1, [...result, array[i] * 2]);
  }

  return helper();
}

/**
 * @풀이2 -1
 */
function double(array) {
  function helper(i = 0) {
    if (i === array.length - 1) return [array[array.length - 1] * 2];

    return [array[i] * 2, ...helper(i + 1)];
  }

  return helper();
}

/**
 * @풀이3
 * 기존 배열을 변경
 */
function double(array, i = 0) {
  if (i > array.length - 1) return array;

  array[i] *= 2;

  return double(array, i + 1);
}

/**
 * @문제 - 수로 이루어진 배열에서 짝수만 베열에 모아 리턴해라.
 */

/**
 * @풀이1
 * 1. 외부 함수에 결과값을 지정한다.
 * 2. 재귀 함수를 반복문처럼 사용한다.
 */
function collectEven(array) {
  let result = [];

  function helper(i = 0) {
    if (i > array.length - 1) return;

    if (array[i] % 2 === 0) {
      result.push(array[i]);
    }

    helper(i + 1);
  }
  helper();

  return result;
}

/**
 * @풀이2
 * 1. 결과값을 인수에 저장한다.
 */
function collectEven(array) {
  function helper(i = 0, result = []) {
    if (i > array.length - 1) return result;

    if (array[i] % 2 === 0) {
      return helper(i + 1, [...result, array[i]]);
    } else {
      return helper(i + 1, result);
    }
  }

  return helper();
}

/**
 * @풀이2 - 1
 */
function collectEven(array) {
  function helper(i = 0) {
    if (i > array.length - 1) return [];

    const updated = array[i] % 2 === 0 ? [array[i]] : [];
    return [...updated, ...helper(i + 1)];
  }

  return helper();
}

/**
 * @Pure recursion
 * @문제 - 수로 이루어진 배열에서 짝수만 베열에 모아 리턴해라.
 */

/**
 * @풀이1
 * 1. [4, 5, 6, 8] -> [4, 6, 8] // 하위 문제 [4, 5, 6] -> [4, 6]
 * 2. 하위 문제 결과값에 기존 문제의 마지막 요소가 양수면 추가한다.
 * 3. 호출이 필요한 재귀 함수는 변수에 담아 사용한다.
 */
function collectEven(array) {
  if (!array.length) return [];

  const prevResult = collectEven(array.slice(0, -1));

  if (array[array.length - 1] % 2 == 0) {
    return [...prevResult, array[array.length - 1]];
  }
  return prevResult;
}

/**
 * @풀이2
 */
function collectEven(array, result = []) {
  if (!array.length) {
    return result;
  }

  const added = array[0] % 2 === 0 ? [array[0]] : [];

  return collectEven(array.slice(1), [...result, ...added]);
}

/**
 * @풀이3
 */
function collectEven(arr, result = [], i = 0) {
  if (i < arr.length) {
    if (arr[i] % 2 === 0) {
      return result.concat(collectEven(arr, [arr[i]], i + 1));
    }

    return result.concat(collectEven(arr, [], i + 1));
  }

  return result;
}
