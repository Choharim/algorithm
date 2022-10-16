/**
 * @문제해결패턴 - Multiple Pointers
 * 두개의 포인터를 같은 방향이든 반대방향이든 움직이며 비교 범위를 줄여가거나 구해야 하는 값을 기억할 수 있다.
 */

/**
 * @문제1 - 오름차순으로 정렬된 숫자가 요소로 된 배열에서 두 합이 0인 첫번째 한 쌍(두개의 요소)을 찾아라 (중복된 값은 없다)
 * @example
 * sumZero([-3,-2,-1,0,1,2,3]) // [-3,3]
 * sumZero([-3,-2,-1,0,1,2]) // [-2,2]
 * sumZero([1,2,3]) // undefined
 */

/**
 * @해결법1
 * 시간 복잡도 O(n^2)
 * 공간 복잡도 O(1)
 * 모든 요소를 비교하여 절댓값은 같고 부호가 다르면 해당 두 요소를 리턴한다.
 * 단, 비교는 모두 한 번씩만 이루어지도록 처리한다.
 */
function sumZero(sortedArray) {
  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = i + 1; j < sortedArray.length; j++) {
      if (-sortedArray[i] === sortedArray[j]) {
        return [sortedArray[i], sortedArray[j]];
      }
    }
  }

  return;
}

/**
 * @해결법2
 * 시간 복잡도 O(n)
 * 공간 복잡도 O(n)
 * 배열을 순회하면서 헤딩 요소의 절댓값을 key로 저장한다.
 * value는 해당 키 값을 초기값 Boolean(undefined) = false로 지정하고
 * 해당 값에 접근할 때마다 반대 값을 지정한다.
 * value가 true 가 된 순간, 해당 값에 2번 접근한 것이므로 -a, a가 존재한 것을 알아채는 순간이므로 해당 쌍을 리턴한다.
 * ⚠️ 이는 처음 먼저 만난 두쌍이 리턴되므로 문제와 다른 답을 얻게됨 ex) sumZero([-3, -2, -1, 0, 1, 2, 3]) // [-3,3]가 아닌 [-1,1] ⚠️
 */
function sumZero(sortedArray) {
  const object = {};

  for (const number of sortedArray) {
    const key = Math.abs(number);
    const value = object[key] ?? false;

    if (value) {
      return [number, -number];
    }

    object[key] = !Boolean(value);
  }

  return;
}

/**
 * @해결법3
 * 시간 복잡도 O(n^2)
 * 공간 복잡도 O(1)
 * 절댓값이 같은 음수랑 양수가 만나야 합이 0이 된다. 0을 기준으로 왼쪽은 음수 오른쪽은 양수가 존재한다. 이를 이용하자.
 * 0의 index를 찾는다.
 * 없으면 양수가 존재하지 않는 것이므로 false를 리턴한다.
 * 처음 요소부터 순횐하며 해당 요소와 절댓값이 동일한 양수는 0의 index를 기준으로 최대로 현재 요소의 절대값만큼 떨어져있다.
 * 즉, 현재 요소의 동일한 절댓값을 갖는 양수의 index 범위는 array[0의 index] < 양수 index <= array[0의 index  + 절댓값] 범위를 갖는다.
 */
function sumZero(sortedArray) {
  let indexOfZero = -1;

  for (let i = 0; i < sortedArray.length; i++) {
    if (sortedArray[i] === 0) {
      indexOfZero = i;
    }
  }

  if (indexOfZero < 0) return;

  for (let i = 0; i < indexOfZero; i++) {
    const maxIndexOfPlusTarget = indexOfZero + Math.abs(sortedArray[i]);

    for (let j = maxIndexOfPlusTarget; j > indexOfZero; j--) {
      if (sortedArray[i] + sortedArray[j] === 0)
        return [sortedArray[i], -sortedArray[i]];
    }
  }
}

/**
 * @해결법4
 * 시간 복잡도 O(n^2)
 * 공간 복잡도 O(1)
 * 왼쪽에 있을 수록 낮은 값, 오른쪽에 있을 수록 높은 값이다.
 * 왼쪽을 기준으로 순회를 하는데 비교 대상은 가장 오른 쪽부터 시작한다.
 * 기준 + 비교대상이 양수이면 비교대상을 변경해가고, 기준 + 비교대상이 0이면 해당 쌍을 리턴하고, 음수라면 기준을 변경해간다.
 */
function sumZero(sortedArray) {
  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = sortedArray.length - 1; j > 0; j--) {
      if (i >= j) break;

      const sum = sortedArray[i] + sortedArray[j];
      if (sum === 0) {
        return [sortedArray[i], -sortedArray[i]];
      } else if (sum < 0) {
        break;
      }
    }
  }
}

/**
 * @해결법5
 * 시간 복잡도 O(n)
 * 공간 복잡도 O(1)
 * 해결법4와 같은 원리이다.
 * 차이점은 다음과 같다.
 * 음수의 index와 양수의 index를 각 변수에 담아 무한 루프를 돌리며 파악한다.
 * 해결법4에서는 sum이 음수일 때 기준점(왼쪽에 위치한 음수값)이 변경되면서 비교값(오른쪽에 위치한 양수값)이 다시 초기화되어 비교할 필요 없는 부분까지 비교하지만,
 * 해결법5에서는 기준값만 변경되고 비교값은 유지한다.
 */
function sumZero(sortedArray) {
  let minusTargetIndex = 0;
  let plusTargetIndex = sortedArray.length - 1;

  while (minusTargetIndex < plusTargetIndex) {
    const sum = sortedArray[minusTargetIndex] + sortedArray[plusTargetIndex];

    if (sum === 0) {
      return [sortedArray[minusTargetIndex], sortedArray[plusTargetIndex]];
    } else if (sum < 0) {
      ++minusTargetIndex;
    } else {
      --plusTargetIndex;
    }
  }
}

/**
 * @해결법4 - Refactoring
 * 시간 복잡도 O(n)
 * 공간 복잡도 O(1)
 */
function sumZero(sortedArray) {
  let rightPointIndex = sortedArray.length - 1;

  for (
    let leftPointIndex = 0;
    leftPointIndex < sortedArray.length;
    leftPointIndex++
  ) {
    if (leftPointIndex >= rightPointIndex) return;

    const sum = sortedArray[leftPointIndex] + sortedArray[rightPointIndex];
    if (sum === 0) {
      return [sortedArray[leftPointIndex], sortedArray[rightPointIndex]];
    } else if (sum > 0) {
      --rightPointIndex;
    }
  }
}

/**
 * @문제2 - 오름차순으로 정렬된 숫자가 요소로 된 배열에서 중복된 값을 제거하면 최종 요소의 갯수가 몇개인지 확인해라.
 * 죽, 몇개의 요소로 이루어졌는지 세라.
 * @example
 * countUniqueValues([1,1,1,1,1,2]) // 2
 * countUniqueValues([1,2,3,4,4,4,5,5,12,12,13]) // 7
 * countUniqueValues([]) // 0
 * countUniqueValues([-2,-1,-1,0,1]) // 4
 */

/**
 * @해결법1
 * 시간 복잡도 O(n)
 * 공간 복잡도 O(1)
 * 유니크한 직전 값(prevUniqueValue)을 저장하는 변수를 생성한다.
 * prevUniqueValue과 현재 값이 다르면 prevUniqueValue을 현재값으로 업데이트 해주고 count를 +1한다.
 */
function countUniqueValues(sortedArray) {
  let count = 0;
  let prevUniqueValue;

  //마지막 값은 기준값으로 하지 않는다.
  for (let i = 0; i < sortedArray.length; i++) {
    if (prevUniqueValue !== sortedArray[i]) {
      prevUniqueValue = sortedArray[i];
      ++count;
    }
  }

  return count;
}

/**
 * @해결법2
 * 시간 복잡도 O(n)
 * 공간 복잡도 O(1)
 * 두개의 pointer를 둔다
 * 왼쪽에는 유니크한 값만 모으고 가장 마지막 유니크 값의 index를 저장한다.
 * 오른 쪽에는 비교값으로 왼쪽 pointer와 다른 값이면 왼쪽 포인터 바로 다음값으로 비교값을 이동시킨다.
 * 결국 왼쪽 pointer 포함한 왼쪽 부분은 유니크한 값만 존재하고 왼쪽 포인터 초과 ~ 오른쪽 포인터 미만까지는 중복된 값만 존재하고 오른쪽 포인터 부터는 앞으로 확인할 대상만 남게된다.
 */
function countUniqueValues(sortedArray) {
  let lastUniqueIndex = 0;
  let currentCompareIndex = 1;

  if (!sortedArray.length) return 0;

  while (currentCompareIndex < sortedArray.length) {
    if (sortedArray[lastUniqueIndex] !== sortedArray[currentCompareIndex]) {
      ++lastUniqueIndex;

      if (currentCompareIndex > lastUniqueIndex) {
        sortedArray[lastUniqueIndex] = sortedArray[currentCompareIndex];
      }
    }

    ++currentCompareIndex;
  }

  return lastUniqueIndex + 1;
}

/**
 * @해결법2 - Refactoring
 */
function countUniqueValues(sortedArray) {
  let indexOfLastUniqueValue = 0;

  if (!sortedArray.length) return 0;

  for (
    let currentIndex = 1;
    currentIndex < sortedArray.length;
    currentIndex++
  ) {
    if (sortedArray[indexOfLastUniqueValue] !== sortedArray[currentIndex]) {
      ++indexOfLastUniqueValue;

      if (indexOfLastUniqueValue < currentIndex) {
        sortedArray[indexOfLastUniqueValue] = sortedArray[currentIndex];
      }
    }
  }

  return indexOfLastUniqueValue + 1;
}
