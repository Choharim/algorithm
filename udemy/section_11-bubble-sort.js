/**
 * @bubbleSort
 */
function bubbleSort(array) {
  let lastIndex = array.length - 1;

  for (let i = 0; i < lastIndex; i++) {
    if (array[i] > array[i + 1]) {
      [array[i], array[i + 1]] = [array[i + 1], array[i]];
    }

    if (i + 1 === lastIndex) {
      i = -1; // i++ 후위 연산자로 인해 for 조건문에서는 i = 0이됨.
      lastIndex--;
    }
  }

  return array;
}

function bubbleSort(array) {
  let lastIndex = array.length - 1;
  let i = 0;

  while (i < lastIndex) {
    if (array[i] > array[i + 1]) {
      [array[i], array[i + 1]] = [array[i + 1], array[i]];
    }

    if (i + 1 === lastIndex) {
      lastIndex--;
      i = 0;
    } else {
      i++;
    }
  }

  return array;
}

/**
 * @최적화
 * 더이상 swap이 이루어지지 않으면 정렬이 완료되었다는 것이므로 실행을 종료한다.
 */
function bubbleSort(array) {
  let isSwap;

  for (let i = 0; i < array.length - 1; i++) {
    isSwap = false; //초기화

    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        isSwap = true;
      }
    }

    if (!isSwap) break;
  }

  return array;
}
