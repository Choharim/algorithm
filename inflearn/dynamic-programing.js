/**
 * 계단을 오를 때 한 번에 한 계단 또는 두 계단씩 올라간다.
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
