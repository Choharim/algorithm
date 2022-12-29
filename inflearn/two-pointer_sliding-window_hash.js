/**
 * @문제 - 두 배열 합치기
 */
function solution(sorted1, sorted2) {
  let result = [];
  let first = 0;
  let second = 0;

  while (first < sorted1.length && second < sorted2.length) {
    if (sorted1[first] < sorted2[second]) {
      result.push(sorted1[first]);
      first++;
    } else if (sorted1[first] > sorted2[second]) {
      result.push(sorted2[second]);
      second++;
    } else {
      result.push(sorted1[first]);
      result.push(sorted2[second]);
      first++;
      second++;
    }
  }

  while (first < sorted1.length) {
    result.push(sorted1[first]);
    first++;
  }
  while (second < sorted2.length) {
    result.push(sorted2[second]);
    second++;
  }

  return result;
}

/**
 * @문제 - 공통원소 구하기
 */
function solution(arr1, arr2) {
  let set = new Set();
  let resultStore = {};

  arr1.forEach((num) => set.add(num));

  arr2.forEach((num) => {
    if (set.has(num)) {
      resultStore[num] = true;
    }
  });

  return Object.keys(resultStore).join(" ");
}

/**
 * @문제 - 연속 부분수열 1
 */
function solution(sum, nums) {
  let left = 0;
  let right = 0;
  let currentSum = nums[left];
  let count = 0;

  while (left < nums.length && right < nums.length) {
    if (currentSum > sum) {
      currentSum -= nums[left];
      left++;
    } else {
      if (currentSum === sum) {
        count++;
      }
      right++;
      currentSum += nums[right];
    }
  }

  return count;
}

/**
 * @문제 - 연속 부분수열 2
 */
function solution(sum, nums) {
  let left = 0;
  let right = 0;
  let currentSum = nums[left];
  let count = 0;

  while (left < nums.length && right < nums.length) {
    if (currentSum < sum) {
      count++;

      right++;
      currentSum += nums[right];
    } else {
      if (currentSum === sum) {
        count++;
      }

      left++;
      right = left;
      currentSum = nums[left];
    }
  }

  return count;
}

/**
 * @문제 - 최대 매출
 */
function solution(k, prices) {
  let left = 0;
  let right = k - 1;
  let max = 0;

  for (let i = left; i <= right; i++) {
    max += prices[i];
  }

  right++;
  left++;

  let currentSum = max;
  while (right < prices.length) {
    currentSum += prices[right] - prices[left - 1];
    max = Math.max(max, currentSum);

    right++;
    left++;
  }

  return max;
}

/**
 * @문제 - 학급 회장
 */
function solution(candidate) {
  let hash = {};

  let result = "";
  let max = 0;

  for (let i = 0; i < candidate.length; i++) {
    hash[candidate[i]] = (hash[candidate[i]] ?? 0) + 1;

    if (max < hash[candidate[i]]) {
      max = hash[candidate[i]];
      result = candidate[i];
    }
  }

  return result;
}

/**
 * @문제 = 아나그램
 */
function solution(word1, word2) {
  if (word1.length !== word2.length) return "NO";

  let hash = {};
  for (let i = 0; i < word1.length; i++) {
    hash[word1[i]] = ++hash[word1[i]] || 1;
  }

  for (let i = 0; i < word2.length; i++) {
    if (!hash[word2[i]]) return "NO";

    hash[word2[i]] = hash[word2[i]] - 1;
  }

  return "YES";
}

/**
 * @$문제 - 모든 아나그램 찾기
 */
function solution(word1, word2) {
  let hash = {};
  for (let i = 0; i < word2.length; i++) {
    hash[word2[i]] = ++hash[word2[i]] || 1;
  }

  let left = 0;
  let right = word2.length - 1;
  let count = word1.length - right;

  let tempHash;
  while (right < word1.length) {
    tempHash = Object.assign({}, hash);

    for (let i = left; i <= right; i++) {
      if (!tempHash[word1[i]]) {
        count--;
        break;
      }
      tempHash[word1[i]] -= 1;
    }

    left++;
    right++;
  }
  return count;
}
