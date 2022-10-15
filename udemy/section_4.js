/**
 * 문제 1 - string의 각 문자를 key로 갖고 value로 해당 문자의 갯수를 갖는 object를 리턴해라
 */

/**
 * input string의 각 문자를 key로 지정하며,
 * 해당 value가 undefined이면 기본값 0을 지정하고 값이 존재하면 이전값을 이용하여 1씩 카운트를 증가시킨다.
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(n)
 */
function charCount1(words) {
  let object = {};

  for (const char of words) {
    if (char === " ") continue; // 문자가 공백이라면 바로 다음 루프로 이동한다.

    object[char] = (object[char] ?? 0) + 1;
  }

  return object;
}

/**
 * 문제 2 - 문제 1와 동일하되, key는 소문자로 지정하고 숫자와 공백은 무시한다.
 */

/**
 * key에 해당하지 않는 문자는 제거한 후 소문자로 변경한다.
 * 문자를 소문자로 변경하여 key로 지정한다.
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(n)
 */
function charCount2(words) {
  let object = {};

  for (const char of words) {
    if (!isNaN(Number(char)) || char === " ") continue; // 숫자와 빈값일 땐 바로 다음 루프로 이동한다.

    const key = char.toLowerCase();

    object[key] = (object[key] ?? 0) + 1;
  }

  return object;
}

/**
 * 문제 3 - 문제 2번과 동일하되 특수문자를 무시한다.
 */

/**
 * 소문자의 아스키 코드는 97 ~ 122이므로, 소문자로 변환했을 때 이 범위에 해당하지 않는 문자의 경우 바로 다음 루프로 이동한다.
 * 정규식을 사용할 수도 있지만, 작업량이 많을 수록 정규식이 아스키코드로 비교하는 것보다 더 느리다고 한다. (약 55%)
 */
function charCount3(words) {
  let object = {};

  for (const char of words) {
    const key = char.toLowerCase();

    if (!isLowerCaseAlphabet(key)) continue; // 소문자가 아닌 경우 다음 루프로 이동한다.

    object[key] = ++object[key] || 1;
  }

  return object;
}

function isLowerCaseAlphabet(char) {
  const asciiCode = char.charCodeAt();
  return asciiCode >= 96 && asciiCode <= 122;
}

/**
 * 모든 문자를 소문자로 변환한 후 소문자인지 확인하는 방법 vs 대소문자인지 확인 한 후 소문자로 변환하는 방법
 * toLowerCase는 O(1)이지만 char.toLowerCase()부분은 1개의 문자를 소문자로 바꾸는 것이므로 시간 복잡도는 O(1)이다
 * asciiCode >= 96 && asciiCode <= 122 비교도 시간 복잡도가 O(1)이다
 */
function charCount4(words) {
  let object = {};

  for (const char of words) {
    if (!isAlphabet(char)) continue;

    const key = char.toLowerCase();
    object[key] = ++object[key] || 1;
  }
  return object;
}

function isAlphabet(char) {
  const asciiCode = char.charCodeAt();
  return (
    (asciiCode >= 65 && asciiCode <= 90) ||
    (asciiCode >= 96 && asciiCode <= 122)
  );
}
