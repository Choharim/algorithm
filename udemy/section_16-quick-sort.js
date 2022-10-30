/**
 * @quickSort 동작 원리
 * 1. 특정 값을 피벗으로 잡는다.
 * 2. 피벗을 기준으로 왼쪽에 작은 값, 오른쪽에 큰 값을 위치시킨다. 이때, 피벗 값은 올바른 순서를 갖는다.
 * 3. 피벗을 기준으로 왼쪽 범위와 오른쪽 범위가 지정된다.
 * 4. 각 범위에서 위를 반복한다.
 * 시간 복잡도
 * O(nlogN) : pivot 기준 왼/오 부분을 나누며 비교를 해간다.
 */

/**
 * @getPivotIndex1
 * 피벗값을 제위치로 이동시킬 함수(1 ~ 2번을 실행할 함수)
 * 1. pivot은 범위에서 첫번째 요소로 잡자.
 * 2. pivot보다 작으면 왼쪽으로 이동시켜야 한다.
 * 2-1. pivot보다 작은 값을 pivot 오른쪽 위치에 둔다 (pivot index + 현재까지 발견한 pivot보다 작은 값의 갯수)
 * 3. 한 패스쓰루가 끝나면 가장 마지막에 발견된 작은 값과 pivot의 위치를 바꾼다. pivot을 기준으로 왼/오 범위가 나뉜다.
 */
function getPivotIndex(array, startIndex, endIndex) {
  let pivotIndex = startIndex;
  const pivot = array[startIndex];

  function switchValue(array, index1, index2) {
    if (index1 === index2) return;
    [array[index1], array[index2]] = [array[index2], array[index1]];
  }

  for (let i = startIndex + 1; i <= endIndex; i++) {
    if (pivot > array[i]) {
      pivotIndex++;

      switchValue(array, pivotIndex, i);
    }
  }

  switchValue(array, pivotIndex, startIndex);

  return pivotIndex;
}

/**
 * @getPivotIndex2
 * 1. pivot보다 큰 값을 startIndex, pivot보다 작은 값을 endIndex로 지정한다.
 * 2. startIndex보다 endIndex가 작으면, 둘의 위치를 바꾸고 위를 반복한다.
 * 3. startIndex가 endIndex와 크거나 같으면 위 작업을 멈추고 작은 값을 가리키던 startIndex와 pivot의 위치를 바꾼다.
 */
function getPivotIndex(array, startIndex, endIndex) {
  let pivotIndex = startIndex;
  let pivot = array[startIndex];

  startIndex++;

  while (true) {
    while (array[startIndex] < pivot) {
      startIndex++;
    }

    while (array[endIndex] > pivot) {
      endIndex--;
    }

    if (startIndex < endIndex) {
      [array[startIndex], array[endIndex]] = [
        array[endIndex],
        array[startIndex],
      ];

      startIndex++;
    } else {
      break;
    }
  }

  [array[endIndex], array[pivotIndex]] = [array[pivotIndex], array[endIndex]];

  return endIndex;
}

/**
 * 1. pivot을 기준으로 왼쪽/오른쪽 범위에서 pivot의 위치를 올바르게 옮겨줄 getPivotIndex함수를 실행한다.
 * 2. 범위내에 요소가 1개 이하일 때 더이상 quickSort 재귀 함수를 호출하지 않는다.
 */
function quickSort(array, startIndex = 0, endIndex = array.length - 1) {
  if (startIndex < endIndex) {
    let pivotIndex = getPivotIndex(array, startIndex, endIndex);

    quickSort(array, startIndex, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, endIndex);
  }

  return array;
}

/**
 * @quickSelect
 * quickSort의 핵심
 * - 한 패스쓰루에서 pivot은 올바른 위치로 이동한다.
 * - pivot을 중심으로 왼쪽은 작은 요소 오른쪽은 큰 요소가 위치한다.
 * 즉, 전체 배열을 정렬하지 않고도 특정 순서의 값을 확인 범위를 줄이며 빠르게 찾을 수 있다.
 */
function quickSelect(
  targetOrder,
  array,
  startIndex = 0,
  endIndex = array.length - 1
) {
  if (array.length < targetOrder) return;

  if (startIndex === endIndex) return array[startIndex];

  let pivotIndex = getPivotIndex(array, startIndex, endIndex);
  if (targetOrder - 1 === pivotIndex) return array[pivotIndex];

  if (pivotIndex > targetOrder - 1) {
    return quickSelect(targetOrder, array, startIndex, pivotIndex - 1);
  } else {
    return quickSelect(targetOrder, array, pivotIndex + 1, endIndex);
  }
}
