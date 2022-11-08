/**
 * @문제해결패턴 - Sliding Window
 * 특정 범위를 지정하여 이동하며 확인하는 패턴이다. 중복된 값은 그대로 유지하고 제거/추가 된 값만 파악하여 값을 업데이트 할 수 있다.
 */

/**
 * @문제 - 정수로 이루어진 배열에서 연달아 놓여진 특정 갯수의 최대 합을 리턴해라.
 * @example
 * maxSubarraySum([1,2,5,2,8,1,5],2) // 10
 * maxSubarraySum([1,2,5,2,8,1,5],4) // 17
 * maxSubarraySum([4,2,1,6],1) // 6
 * maxSubarraySum([4,2,1,6,2],4) // 13
 * maxSubarraySum([], 4) // null
 */

/**
 * @풀이1
 * 시간 복잡도 O(n)
 * 공간 복잡도 O(1)
 * 배열의 갯수가 count 미만일 경우 null을 early 리턴해준다.
 * 왼쪽부터 순서대로 count 갯수만큼 요소의 합을 구한다. => currentSum
 * 이때 currentSum = currentSum - 이전 조합에서 빠진 값 + 현재 조합에서 추가된 값이다.
 * maxSum보다 currentSum가 클경우 maxSum을 업데이트 해준다.
 * 기준점이 갖을 수 있는 최대 index는 배열의 길이 - count이다.
 */
function maxSubarraySum(array, count) {
  if (array.length < count) return null;

  let maxSum = 0;
  let currentSum = 0;

  for (let index = 0; index < count; index++) {
    currentSum += array[index];
  }

  maxSum = currentSum;

  for (let index = 1; index + count <= array.length; index++) {
    const gap = -array[index - 1] + array[index - 1 + count];

    currentSum += gap;

    if (maxSum < currentSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
}

/**
 * 풀이1과 동일한 원리
 */
function maxSubarraySum(array, count) {
  if (array.length < count) return null;

  let maxSum = 0;
  let currentSum = 0;

  for (let index = 0; index < count; index++) {
    currentSum += array[index];
  }

  maxSum = currentSum;

  for (let index = count; index < array.length; index++) {
    currentSum += -array[index - count] + array[index];

    maxSum = Math.max(currentSum, maxSum);
  }

  return maxSum;
}

/**
 * 시간 복잡도 O(n)
 * 공간 복잡도 O(1)
 */
function maxSubarraySum(array, count) {
  let maxSum;
  let currentSum = 0;

  for (let index = 0; index < count; index++) {
    currentSum += array[index];
  }

  maxSum = currentSum;

  for (let index = 1; index <= array.length - count; index++) {
    currentSum += -array[index - 1] + array[index - 1 + count];

    if (currentSum > maxSum) maxSum = currentSum;
  }

  return maxSum || null;
}
