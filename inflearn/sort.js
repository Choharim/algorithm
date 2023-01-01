/**
 * @문제 - 선택 정렬
 */
function solution(arr) {
  let smallestIndex = 0;

  let targetIndex = 0;
  while (targetIndex < arr.length) {
    smallestIndex = targetIndex;
    for (let i = targetIndex + 1; i < arr.length; i++) {
      if (arr[smallestIndex] > arr[i]) {
        smallestIndex = i;
      }
    }

    if (targetIndex !== smallestIndex) {
      [arr[smallestIndex], arr[targetIndex]] = [
        arr[targetIndex],
        arr[smallestIndex],
      ];
    }

    targetIndex++;
  }

  return arr;
}

/**
 * @문제 - 버블 정렬
 */
function solution(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
function solution(arr) {
  let cycleCount = 0;
  let isSwap;

  while (cycleCount < arr.length) {
    isSwap = false;
    for (let i = 0; i < arr.length - 1 - cycleCount; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        isSwap = true;
      }
    }

    if (!isSwap) break;

    cycleCount++;
  }
  return arr;
}

/**
 * @문제 - Special Sort
 */
function solution(arr) {
  let minusQueue = [];
  let plusQueue = [];

  arr.forEach((num) => {
    if (num >= 0) {
      plusQueue.push(num);
    } else {
      minusQueue.push(num);
    }
  });

  return [...minusQueue, ...plusQueue];
}

/**
 * @문제 - 삽입 정렬
 */
function solution(arr) {
  let targetIndex = 1;

  let target;
  while (targetIndex < arr.length) {
    target = arr[targetIndex];

    let compareIndex;
    for (compareIndex = targetIndex - 1; compareIndex >= 0; compareIndex--) {
      if (arr[compareIndex] > target) {
        arr[compareIndex + 1] = arr[compareIndex];
      } else {
        break;
      }
    }

    arr[compareIndex + 1] = target;

    targetIndex++;
  }

  return arr;
}
console.log(solution([11, 7, 5, 6, 10, 9]));
