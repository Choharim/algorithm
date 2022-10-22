/**
 * @재귀 문제
 */

/**
 * @문제 - 계승을 구해라.
 * ex)
 * power(2,0) // 1
 * power(2,2) // 4
 * power(2,4) // 16
 */

/**
 * @풀이1
 * 1. 두번째 인자 만큼 첫뺀째 인자를 곱하면 된다.
 * 2. 실행 할 때마다 두번째 인자를 카운트 다운 하여 첫 번째 수를 곱한 횟수를 기억한다.
 * 3. 기저 조건은 두번째 인자가 0이 되었을 때이다. 이때는 이전에 곱한 값에 영향을 주지 않는 1을 곱한다.
 */
function power(number, count) {
  if (count === 0) return 1;

  return number * power(number, count - 1);
}

/**
 * @풀이2
 * 1. 인수에 실행시킨 횟수와 누적된 결과값을 전달하자.
 */
function power(x, n) {
  function helper(n, result) {
    if (n === 1) return result;

    return helper(n - 1, result * x);
  }

  return helper(n, x);
}

/**
 * @풀이2 - 1
 */
function power(x, n) {
  if (n === 0) return 1;

  function helper(i = 1) {
    if (i === n) return x;

    return x * helper(i + 1);
  }

  return helper();
}

/**
 * @문제 - 팩토리얼을 구해라.
 * ex)
 * actorial(1) // 1
 * factorial(2) // 2
 * factorial(4) // 24
 * factorial(7) // 5040
 */
/**
 * @풀이1
 * 1. 주어진 수부터 1까지 곱한다. 이를 위해 다음 곱할 수를 -1 해주기 위해 다음 재귀 함수 인수를 -1한다.
 * 2. 기저 조건은 인수가 0일 때이다. 이전 값에 영향을 주지 않기 위해 1을 리턴한다. (0!은 1이므로 1을 리턴한다.)
 */
function factorial(n) {
  if (n === 0) return 1;

  return n * factorial(n - 1);
}

/**
 * @풀이2
 * 1. 인수에 결과값을 전달하며 기억한다.
 */
function factorial(n, result = 1) {
  if (n === 1) return result;

  return factorial(n - 1, result * n);
}

/**
 * @문제 - 숫자로 이루어진 배열의 모든 요소를 곱한 값을 구해라.
 * ex)
 * productOfArray([1,2,3]) // 6
 * productOfArray([1,2,3,10]) // 60
 */

/**
 * @풀이1
 * 1. [1,2,3]은 1*2*3을 리턴해야하고, 하위 문제인 [1,2]는 1*2를 리턴해야 한다.
 * 2. 1*2를 1*2*3와 동일하게 하기 위해서는 기존 문제에서 마지막 요소를 곱해준다.
 * 3. f(n-1) * array[array.length -1]
 * 4. 기저 조건은 n === 1일 때 이다.
 */
function productOfArray(array) {
  if (array.length === 1) return array[0];

  return productOfArray(array.slice(0, -1)) * array[array.length - 1];
}
/**
 * @풀이2
 * 1. [1,2,3]은 1*2*3을 리턴해야하고, 하위 문제인 [2,3]는 2*3를 리턴해야 한다.
 * 2. 2*3을 1*2*3와 동일하게 하기 위해서는 기존 문제에서 첫번째 요소를 곱해준다.
 * 3. array[0] * f(n-1)
 * 4. 기저 조건은 n === 1일 때 이다.
 */
function productOfArray(array) {
  if (array.length === 1) return array[0];

  return array[0] * productOfArray(array.slice(1));
}

/**
 * @풀이3
 * 1. 외부 함수에 변수를 선언하여 값을 저장한다.
 */
function productOfArray(array) {
  let result = 1;

  function helper(i = 0) {
    if (i > array.length - 1) return;

    result *= array[i];

    helper(i + 1);
  }

  helper();

  return result;
}

/**
 * @풀이4
 * 1. 결과값을 인수에 저장한다.
 */
function productOfArray(array) {
  function helper(i = 0, result = 1) {
    if (i > array.length - 1) return result;

    return helper(i + 1, result * array[i]);
  }

  return helper();
}

/**
 * @풀이4 -1
 * 1. 현재 곱해야 하는 값 * 다음 곱해야 하는 값
 */
function productOfArray(array) {
  function helper(i = 0) {
    if (i === array.length - 1) return array[array.length - 1];

    return array[i] * helper(i + 1);
  }

  return helper();
}

/**
 * @풀이6
 * 1. 실행한 요소의 index를 인수로 전달한다.
 */
function productOfArray(array, i = 0) {
  if (i === array.length - 1) return array[array.length - 1];

  return array[i] * productOfArray(array, i + 1);
}

/**
 * @문제 - 1부터 주어진 인자까지의 합을 구해라.
 * ex)
 * recursiveRange(6) // 21  -> 6 + 5 + 4 + 3 + 2 + 1
 * recursiveRange(10) // 55
 */

/**
 * 동일한 수의 간격으로 이루어져 있으므로 첫수 + 마지막수, 두번째 수 + 마지막에서 두번째 수... 의 합이 동일하다.
 * 양끝 수의 합 * 해당 합을 이루는 짝의 갯수를 구하면 된다.
 * 식으로 표현하면 1까지 더하는 것이므로 (n + 1) * n / 2가 된다.
 */
function recursiveRange(n) {
  return (n + 1) * (n / 2);
}

/**
 * @풀이1
 * 재귀로 풀어보자
 */
function recursiveRange(n) {
  if (n === 1) return 1;

  return n + recursiveRange(n - 1);
}

/**
 * @풀이2
 * helper함수에 실행횟수를 전달한다.
 */
function recursiveRange(n) {
  function helper(i = 1) {
    if (i === n) return n;

    return i + helper(i + 1);
  }

  return helper();
}

/**
 * @문제 - 피보나치 수열에서 n번째 수를 구해라
 * ex)
 * fibonacci(4) // 3
 * fibonacci(10) // 55  -> 1,1,2,3,5,8,13,21,34,55
 * fibonacci(28) // 317811
 * fibonacci(35) // 9227465
 */

/**
 * @풀이1
 * 1. 전 값, 전전 값과 횟수를 카운트 해야하므로 3개의 인수가 필요하다.
 * 2. 주어진 함수는 인자가 1개이므로 helper함수를 이용하자.
 */
function fibonacci(count) {
  function helper(num1 = 1, num2 = 1, count) {
    if (count === 1) return num1;

    return helper(num2, num1 + num2, count - 1);
  }

  return helper(1, 1, count);
}

/**
 * @풀이2
 * 1. 전 값, 전전 값의 합을 구하면 된다.
 * 2. fibonacci(-1), fibonacci(0)은 존재하지 않으므로 0을 리턴하고,  fibonacci(1)은 1이므로 1을 리턴한다.
 */
function fibonacci(count) {
  if (count <= 0) return 0;
  if (count === 1) return 1;

  return fibonacci(count - 2) + fibonacci(count - 1);
}

function fibonacci(n) {
  if (n === 0 || n === 1) return 0;

  let a = 0;
  let b = 1;

  for (let i = 1; i < n - 1; i++) {
    const prevA = a;

    a = b;
    b += prevA;
  }

  return b;
}

/**
 * @풀이3
 * 1. 전 값, 전전 값의 합을 구하면 된다.
 * 2.fibonacci(1), fibonacci(2)는 1 이므로 1을 리턴한다.
 */
function fibonacci(count) {
  if (count <= 2) return 1;

  return fibonacci(count - 2) + fibonacci(count - 1);
}
