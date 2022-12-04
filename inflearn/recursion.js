/**
 * @문제 - 자연수 N이 입력되면 재귀함수를 이용하여 1부터 N까지를 출력하는 프로그램을 작성하세요.
 * 3 -> 1 2 3
 */

/**
 * 1. 1씩 증가한다.
 * 2. 기저 조건 - n이하까지만 재귀함수를 실행한다.
 * 3. number를 리턴한다.
 */
function getOneToNInNumber(n) {
  if (n <= 1) return n;

  return Number(`${getOneToNInNumber(n - 1)}${n}`);
}

/**
 * 1. 1씩 증가한다.
 * 2. 기저 조건 - n이하까지만 재귀함수를 실행한다.
 * 3. string을 리턴한다.
 */
function getOneToNInString(n) {
  if (n <= 1) return `${n}`;

  return `${getOneToNInString(n - 1)} ${n}`;
}

/**
 * @문제 - 10진수 N이 입력되면 2진수로 변환하여 출력하는 프로그램을 작성하세요.
 */

/**
 * 1. 하위 문제의 결과을 뒤부터 순회하며 0일 때 1로 올리고 해당 자리수 미만의 자리는 0으로 변경한다.
 * 2. 기저 조건 - 하위 문제의 숫자가 1이하일 때는 2진수값을 아니까 그외의 경우일 때만 재귀 함수를 실행한다.
 * 3. 반환값은 string이다.
 *
 */
function getBinaryNumber(n) {
  if (n <= 1) return `${n}`;

  const result = getBinaryNumber(n - 1);
  let digit;
  for (let i = 0; i < result.length; i++) {
    if (result[result.length - 1 - i] === "0") {
      digit = i;
      break;
    }
  }

  if (digit === undefined) {
    return `${10 ** result.length}`;
  }

  return `${result.slice(0, result.length - 1 - digit)}${10 ** digit}`;
}

/**
 * @문제 - 자연수 N이 주어지면 1부터 N까지의 원소를 갖는 집합의 부분집합을 모두 출력하는 프로그램 을 작성하세요.
 */
function getSubset(n) {}
