/**
 * @문제 - 계단을 오를 때 한 번에 한 계단 또는 두 계단씩 올라간다.
 * 총 N계단일 때 철수가 올라갈 수 있는 방법의 수는 몇 가지인가?
 *
 * 입력
 * 7 // 계산 층수
 * 출력
 * 21 // 해당 계단까지 오를 수 있는 방법의 수
 */
function solution(stairNumber) {
  let count = 0;

  function DFS(number) {
    if (number > stairNumber) return;

    if (number === stairNumber) {
      count++;
    } else {
      [number + 1, number + 2].forEach((num) => {
        DFS(num);
      });
    }
  }
  DFS(0);

  return count;
}
/**
 * f(n) = f(n-1) + f(n-2)
 * n번째 계단을 오르는 방법은 n-1번째 계단을 오르는 방법 + n-2번째 계단을 오르는 방법 과 같다.
 */
function solution(num, resultStore = {}) {
  if (num <= 1) return 1;

  if (!resultStore[num - 1]) {
    resultStore[num - 1] = solution(num - 1, resultStore);
  }

  if (!resultStore[num - 2]) {
    resultStore[num - 2] = solution(num - 2, resultStore);
  }

  return resultStore[num - 1] + resultStore[num - 2];
}

/**
 * @문제 - 개울은 N개의 돌로 다리를 만들어 놓았습니다.
 * 돌 다리를 건널 때 한 번에 한 칸 또는 두 칸씩 건너뛰면서 돌다리를 건널 수 있습니다.
 * 개울을 건너는 방법은 몇 가지일까요?
 *
 * 입력
 * 7 // 돌 수
 * 출력
 * 34
 */

//solution(input + 1)
function solution(num, dp = {}) {
  if (num <= 1) return 1;

  if (!dp[num - 2]) {
    dp[num - 2] = solution(num - 2);
  }

  if (!dp[num - 1]) {
    dp[num - 1] = solution(num - 1);
  }

  return dp[num - 2] + dp[num - 1];
}

/**
 * @문제 - N개의 자연수로 이루어진 수열이 주어졌을 때, 그 중에서 가장 길게 증가하는(작은 수에서 큰 수로) 원소들의 집합을 찾는 프로그램을 작성하라.
 * 압룍
 * 8 53786294
 *
 * 출력
 * 4
 */
// solution([5, 3, 7, 8, 6, 2, 9, 4])
function solution(arr) {
  let results = [];

  let count;
  let maxCount = 0;
  arr.forEach((num, i) => {
    count = 0;

    for (let index = i - 1; index >= 0; index--) {
      if (num > arr[index] && results[index]) {
        count = Math.max(count, results[index]);
      }
    }

    count += 1;
    results[i] = count;

    maxCount = Math.max(maxCount, count);
  });

  return maxCount;
}
