function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    const target = array[i];

    for (let j = i - 1; j >= 0; j--) {
      if (target < array[j]) {
        array[j + 1] = array[j];

        if (j === 0) {
          array[0] = target;
        }
      } else {
        if (i !== j + 1) {
          array[j + 1] = target;
        }
        break;
      }
    }
  }
}

/**
 * @refactoring
 * 1. 비교 범위에 있는 값이 타겟 값보다 크면 이동한다.
 * 2. 더이상 이동이 이루어지지 않으면 타겟 값을 삽입한다.
 */
function insertionSort(array) {
  let j;

  for (let i = 1; i < array.length; i++) {
    const target = array[i];

    for (j = i - 1; j >= 0 && target < array[j]; j--) {
      array[j + 1] = array[j];
    }

    if (i !== j + 1) array[j + 1] = target;
  }

  return array;
}
