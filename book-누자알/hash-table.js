/**
 * @문제 - 두 배열의 교집합을 반환하는 함수를 작성해라.
 * 조건
 * - 시간 복잡도 O(n)
 * - 내장 메소드 사용하지 않기.
 * ex)
 * [1, 2, 3, 4, 5], [0, 2, 4, 6, 8, 11, 16] // [2,4]
 */
function getIntersectionArray(arr1, arr2) {
  let intersection = [];

  let hash = {};
  for (let i = 0; i < arr1.length; i++) {
    hash[arr1[i]] = true;
  }

  for (let i = 0; i < arr2.length; i++) {
    if (hash[arr2[i]]) {
      intersection.push(arr2[i]);
    }
  }

  return intersection;
}

/**
 * 문제 - 문자열 배열에서 첫 번째 중복 값을 찾아 반환해라.
 * 조건
 * - 시간 복잡도 O(n)
 * ex)
 * ["14", "2", "4", "2", "10"] // "2"
 */
function getDuplicatedFirstItem(arr) {
  let hash = {};

  for (let i = 0; i < arr.length; i++) {
    if (hash[arr[i]]) return arr[i];

    hash[arr[i]] = true;
  }
}

/**
 * @문제 - 소문자 알파벳 중 한 글자만 빠진 문자열이 있다. 누락된 문자를 반환해라.
 * 조건
 * - 시간 복잡도 O(n)
 * ex)
 * 'the quick brown box jumps over a lazy dog' // 'f';
 */
function getMissingAlpabet(str) {
  let hash = {};

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") continue;

    hash[str[i]] = true;
  }

  const firstUnicode = "a".charCodeAt();
  const alpabetCount = "z".charCodeAt() - firstUnicode + 1;
  const alpabet = Array.from({ length: alpabetCount }, (v, i) =>
    String.fromCharCode(firstUnicode + i)
  );

  for (let i = 0; i < alpabet.length; i++) {
    if (!hash[alpabet[i]]) return alpabet[i];
  }
}

/**
 * @문제 - 문자열에서 중복되지 않은 문자 중 첫번째 문자를 반환해라.
 * 조건
 * - 시간 복잡도 O(n)
 * ex)
 * 'minimum' // "n"
 */
function getFirstUnique(str) {
  let hash = {};

  for (let i = 0; i < str.length; i++) {
    hash[str[i]] = ++hash[str[i]] || 1;
  }

  for (let i = 0; i < str.length; i++) {
    if (hash[str[i]] === 1) return str[i];
  }
}
