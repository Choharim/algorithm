/**
 * @문제해결패턴 - Frequency Counter
 */

/**
 * @note array의 길이는 시간 복잡도가 O(1)이다
 * js array는 length를 key로 갖는 객체이기 때문에 시간 복잡도가 O(1)이다.
 * @link https://poiemaweb.com/js-array-is-not-arrray
 */

/**
 * @문제1
 * 두 배열이 동일한 요소를 갖는 배열인지 확인해라
 */

/**
 * @해결법1
 * 시간 복잡도: O(n)
 * 두 array의 길이가 다르면 false를 리턴한다. -> 1
 * 각 array의 요소를 key로 갖고 해당 요소의 갯수를 value로 갖는 object를 생성한다. -> n + n = 2n
 * 두 object 비교하며 동일한 key로 접근했을 때 해당 값이 동일한지 파악한다. -> n
 * 3n => O(n)
 * 공간 복잡도: O(n)
 * 2n => O(n)
 */
function same(array1, array2) {
  if (array1.length !== array2.length) return false;

  let object1 = {};
  let object2 = {};

  for (const element of array1) {
    object1[element] = ++object1[element] || 1;
  }

  for (const element of array2) {
    object2[element] = ++object2[element] || 1;
  }

  for (const key of object1) {
    if (!object2[key] || object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

/**
 * @해결법2
 * 시간 복잡도: O(n)
 * 두 array의 길이가 다르면 false를 리턴한다. -> 1
 * 첫번째 array의 요소를 key로 갖고 해당 요소의 갯수를 value로 갖는 object를 생성한다. -> n
 * 두번째 array를 순회하며 이전에 만들었던 object의 key로 접근하여 해당 값이 존재하면 -1 없으면 false를 리턴한다. 이때, count는 최소 0이 가능하기 때문에 음수가 될 경우 false를 리턴한다. => n
 * 공간 복잡도: O(n)
 */
function same2(array1, array2) {
  if (array1.length !== array2.length) return false;

  let object1 = {};

  for (const element of array1) {
    object1[element] = ++object1[element] || 1;
  }

  for (const element of array2) {
    if (!object1[element]) return false;

    --object1[element];
  }

  return true;
}

/**
 * @문제2
 * 두 배열이 존재하고, 첫번째 배열의 요소의 제곱이 두번째 배열에 존재하는지 확인해라
 * [1,2,4] [1,16,4] // true
 * [2,5] [25, 1] //  false
 * [2,5, 6] [25, 1] //  false
 */

/**
 * @해결법1
 * 시간 복잡도: O(n)
 * 첫번째 배열의 요소를 제곱한 값을 key로, count를 value로 한 map을 생성한다. -> n
 * 두번째 배열의 요소를 key로 이전에 생성한 map에 접근해 값이 존재하는지 확인한다. 없으면 false 리턴, 있으면  -1 해준다.
 * 만약 count최소 0까지 가능하기 때문에 값이 0일 때 false를 리턴한다. -> n
 * 공간 복잡도: O(n)
 */
function square(array1, array2) {
  if (array1.length !== array2.length) return false;

  const map = new Map();

  for (const element of array1) {
    const key = element ** 2;
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  for (const element of array2) {
    const count = map.get(element);

    if (!count) return false;

    map.set(element, count - 1);
  }

  return true;
}

/**
 * input은 소문자로만 이루어진 각 하나의 문자이다. (공백, 특수문자, 숫자, 대문자 없음)
 *
 * 첫번째 input에서 글자를 key로 갖고 해당 글자의 count를 value로 갖는 hash map을 생성한다. -> n
 * 두번째 input의 길이만큼 순회할 때 해당 글자를 key로 map에 접근하여 -1을 해준다. -> n
 * 이때 값이 존재하지 않으면 false를 return 하고, 0이 되면 false를 리턴한다.
 */
function validAnagram(words1, words2) {
  if (words1.length !== words2.length) return false;

  const map = new Map();

  for (const string of words1) {
    map.set(string, map.get(string) + 1 || 1);
  }

  for (const string of words2) {
    const count = map.get(string);

    if (!count) return false;

    map.set(string, count - 1);
  }

  return true;
}
