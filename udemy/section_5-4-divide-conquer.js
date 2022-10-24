/**
 * @문제해결패턴 - Divide and Conquer
 * 반복적으로 큰 규모의 data set을 작게 나누면서 범위를 좁혀 나가는 것
 */

/**
 * @문제1 - 정렬되어있는 숫자로 이루어진 배열에서 특정 숫자의 index를 리턴해라
 * @example
 * search([1,2,3,4,5,6],4) // 3
 * search([1,2,3,4,5,6],6) // 5
 * search([1,2,3,4,5,6],11) // -1
 */

/**
 * @풀이
 * 시간 복잡도: O(logN)
 * 정렬되어 있으므로 중간 값을 기준으로 나누며 범위를 좁혀간다.
 * 범위의 시작점의 index와 끝점의 index를 중간 값과 타겟의 비교를 통해 업데이트 한다.
 *
 */
function binarySearch(sortedArray, number) {
  let leftPoint = 0;
  let rightPoint = sortedArray.length - 1;

  while (leftPoint <= rightPoint) {
    const middlePoint = Math.floor((rightPoint + leftPoint) / 2);
    const middle = sortedArray[middlePoint];

    if (middle === number) {
      return middlePoint;
    } else if (middle > number) {
      rightPoint = middlePoint - 1;
    } else {
      leftPoint = middlePoint + 1;
    }
  }

  return -1;
}
