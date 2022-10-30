/**
 * 1. pivot은 범위에서 첫번째 요소로 잡자.
 * 2. pivot보다 작으면 왼쪽으로 이동시켜야 한다.
 * 2-1. pivot보다 작은 값을 pivot 오른쪽 위치에 둔다 (pivot index + 현재까지 발견한 pivot보다 작은 값의 갯수)
 * 3. 한 패스쓰루가 끝나면 가장 마지막에 발견된 작은 값과 pivot의 위치를 바꾼다.
 * 4. 한 패스쓰루가 끝나면 pivotIndex가 새로 업데이트되고, 이 pivot을 기준으로 왼/오 범위가 나뉘게 된다.
 *    왼, 오 범위에서 위 동작을 반복하면 된다.
 */

/**
 * 피벗을 기준으로 왼쪽 오른쪽 부분의 범위가 지정되었다.
 * getPivotIndex함수에서는 주어진 범위에서 pivot을 기준으로 작은 값은 왼쪽 큰 값은 오른쪽에 두고 pivot의 제자리를 찾아간다.
 */
function getPivotIndex(array, startIndex, endIndex) {
  let pivotIndex = startIndex;
  const pivot = array[startIndex];

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

/**
 * 직전의 범위와 그 범위에서 제자리를 찾은 pivot의 위치를 전달한다.
 * pivot기준 왼쪽/오른쪽에 범위가 요소 1개가 될따까지 pivot을 바꾸며 제라리를 찾아간다.
 */
function quickSort(array, startIndex = 0, endIndex = array.length - 1) {
  let pivotIndex = getPivotIndex(array, startIndex, endIndex);

  if (startIndex < endIndex) {
    quickSort(array, startIndex, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, endIndex);
  }

  return array;
}
console.log(quickSort([10, 11, 5, 2, 1, 8, 4, 7, 6, 3]));
