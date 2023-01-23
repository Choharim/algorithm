const count = Number(input);

const queue = [];
const check = {};

queue.push([1, 0, 0]); // 화면에 있는 갯수, 클립보드에 복사된 갯수, 연산을 사용한 횟수
check[`${1}_${0}`] = 1;

let calculation;
while (queue.length) {
  [screenCount, copedCount, lv] = queue.shift();

  calculation = [[screenCount, screenCount]];

  if (copedCount > 0) calculation.push([screenCount + copedCount, copedCount]);
  if (screenCount > 0) calculation.push([screenCount - 1, copedCount]);

  for (let i = 0; i < calculation.length; i++) {
    if (check[`${calculation[i][0]}_${calculation[i][1]}`]) continue;
    if (calculation[i][0] === count) {
      console.log(lv + 1);
      return;
    }

    queue.push([calculation[i][0], calculation[i][1], lv + 1]);
    check[`${calculation[i][0]}_${calculation[i][1]}`] = 1;
  }
}

// while (queue.length) {
//     [screenCount, copedCount, lv] = queue.shift();

//     // 1. 연산
//     if (!check[`${screenCount}_${screenCount}`]) {
//       if (screenCount === count) {
//         level = lv + 1;
//         break;
//       }
//       queue.push([screenCount, screenCount, lv + 1]);
//       check[`${screenCount}_${screenCount}`] = 1;
//     }

//     // 2. 연산
//     if (copedCount > 0 && !check[`${screenCount + copedCount}_${copedCount}`]) {
//       if (screenCount + copedCount === count) {
//         level = lv + 1;
//         break;
//       }
//       queue.push([screenCount + copedCount, copedCount, lv + 1]);
//       check[`${screenCount + copedCount}_${copedCount}`] = 1;
//     }

//     // 3. 연산
//     if (screenCount > 0 && !check[`${screenCount - 1}_${copedCount}`]) {
//       if (screenCount - 1 === count) {
//         level = lv + 1;
//         break;
//       }
//       queue.push([screenCount - 1, copedCount, lv + 1]);
//       check[`${screenCount - 1}_${copedCount}`] = 1;
//     }
//   }

//   console.log(level);
