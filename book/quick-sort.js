/**
 * @문제 - 양수 배열이 주어졌을 때, 세 수의 가장 큰 곲을 반환해라.
 */

/**
 * @풀이1
 * 시간 복잡도 O(n)
 * 1. 버블 정렬을 이용한다.
 * 1-1. 세번의 패스쓰루를 거치면 마지막 요소부터 3개의 요소가 큰 수 3개이다.
 */
function 세수_가장큰_곱(array) {
  for (let i = 0; i < 3; i++) {
    for (j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return (
    array[array.length - 1] * array[array.length - 2] * array[array.length - 3]
  );
}

/**
 * @풀이2
 * 시간 복잡도 O(n)
 * 1. 선택 정렬을 이용한다.
 * 1-1. 세번의 패스쓰루를 거치면 첫번째 요소부터 3개의 요소가 큰 수 3개이다.
 */
function 세수_가장큰_곱(array) {
  for (let i = 0; i < 3; i++) {
    let largestIndex = i;

    for (j = i + 1; j < array.length; j++) {
      if (array[largestIndex] < array[j]) {
        largestIndex = j;
      }
    }

    if (i !== largestIndex)
      [array[i], array[largestIndex]] = [array[largestIndex], array[i]];
  }

  return array[0] * array[1] * array[2];
}

/**
 * @풀이3
 * 시간 복잡도 O(nlogN)
 * 1. 퀵 정렬로 정렬한다.
 * 2. 마지막 요소 3개를 곱한다.
 */
function getPivotIndex(array, startIndex, endIndex) {
  let pivotIndex = startIndex;
  const pivot = array[pivotIndex];

  for (let i = startIndex + 1; i <= endIndex; i++) {
    if (pivot > array[i]) {
      pivotIndex++;

      [array[pivotIndex], array[i]] = [array[i], array[pivotIndex]];
    }
  }
  [array[pivotIndex], array[startIndex]] = [
    array[startIndex],
    array[pivotIndex],
  ];

  return pivotIndex;
}
function 세수_가장큰_곱(array) {
  function quickSort(array, startIndex = 0, endIndex = array.length - 1) {
    if (startIndex < endIndex) {
      let pivotIndex = getPivotIndex(array, startIndex, endIndex);

      quickSort(array, startIndex, pivotIndex - 1);
      quickSort(array, pivotIndex + 1, endIndex);
    }
  }

  quickSort(array);

  return (
    array[array.length - 1] * array[array.length - 2] * array[array.length - 3]
  );
}

/**
 * @풀이4
 * 시간 복잡도 O(nlogN)
 * 1. sort 매소드를 이용해 정렬한다.
 */
function 세수_가장큰_곱(array) {
  array.sort((a, b) => (a > b ? 1 : -1));

  return (
    array[array.length - 1] * array[array.length - 2] * array[array.length - 3]
  );
}

/**
 * @문제 - 0부터 1간격으로 배열 길이만큼 숫자가 포함되어야 하는 배열이 있다. 이 중 누락된 숫자를 찾아라.
 */

/**
 * @풀이1
 * 1. 값과 index가 같으면 첫번째 요소 ~ 현재까지는 누락된 요소가 없다.
 * 2. 값이 index보다 크면 해당 값 왼쪽에 누락된 요소가 있다.
 */
function findMissingNumber(array, startIndex = 0, endIndex = array.length - 1) {
  let pivotIndex;

  if (startIndex < endIndex) {
    pivotIndex = getPivotIndex(array, startIndex, endIndex);

    if (pivotIndex === array[pivotIndex]) {
      return findMissingNumber(array, pivotIndex + 1, endIndex);
    } else {
      return findMissingNumber(array, startIndex, pivotIndex - 1);
    }
  } else {
    return startIndex;
  }
}

/**
 * @풀이2
 * 1. sort로 정렬한다.
 */
function findMissingNumber(array) {
  array.sort((a, b) => (a > b ? 1 : -1));

  for (let index = 0; index < array.length; index++) {
    if (array[index] !== index) return index;
  }
}
