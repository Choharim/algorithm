const count = Number(input);

const queue = [];
const check = {};

queue.push([1, 0, 0]); // 화면에 있는 갯수, 클립보드에 복사된 갯수, 걸린 시간
check[`1,0`] = 1; // 화면에 있는 갯수, 클립보드에 복사된 갯수의 상황 체크

let calculation;
while (queue.length) {
  [screen, copied, time] = queue.shift();

  calculation = [
    [screen, screen],
    [screen + copied, copied],
    [screen - 1, copied],
  ];

  for (let i = 0; i < calculation.length; i++) {
    [nextScreen, nextCopied] = calculation[i];

    if (check[`${nextScreen},${nextCopied}`]) continue; // 이전에 확인한 상황은 넘어갑니다.
    // nextScreen,nextCopied이 모두 0일 때는 다음에 할 수 있는 연산이 없기 때문에 넘어갑니다.
    // nextScreen가 음수일 경우 nextScreen가 0일 때 삭제 연산을 사용한 것이므로 넘어갑니다.
    if ((!nextScreen && !nextCopied) || nextScreen < 0) continue;

    if (nextScreen === count) {
      console.log(time + 1);
      return;
    }
    queue.push([nextScreen, nextCopied, time + 1]);
    check[`${nextScreen},${nextCopied}`] = 1;
  }
}
