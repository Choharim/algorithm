/**
 * @문제 - 배열 내 문자열에 쓰인 고유한 문자의 개수를 반환해라.
 * ex)
 * ['ab','c','def','ghij'] -> 10개
 */

/**
 * @풀이
 * 1. 하위 문제를 파악할 수 없다.
 * 2. 배열을 순회하며 요소의 각 문자를 확인해야 한다.
 * 3. 고유 문자를 기억해야 하므로 obj key로 저장해 둔다.
 * 4. obj가 재귀 실행될 때 초기화되면 안된다.
 */
function countUniqueChar(array) {
  let obj = {};
  let count = 0;

  function helper(array) {
    if (!array.length) return;

    for (const char of array[0]) {
      const value = obj[char];

      if (!value) {
        obj[char] = true;

        count++;
      }
    }

    helper(array.slice(1));
  }

  helper(array);

  return count;
}

/**
 * @문제 - 배열 내 문자열에 쓰인 총 문자의 개수를 반환해라.
 * ex)
 * ['aa','c','def','ghij'] -> 10개
 */

/**
 * @풀이
 * 1. 이전 결과 값에 현재 요소의 길이를 더해주면 된다.
 */
function countChar(array) {
  if (array.length === 1) return array[0].length;

  return countChar(array.slice(0, -1)) + array[array.length - 1].length;
}

/**
 * @문제 - 수 배열을 받아 짝수만 포함하는 새 배열을 반환해라.
 * ex)
 * [3,2,4,5,7,9] -> [2,4]
 */

/**
 * @풀이
 * 1. [3,2,4,5,7,9] -> [2,4] // [3,2,4,5,7] -> [2,4]
 * 2. 마지막 요소가 짝수면 f(n-1)에 추가된다.
 */
function getEven(array) {
  if (!array.length) return [];

  const lastNumber = array[array.length - 1];
  const added = lastNumber % 2 === 0 ? [lastNumber] : [];
  return [...getEven(array.slice(0, -1)), ...added];
}

/**
 * @풀이2
 * 1. 첫 요소가 짝수면 두번째 인자 결과값에 추가해서 전달한다.
 */
function getEven(array, result = []) {
  if (!array.length) return result;

  const current = array[0];

  if (current % 2 === 0) {
    return getEven(array.slice(1), [...result, current]);
  } else {
    return getEven(array.slice(1), result);
  }
}

/**
 * @문제 - 1,3,6,10,15,21...다음 수열이 존재할 때 n번째 수를 구해라
 * ex)
 * n = 7 -> 28
 */

/**
 * @풀이
 * 1. 이전 값 + 현재 순서 = 현재 수 // 1,3,6,10,15,21 -> 6번째는 21 , 5번째는 15 즉, 5번째 결과값 + 6번째 = 6번째 결과값
 * 2. 기저 조건 n이 1일 때는 1 반환
 */
function getTriangleNumber(n) {
  if (n === 1) return 1;

  return getTriangleNumber(n - 1) + n;
}

/**
 * @문제 - x가 포함되어 있는 문자열에서 첫번째 x의 index를 반환해라.
 */

/**
 * @풀이
 * 1. 문자열을 순회하며 x가 나타나면 해당 index 반환
 * 2. 몇 번 실행했는지 기억하기 위해 인자로 index 저장
 */
function findIndexOfX(string, i = 0) {
  if (!string.length) return -1;

  if (string[0] === "x") {
    return i;
  } else {
    return findIndexOfX(string.slice(1), i + 1);
  }
}

/**
 * @문제 - 3행 7열로 되어있는 격자에서, 1행1열의 시작점에서 3행7열의 종점까지 올 수 있는 최단 경로의 갯수를 구해라.
 * 대각선으로 이동은 불가하다.
 */

/**
 * @풀이
 * n행 m열이 있다고 가정하자.
 * 1. 시작점에서 오른쪽, 아래쪽으로만 이동 가능하다.
 * 2. 오른쪽으로 이동하면 그 후로는 n행 m-1열의 최단 경로의 갯수와 동일하고
 *    아랫쪽으로 이동하면 그 후로는 n-1행 m열의 최단 경로의 갯수와 동일하다.
 * 3. 처음에 오른쪽으로 이동 후 가는 방법과, 아랫쪽으로 이동 후 가는 방법을 합하면 결과값이 나온다.
 * 4. 행이 1개일 때는 오른쪽으로만 이동하는 방법 1개, 열이 1개일 때는 아래로만 이동하는 방법 1개이다. -> 기저 조건
 */
function getUniquePath(n, m) {
  if (n === 1 || m === 1) return 1;

  return getUniquePath(n, m - 1) + getUniquePath(n - 1, m);
}
