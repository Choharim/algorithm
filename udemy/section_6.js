/**
 * @FrequencyCounter
 * @문제 - 동일한 숫자로 이루졌는지 확인해라
 * @example
 * console.log(sameFrequency(182, 281)); // true
 * console.log(sameFrequency(34, 14)); // false
 */

/**
 * @해결
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(n)
 */
function sameFrequency(number1, number2) {
  const string1 = `${number1}`;
  const string2 = `${number2}`;

  if (string1.length !== string2.length) return false;

  const obj = {};

  for (const char of string1) {
    obj[char] = ++obj[char] || 1;
  }

  for (const char of string2) {
    if (obj[char] === undefined || obj[char] === 0) return false; // !obj[char]

    obj[char] -= 1;
  }

  return true;
}

/**
 * @FrequencyCounter/MultiplePointers
 * @문제 - 동일한 숫자로 이루졌는지 확인해라
 * 시간 복잡도: O(n*logN)
 * 공간 복잡도: O(1)
 * @example
 * areThereDuplicates(1, 2, 3) // false
 * areThereDuplicates(1, 2, 2) // true
 * areThereDuplicates('a', 'b', 'c', 'a') // true
 */

/**
 * @해결1 - Frequency Counter를 이용하자.
 * 인자를 순회하며 key로 저장하고 value는 존재하지 않거나 1개 count 되면 false
 * 2로 count되면 true로 지정하여 true 리턴
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(n)
 */
function areThereDuplicates(...arg) {
  const obj = {};

  for (const element of arg) {
    if (obj[element]) return true;

    obj[element] = true;
  }

  return false;
}

/**
 * @해결2 - Multiple Pointers를 이용하자.
 *
 * 시간 복잡도: O(nlogN)
 * 공간 복잡도: O(1)
 */
/**
 * 1. Muitipointer를 사용하기 위해서는 정렬이 되어있어야 한다.
 * 2. 왼쪽 포인터에 중복없는 값만 모은다.
 * 3. 현재 비교 포인터와 왼쪽 포인터의 값이 다르면
 *    왼쪽 포인터를 오른쪽으로 한 칸 이동하고 현재 비교 포인터의 값을 오른쪽 포인터의 값에 업데이트 한다. 이때 두 pointer의 위치가 동일하면 업데이트를 하지 않아도 된다.
 * 4. 값이 같으면 true를 리턴한다.
 * 5. 그외는 중복된 값이 없는 것이므로 false를 리턴한다.
 */
function areThereDuplicates(...arg) {
  if (arg.length < 2) return arg.length;

  const sortedArray = arg.sort(); // O(n*logN)

  let uniquePointerIndex = 0;

  for (
    let comparePointerIndex = 1;
    comparePointerIndex < sortedArray.length;
    comparePointerIndex++
  ) {
    if (sortedArray[uniquePointerIndex] !== sortedArray[comparePointerIndex]) {
      ++uniquePointerIndex;

      if (uniquePointerIndex !== comparePointerIndex)
        sortedArray[uniquePointerIndex] = sortedArray[comparePointerIndex];
    } else {
      return true;
    }
  }

  return false;
}

/**
 * @MultiplePointers
 * @문제 - 정수가 정렬된 배열에서 한 쌍의 숫자의 평균이 특정 평균값과 동일한지 확인해라
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(1)
 * @example
 * averagePair([1,2,3],2.5) // true
 * averagePair([1,3,3,5,6,7,10,12,19],8) // true
 * averagePair([-1,0,3,4,5,6], 4.1) // false
 * averagePair([],4) // false
 */

/**
 * @해결1
 * 가장 왼쪽에 pointer, 가장 오른쪽에 pointer를 두고 중심으로 이동하는데,
 * 두 pointer의 합이 평균 * 2와 같다면 true
 * 작으면 왼쪽 pointer를 오른쪽으로 한칸 이동시키고, 크면 오른쪽 pointer를 왼쪽으로 한칸 이동시킨다.
 */
function averagePair(sortedArray, avg) {
  const sum = avg * 2;

  let leftPointerIndex = 0;
  let rightPointerIndex = sortedArray.length - 1;

  while (leftPointerIndex < rightPointerIndex) {
    const leftPointer = sortedArray[leftPointerIndex];
    const rightPointer = sortedArray[rightPointerIndex];

    if (leftPointer + rightPointer === sum) {
      return true;
    } else if (leftPointer + rightPointer > sum) {
      --rightPointerIndex;
    } else {
      ++leftPointerIndex;
    }
  }

  return false;
}

/**
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(1)
 */
function averagePair(sortedArray, avg) {
  if (sortedArray.length < 2) return false;

  let rightIndex = sortedArray.length - 1;

  for (let leftIndex = 0; leftIndex < rightIndex; leftIndex++) {
    const sum = sortedArray[leftIndex] + sortedArray[rightIndex];

    if (sum === avg * 2) {
      return true;
    } else if (sum > avg * 2) {
      rightIndex--;
    }
  }

  return false;
}

/**
 * @MultiplePointers
 * @문제 - 문장에 특정한 단어가 포함되어 있는지 확인해라
 * 시간 복잡도: O(n + m)
 * 공간 복잡도: O(1)
 * @example
 * isSubsequence('hello', 'hello world'); // true
 * isSubsequence('sing', 'sting'); // false
 * isSubsequence('abc', 'abracadabra'); // false
 * isSubsequence('abc', 'acb'); // false (order matters)
 */

/**
 * @해결1
 * 단어에서 pointer가 가리키는 문자가 문장에 존재하면 pointer를 오른쪽으로 한 칸 옮긴다.
 * 없다면 pointer가 가리키는 문자는 처음으로 초기화된다.
 * pointer가 가리키는 문자의 순서가 단어의 길이와 같으면 true를 받환한다.
 * pointer가 오른쪽으로 이동할 수 있는 갯수보다 문장에서 비교해야하는 남은 문자의 갯수가 더 작으면 false 리턴한다.
 *
 */
function isSubsequence(words, sentence) {
  if (!words.length) return true;
  if (words.length > sentence.length) return false;

  let wordPointerIndex = 0;

  for (let i = 0; i < sentence.length; i++) {
    if (words.length - wordPointerIndex > sentence.length - i - 1) return false;

    if (sentence[i] === words[wordPointerIndex]) {
      if (words.length - 1 === wordPointerIndex) return true;
      wordPointerIndex++;
    } else {
      wordPointerIndex = 0;
    }
  }

  return false;
}

/**
 * @해결2
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(1)
 */
function isSubsequence(word, sentence) {
  let wordPointer = 0;

  if (sentence.length < word.length) return false;

  for (const char of sentence) {
    if (word[wordPointer] === char) {
      wordPointer++;

      if (wordPointer === word.length) return true;
    } else {
      wordPointer = 0;
    }
  }

  return false;
}

function isSubsequence(str1, str2) {
  var i = 0;
  var j = 0;
  if (!str1) return true;
  while (j < str2.length) {
    if (str2[j] === str1[i]) i++;
    if (i === str1.length) return true;
    j++;
  }
  return false;
}

/**
 * @SlidingWindow
 * @문제 - 숫자로 이루어진 배열에서 연속된 특정 갯수의 숫자가 가질 수 있는 최대 합을 구해라.
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(1)
 * @example
 * maxSubarraySum([100,200,300,400], 2) // 700
 * maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)  // 39
 * maxSubarraySum([-3,4,0,-2,6,-1], 2) // 5
 * maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2) // 5
 * maxSubarraySum([2,3], 3) // null
 */

/**
 * @해결1
 */
function maxSubarraySum(sortedArray, count) {
  if (sortedArray.length < count) return null;

  let maxSum = 0;
  let sum = 0;

  for (let index = 0; index < count; index++) {
    sum += sortedArray[index];
  }

  maxSum = sum;

  for (let index = 1; index < sortedArray.length; index++) {
    if (index + count > sortedArray.length) break;

    const prevIndex = index - 1;
    sum += -sortedArray[prevIndex] + sortedArray[prevIndex + count];

    if (sum > maxSum) {
      maxSum = sum;
    }
  }

  return maxSum;
}

/**
 * @해결2
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

/**
 * @SlidingWindow
 * @문제 - 양의 정수로 이루어진 배열과 양의 정수가 있을 때, 합이 함수에 전달된 정수보다 크거나 같은 연속 하위 배열의 최소 길이를 반환해라
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(1)
 * @example
 * minSubArrayLen([2,3,1,2,4,3], 7) // 2 -> because [4,3] is the smallest subarray
 * minSubArrayLen([2,1,6,5,4], 9) // 2 -> because [5,4] is the smallest subarray
 * minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) // 1 -> because [62] is greater than 52
 * minSubArrayLen([1,4,16,22,5,7,8,9,10],39) // 3
 * minSubArrayLen([1,4,16,22,5,7,8,9,10],55) // 5
 * minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11) // 2
 * minSubArrayLen([1,4,16,22,5,7,8,9,10],95) // 0
 */

/**
 * @해결
 * 주어진 숫자 이상의 값을 만들 수 있는 최소한의 갯수로 이루어진 양수의 조합을 구하자.
 * 두개의 pointer를 두고 범위를 지정한다. 처음에는 0,0
 * 주어진 값보다 합이 작으면 오른쪽 범위를 늘린다.
 * 주어진 값보다 합이 크거나 같으면 왼쪽 범위를 움직여 전체 범위를 좁히고 합계를 줄인다. 이때 내 요소 갯수가 현재 minCount보다 작으면 minCount를 업데이트한다.
 * 이를 반복한다.
 */
function minSubArrayLen(array, num) {
  let minCount = Infinity;
  let startIndex = 0;
  let endIndex = 0;
  let sum = array[0];

  while (startIndex < array.length) {
    if (sum < num) {
      ++endIndex;
      if (endIndex === array.length) {
        break;
      }

      sum += array[endIndex];
    } else if (sum >= num) {
      minCount = Math.min(minCount, endIndex - startIndex + 1);

      sum += -array[startIndex];
      ++startIndex;
    }
  }
  return minCount === Infinity ? 0 : minCount;
}

/**
 * @SlidingWindow
 * @문제 - 중복되지 않은 문자가 연결되어 있는 최대 길이를 구하라.
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(1)
 * @example
 * findLongestSubstring('') // 0
 * findLongestSubstring('rithmschool') // 7
 * findLongestSubstring('thisisawesome') // 6
 * findLongestSubstring('thecatinthehat') // 7
 * findLongestSubstring('bbbbbb') // 1
 * findLongestSubstring('longestsubstring') // 8
 * findLongestSubstring('thisishowwedoit') // 6
 */

/**
 * @해결1
 * 문자를 순회하면서 key는 해당 문자로 value는 순서로 해당 문자의 순서를 저장한다. (index로 해도 되지만 undefined과 0의 구분을 피하기 위해) -> map
 * 중복되지 않은 문자의 시작 순서도 저장한다. -> startOrder
 * map에 존재하는 현재 문자의 값이 (이전에 저장된 문자의 순서값) 존재하고 시작 순서와 같거나 크면 현재 비교하는 범위 내에 존재하는 문자와 중복되는 것이므로
 * 전에 발견한 중복된 문자의 순서 + 1로 시작 순서를 업데이트해준다.
 * 현재끼지의 길이 (현재 순서 - 시작 순서 + 1)가 기존 maxLength보다 크면 maxLength로 업데이트 해준다.
 */
function findLongestSubstring(string) {
  let maxLength = 0;
  let startOrder = 1;
  const map = {};

  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    if (map[char] && map[char] >= startOrder) {
      startOrder = map[char] + 1;
    }

    maxLength = Math.max(maxLength, i + 1 - startOrder + 1);

    map[char] = i + 1;
  }

  return maxLength;
}

/**
 * @해결2
 * 시간 복잡도 O(n)
 * 공간 복잡도: O(1)
 */
function findLongestSubstring(string) {
  const object = {};
  let maxCount = 0;

  let currentCount = 0;

  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    const orderOfprevUnique = object[char];

    if (!!orderOfprevUnique && i + 1 - currentCount <= orderOfprevUnique) {
      currentCount = i + 1 - orderOfprevUnique;
    } else {
      currentCount++;
    }

    maxCount = Math.max(maxCount, currentCount);

    object[char] = i + 1;
  }

  return maxCount;
}
