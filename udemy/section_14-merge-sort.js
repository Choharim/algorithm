/**
 * @합병정렬
 * 요소가 1개인 배열은 정렬되어있는 상태로 볼 수 있다.
 * 정렬해야 할 요소가 많을 때, 정렬되지 않는 상태로 정렬하는 것 보단 정렬된 상태의 작은 배열로 나누고 정렬된 배열들을 합쳐 정렬해가는게 더 빠른 방법이다.
 *
 * 1. 요소 1개만 있는 작은 배열이 될 때까지 배열을 절반으로 나눈다.
 * 2. 최종적으로 나눠진 작은 두 배열을 정렬하며 병합한다.
 * 3. 1개의 배열로 병합될 때까지 이를 반복한다.
 */

/**
 * @병합
 * 정렬된 두 배열을 합치는 함수를 만들어보자.
 */
/**
 * 1. 두 배열 모두 정렬된 상태이다.
 * 2. 각 배열에 pointer를 앞에 두고 작은 값을 찾아 결과 배열에 넣는다.
 * 3. 결과 배열에 넣어진 배열에서의 pointer를 + 1한다.
 * 4. 둘 중 한 배열의 모든 요소가 결과 배열로 들어갔을 때 (pointer가 배열 길이를 넘을 때) 다른 배열의 pointer 부터 끝까지 요소를 결과 배열에 추가하면 하면 된다.
 */
function merge(sortedArray1, sortedArray2) {
  let result = [];

  let array1Point = 0;
  let array2Point = 0;

  while (
    array1Point < sortedArray1.length &&
    array2Point < sortedArray2.length
  ) {
    if (sortedArray1[array1Point] < sortedArray2[array2Point]) {
      result.push(sortedArray1[array1Point]);

      array1Point++;
    } else {
      result.push(sortedArray2[array2Point]);

      array2Point++;
    }
  }

  const remainArray =
    array1Point === sortedArray1.length ? sortedArray2 : sortedArray1;
  const startIndex =
    array1Point === sortedArray1.length ? array2Point : array1Point;

  for (let i = startIndex; i < remainArray.length; i++) {
    result.push(remainArray[i]);
  }

  return result;
}
function mergeSortedArray(sortedArray1, sortedArray2) {
  let result = [];

  let array1Pointer = 0;
  let array2Pointer = 0;

  while (
    array1Pointer < sortedArray1.length &&
    array2Pointer < sortedArray2.length
  ) {
    if (sortedArray1[array1Pointer] < sortedArray2[array2Pointer]) {
      result.push(sortedArray1[array1Pointer]);

      array1Pointer++;
    } else if (sortedArray1[array1Pointer] > sortedArray2[array2Pointer]) {
      result.push(sortedArray2[array2Pointer]);

      array2Pointer++;
    } else {
      result = result.concat([
        sortedArray1[array1Pointer],
        sortedArray2[array2Pointer],
      ]);

      array1Pointer++;
      array2Pointer++;
    }

    return result;
  }

  while (array1Pointer < sortedArray1.length) {
    result.push(sortedArray1[array1Pointer]);

    array1Pointer++;
  }

  while (array2Pointer < sortedArray2.length) {
    result.push(sortedArray2[array2Pointer]);

    array2Pointer++;
  }

  return result;
}
function merge(sorted1, sorted2) {
  let result = [];

  let P1 = 0;
  let P2 = 0;

  while (P1 < sorted1.length && P2 < sorted2.length) {
    if (sorted1[P1] > sorted2[P2]) {
      result.push(sorted2[P2]);
      P2++;
    } else if (sorted1[P1] < sorted2[P2]) {
      result.push(sorted1[P1]);
      P1++;
    } else {
      result = [...result, sorted1[P1], sorted2[P2]];
      P1++;
      P2++;
    }
  }

  result = [...result, ...sorted1.slice(P1), ...sorted2.slice(P2)];

  return result;
}
/**
 * @정렬
 * 1. 나눈 절반을 구현한 merge함수로 합쳐준다.
 * 2. array 요소가 1개일 때는 더이상 나눌게 없으므로 해당 배열을 리턴한다.
 * -> 더이상 재귀 함수가 호출되지 않으면 직전에 반으로 나눠진 배열 두개가 merge되고 이를 반복하여 최종 1개로 병합된다.
 */
function mergeSort(array) {
  if (array.length === 1) return array;

  const halfIndex = Math.ceil(array.length / 2);

  return merge(
    mergeSort(array.slice(0, halfIndex)),
    mergeSort(array.slice(halfIndex))
  );
}
function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start === end) return [arr[start]];

  const middle = Math.floor((start + end) / 2);
  return merge(mergeSort(arr, start, middle), mergeSort(arr, middle + 1, end));
}

/**
 * BigO 시간 복잡도 O(n * logN)
 * 배열의 길이를 1이될 때까지 절반으로 계속해서 나눠야 하므로 logN 횟수만큼 분할 횟수가 필요하다.
 * 절반으로 나뉜 두 배열을 앞 요소부터 비교해가며 정렬하므로 n/2 * 2 즉, n 횟수만큼 비교하며 삽입하는 단계가 필요하다.
 *
 * 공간 복잡도는 O(n)
 * 최종 1개의 배열로 정렬하며 병합하기 위해 같은 크기의 배열 공간이 필요하다.
 */
