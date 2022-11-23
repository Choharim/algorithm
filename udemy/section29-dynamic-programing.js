/**
 * 피보나치 수열은 반복적인 하위 문제 존재하고, 최적 부분 구조를 갖고 있다.
 * 동적 프로그래밍을 사용하여 시간 복잡도를 줄여보자.
 */

/**
 * 시간 복잡도 O(2^n)
 * n이 1씩 증가할 수록 약 2배의 계산 단계가 추가 됨
 */
function fibonacci(n) {
  if (n <= 2) return 1;
  return fibonacci(n - 2) + fibonacci(n - 1);
}

/**
 * 동적 프로그래밍 방법
 */

/**
 * @메모이제이션 (memoization) - top-bottom 방식
 * 반복되는 하위 문제에 대한 답을 저장하여 같은 문제를 마주했을 때 다시 계산하지 않고 재사용한다.
 * 시간 복잡도 O(n)
 * 3 ~ n까지의 계산 단계가 필요함.
 * ⚠️ n이 1000..처럼 매우 커질 경우, 콜스택에 쌓이는 재귀 함수가 많기 때문에 maxium call stack size exceed 에러가 발생함.
 */
function memoizedFibonacci(n, resultStore = {}) {
  if (resultStore[n] !== undefined) return resultStore[n];
  if (n <= 2) return 1;

  resultStore[n] =
    memoizedFibonacci(n - 1, resultStore) +
    memoizedFibonacci(n - 2, resultStore);

  return resultStore[n];
}
// 기저 조건을 resultStore에 미리 넣기
function memoizedFibonacci(n, resultStore = { 1: 1, 2: 1 }) {
  if (resultStore[n] !== undefined) return resultStore[n];

  resultStore[n] =
    memoizedFibonacci(n - 1, resultStore) +
    memoizedFibonacci(n - 2, resultStore);

  return resultStore[n];
}

/**
 * @타뷸레이션 (tabulation) - bottom-up 방식
 * 가장 작은 하위 문제의 결과값을 저장하여 재사용한다.
 * 시간 복잡도 O(n)
 */
function tabulatedFibonacci(n) {
  // if (n <= 2) return 1;

  let fibNums = [0, 1, 1];

  for (let i = 3; i <= n; i++) {
    fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
  }

  return fibNums[n];
}
