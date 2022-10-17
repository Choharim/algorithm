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
  let i = 0;

  const obj = {};

  while (i < arg.length) {
    const key = arg[i];
    obj[key] = !Boolean(obj[key] ?? true);

    if (obj[key]) return true;

    i++;
  }

  return false;
}

/**
 * @해결2 - Multiple Pointers를 이용하자.
 *
 * 시간 복잡도: O(nlogN)
 * 공간 복잡도: O(1)
 */
function areThereDuplicates(...arg) {
  const sortedArray = arg.sort();

  let lastUniqueValueIndex = 0;

  for (let index = 1; index < sortedArray.length; index++) {
    if (sortedArray[lastUniqueValueIndex] !== sortedArray[index]) {
      ++lastUniqueValueIndex;

      if (lastUniqueValueIndex < index) {
        sortedArray[lastUniqueValueIndex] = sortedArray[index];
      }
    } else {
      return true;
    }
  }

  return lastUniqueValueIndex === arg.length - 2;
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
 * @해결
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

// function isSubsequence(str1, str2) {
//   var i = 0;
//   var j = 0;
//   if (!str1) return true;
//   while (j < str2.length) {
//     if (str2[j] === str1[i]) i++;
//     if (i === str1.length) return true;
//     j++;
//   }
//   return false;
// }

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
 * @해결
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
 * @todo
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
 * 먼저 주어진 값을 넘는 수의 합을 구하고 오른쪽으로 이동하면서 추가할 숫자1개의 값과 (현재의 합 - 최소 합) 즉 ,여유 값의 합이
 * 제거되는 숫자들의 합보다 크거나 같으면 기준 점은 빠지는 값만큼 이동한다.
 */

function minSubArrayLen(array, num) {
  let minCount = 0;
  let sum = 0;

  while (sum < num) {
    sum += array[minCount];
    minCount++;
  }

  for (let index = 1; index < array.length; index++) {
    const gap = -array[index - 1] + sum - num;
    if (gap === 0) {
      sum += -array[index - 1];
      minCount--;
    } else if (gap > 0) {
    } else {
      let j = minCount;
      let additionalSum = 0;
      while (gap > additionalSum) {
        additionalSum += array[minCount];

        j++;
      }

      minCount = j;
      sum += additionalSum;
    }
  }

  return minCount;
}

function minSubArrayLen(nums, sum) {
  let total = 0;
  let start = 0;
  let end = 0;
  let minLen = Infinity;

  while (start < nums.length) {
    // if current window doesn't add up to the given sum then
    // move the window to right
    if (total < sum && end < nums.length) {
      total += nums[end];
      end++;
    }
    // if current window adds up to at least the sum given then
    // we can shrink the window
    else if (total >= sum) {
      minLen = Math.min(minLen, end - start);
      total -= nums[start];
      start++;
    }
    // current total less than required total but we reach the end, need this or else we'll be in an infinite loop
    else {
      break;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // 2 -> because [4,3] is the smallest subarray
console.log(minSubArrayLen([2, 1, 6, 5, 4], 9)); // 2 -> because [5,4] is the smallest subarray
console.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)); // 1 -> because [62] is greater than 52
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)); // 3
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)); // 5
console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)); // 2
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)); // 0);

/**
 * @todo
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

function findLongestSubstring(str) {
  let longest = 0;
  let seen = {};
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (seen[char]) {
      start = Math.max(start, seen[char]);
    }
    // index - beginning of substring + 1 (to include current in count)
    longest = Math.max(longest, i - start + 1);
    // store the index of the next char so as to not double count
    seen[char] = i + 1;
  }
  return longest;
}

// console.log(findLongestSubstring("")); // 0
// console.log(findLongestSubstring("rithmschool")); // 7
// console.log(findLongestSubstring("thisisawesome")); // 6
// console.log(findLongestSubstring("thecatinthehat")); // 7
// console.log(findLongestSubstring("bbbbbb")); // 1
// console.log(findLongestSubstring("longestsubstring")); // 8
// console.log(findLongestSubstring("thisishowwedoit")); // 6
