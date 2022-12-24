/**
 * @문제  - 회문 문자열
 */
function solution(string) {
  const middle = Math.floor(string.length / 2) - 1;

  const lowerCase = string.toLowerCase();

  for (let i = 0; i <= middle; i++) {
    if (lowerCase[i] !== lowerCase[string.length - 1 - i]) return "NO";
  }

  return "YES";
}

/**
 * @문제 - 유효한 팰린드롬
 */
function isAlpahbet(str) {
  return (
    str !== " " &&
    str.toLowerCase().charCodeAt() >= 97 &&
    str.toLowerCase().charCodeAt() <= 122
  );
}
function solution(string) {
  let left = 0;
  let right = string.length - 1;

  while (left < right) {
    if (!isAlpahbet(string[left])) {
      left++;
      continue;
    }
    if (!isAlpahbet(string[right])) {
      right--;
      continue;
    }
    if (string[left].toLowerCase() !== string[right].toLowerCase()) {
      return "NO";
    }
    left++;
    right--;
  }

  return "YES";
}

/**
 * @문제 - 숫자만 추출
 */
function solution(string) {
  let number = "";

  for (let i = 0; i < string.length; i++) {
    if (isNaN(+string[i])) continue;

    number += string[i];
  }

  return Number(number);
}

/**
 * @문제 - 가장 짧은 문자거리
 */
/**
 * 1. 문자열을 순회하며 타겟 알파벳의 index를 모두 찾아놓기
 * 2. 문자열을 순회하며 가까운 타겟 알파벳의 index를 업데이트하며 거리를 업데이트 한다.
 */
function solution(word, alphabet) {
  let alphabetIndexs = [];

  for (let i = 0; i < word.length; i++) {
    if (word[i] === alphabet) alphabetIndexs.push(i);
  }

  let index = 0;
  let result = [];
  for (let i = 0; i < word.length; i++) {
    if (i > alphabetIndexs[index] + 1 && !!alphabetIndexs[index + 1]) {
      if (
        Math.floor((alphabetIndexs[index] + alphabetIndexs[index + 1]) / 2) < i
      ) {
        index++;
      }
    }
    result.push(Math.abs(i - alphabetIndexs[index]));
  }

  return result.join(" ");
}

/**
 * @문제 - 문자열 압축
 */
/***
 * 1. 문자열 순회할 때 현재값 카운팅
 * 2. 현재 값과 다음 값이 다르면 현재 문자와 (count 1 이상일 떼) count 추가하고, count 초기화
 */
function solution(word) {
  let count = 0;
  let result = "";

  for (let i = 0; i < word.length; i++) {
    count++;
    if (word[i] !== word[i + 1]) {
      result += word[i];
      if (count > 1) result += count;

      count = 0;
    }
  }

  return result;
}
