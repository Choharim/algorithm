/**
 * @문제 - 자연수 N이 입력되면 재귀함수를 이용하여 1부터 N까지를 출력하는 프로그램을 작성하세요.
 * 3 -> 1 2 3
 */

/**
 * 1. 1씩 증가한다.
 * 2. 기저 조건 - n이하까지만 재귀함수를 실행한다.
 * 3. number를 리턴한다.
 */
function getOneToNInNumber(n) {
  if (n <= 1) return n;

  return Number(`${getOneToNInNumber(n - 1)}${n}`);
}

/**
 * 1. 1씩 증가한다.
 * 2. 기저 조건 - n이하까지만 재귀함수를 실행한다.
 * 3. string을 리턴한다.
 */
function getOneToNInString(n) {
  if (n <= 1) return `${n}`;

  return `${getOneToNInString(n - 1)} ${n}`;
}

// review
function solution(n) {
  if (n === 1) return 1;

  return `${solution(n - 1)} ${n}`;
}
function solution(n, result = `${n}`) {
  if (n === 1) return result;

  return solution(n - 1, `${n - 1} ${result}`);
}
//

/**
 * @문제 - 10진수 N이 입력되면 2진수로 변환하여 출력하는 프로그램을 작성하세요.
 */

/**
 * 1. 하위 문제의 결과을 뒤부터 순회하며 0일 때 1로 올리고 해당 자리수 미만의 자리는 0으로 변경한다.
 * 2. 기저 조건 - 하위 문제의 숫자가 1이하일 때는 2진수값을 아니까 그외의 경우일 때만 재귀 함수를 실행한다.
 * 3. 반환값은 string이다.
 *
 */
function getBinaryNumber(n) {
  if (n <= 1) return `${n}`;

  const result = getBinaryNumber(n - 1);
  let digit;
  for (let i = 0; i < result.length; i++) {
    if (result[result.length - 1 - i] === "0") {
      digit = i;
      break;
    }
  }

  if (digit === undefined) {
    return `${10 ** result.length}`;
  }

  return `${result.slice(0, result.length - 1 - digit)}${10 ** digit}`;
}

// review
function solution(num, result = "") {
  if (num === 1) {
    return `${num}${result}`;
  } else {
    return solution(Math.floor(num / 2), `${num % 2}${result}`);
  }
}
//

/**
 * 1. 2로 나눈 나머지를 1의 자리부터 채워넣는다.
 * 2. 기저조건 - 나눌 수가 2보다 작으면 재귀 함수 호출을 하지 않는다.
 * 3. 반환값은 string이다. (나머지를 일의 자리수부터 붙여야하기 때문에)
 */
function getBinaryNumber(n, result = "") {
  if (n < 2) return n + result;

  return getBinaryNumber(Math.floor(n / 2), (n % 2) + result);
}

/**
 * @문제 - 왼쪽 자식은 부모의 2배인 수, 오른족 자식은 부모의 2배 +1인 수인 이진트리를 순회해라. 단계는 2단계까지 존재한다.
 */
function traverseBinaryTree(n) {
  let result = [];

  function traverse(n, level = 0) {
    if (level < 3) {
      /**
       * @preOrder
       * result.push(n);
       */
      traverse(n * 2, level + 1);
      /**
       * @inOrder
       * result.push(n);
       */
      traverse(n * 2 + 1, level + 1);
      /**
       * @postOrder
       */
      result.push(n);
    }
  }
  traverse(n);

  return result;
}

// review
function solution(root = 1) {
  let result = [];

  function DFS(v) {
    if (v > 7) {
    } else {
      result.push(v);
      DFS(v * 2);

      DFS(v * 2 + 1);
    }
  }
  DFS(root);

  return result;
}
//

/**
 * @문제 - 자연수 N이 주어지면 1부터 N까지의 원소를 갖는 집합의 부분집합을 모두 출력하는 프로그램 을 작성하세요.
 */
/**
 * 1. 각 요소는 포함되거나 포함되지 않는 2가지 경우를 갖는다.
 * 2. 요소가 1미만일 때 재귀 함수 호출을 멈춘다.
 * 3. 부분집합이 포함된 배열을 리턴한다.
 */
function getSubset(n) {
  let result = [];
  let subset = "";

  function DFS(v, checkArr = []) {
    if (v < 1) {
      checkArr.forEach((v, i) => {
        if (v) {
          subset += +(i + 1);
        }
      });

      if (!subset) return;

      result.push(subset);
      subset = "";
    } else {
      checkArr[v - 1] = true;
      DFS(v - 1, checkArr);

      checkArr[v - 1] = false;
      DFS(v - 1, checkArr);
    }
  }
  DFS(n);

  return result;
}

function getSubset(n) {
  let result = [];
  let subset = "";

  function DFS(v, checkArr = []) {
    if (v > n) {
      checkArr.forEach((v, i) => {
        if (v) {
          subset += +(i + 1);
        }
      });

      if (!subset) return;

      result.push(subset);
      subset = "";
    } else {
      checkArr[v - 1] = true;
      DFS(v + 1, checkArr);

      checkArr[v - 1] = false;
      DFS(v + 1, checkArr);
    }
  }
  DFS(1);

  return result;
}

// review
function solution(n) {
  let result = "";
  let temp;
  let count = 0;
  function DFS(number = 1, selected = {}) {
    if (number > n) {
      temp = Object.keys(selected);
      if (!temp.length) return;

      count++;
      if (count > 1) result += "\n";

      result += temp.join("");
    } else {
      selected[number] = true;
      DFS(number + 1, selected);

      delete selected[number];
      DFS(number + 1, selected);
    }
  }
  DFS();

  return result;
}
//

/**
 * @문제 - 합이 같은 부분집합
 * N개의 원소로 구성된 자연수 집합이 주어지면, 이 집합을 두 개의 부분집합으로 나누었을 때 두 부분집합의 원소의 합이 서로 같은 경우가 존재하면 “YES"를 출력하고, 그렇지 않으면 ”NO"를 출력하는 프로그램을 작성하세요.
 *
 * 입력
 * 6
 * 1 3 5 6 7 10
 * 출력
 * YES
 */
/**
 * 1. total(전체 요소의 총합)의 절반의 합을 가진 부분 집합이 존재하면 YES, 존재하지 않으면 NO
 * 2. 기저조건 - index가 배열 크기를 넘으면 재귀 함수를 호출하지 않음
 * 3. 반환 값 'YES' 또는 'NO'
 * checkSubsetsWithSameSum([1, 3, 5, 6, 7, 10])
 */
function checkSubsetsWithSameSum(arr) {
  const total = arr.reduce((acc, prev) => (acc += prev), 0);

  let result = "NO";
  function DFS(index = 0, subsetSum = 0) {
    if (result === "YES") return;

    if (index >= arr.length) {
      if (subsetSum === total / 2) result = "YES";
    } else {
      DFS(index + 1, subsetSum + arr[index]);

      DFS(index + 1, subsetSum);
    }
  }
  DFS();

  return result;
}

// review
function solution(nums) {
  let result = "NO";
  const total = nums.reduce((acc, prev) => (acc += prev), 0);

  function DFS(index = 0, sum = 0) {
    if (result === "YES") return;

    if (index >= nums.length) {
      if (sum * 2 === total) {
        result = "YES";
      }
    } else {
      DFS(index + 1, sum + nums[index]);

      DFS(index + 1, sum);
    }
  }
  DFS();

  return result;
}
//

/**
 * @문제 - 특정 수를 넘지 않는 가장 큰 합
 * 입력
 * 259 5  (limit: 259, 수의 개수: 5)
 * 81
 * 58
 * 42
 * 33
 * 61
 *
 * 출력
 * 242
 */
/**
 * 1. 각 수는 합을 구할 때 사용되거나 사용되지 않는다.
 *    각 수를 더하거나 뺄 때 maxSum을 업데이트 한다.
 * 2. 기저 조건 - 각 요소를 순회하며 포함하거나 제거한다.
 * 3. number를 반환한다.
 * getMaxSumLessThanN(259, [81, 58, 42, 33, 61])
 */
function getMaxSumLessThanN(n, arr) {
  let result = 0;

  function DFS(index = 0, sum = 0) {
    if (sum > n) return;

    if (index >= arr.length) {
      result = Math.max(result, sum);
    } else {
      DFS(index + 1, sum + arr[index]);

      DFS(index + 1, sum);
    }
  }
  DFS();

  return result;
}

// review
function solution(limit, dogs) {
  let maxSum = 0;

  function DFS(index = 0, sum = 0) {
    if (index >= dogs.length) {
      if (sum <= limit && maxSum < sum) {
        maxSum = sum;
      }
    } else {
      DFS(index + 1, sum + dogs[index]);

      DFS(index + 1, sum);
    }
  }
  DFS();

  return maxSum;
}
//

/**
 * @문제 - N개의 문제를 풀려고 합니다. 각 문제는 그것을 풀었을 때 얻는 점수와 푸는데 걸리는 시간이 주어지게 됩 니다. 제한시간 M안에 N개의 문제 중 최대점수를 얻을 수 있도록 해야 합니다.
 * (해당문제는 해당시간이 걸리면 푸는 걸로 간주한다, 한 유형당 한개만 풀 수 있습니다.)
 *
 * 입력
 * 5 20 // 5개의 문제, 20분 제한시간
 * 10 5 // 점수, 시간
 * 25 12
 * 15 8
 * 6 3
 * 7 4
 *
 * 출력
 * 41
 */
/**
 * 1. 문제의 조합 중 푸는 시간의 합이 주어진 시간보다 작을 때 최대 점수
 * 2. 기저 조건 - 각 문제는 풀거나 못풀거나 두개의 경우를 갖는다. 모든 문제에 대해서만 재귀 함수를 실행한다.
 * 3. number를 반환한다.
 * maxScore(20, [ [10, 5],[25, 12],[15, 8],[6, 3],[7, 4] ])
 *
 */
function maxScore(limitTime, arr) {
  let maxScore = 0;

  function DFS(index = 0, score = 0, time = 0) {
    if (limitTime < time) return;

    if (index >= arr.length) {
      maxScore = Math.max(maxScore, score);
    } else {
      DFS(index + 1, score + arr[index][0], time + arr[index][1]);
      DFS(index + 1, score, time);
    }
  }
  DFS();

  return maxScore;
}

// review
function solution(limitTime, scores) {
  let maxScore = 0;

  function DFS(index = 0, score = 0, time = 0) {
    if (index >= scores.length) {
      if (time <= limitTime) {
        maxScore = Math.max(maxScore, score);
      }
    } else {
      DFS(index + 1, score + scores[index][0], time + scores[index][1]);

      DFS(index + 1, score, time);
    }
  }
  DFS();

  return maxScore;
}
//

/**
 * @문제  - 1부터 N까지 번호가 적힌 구슬을 M번 뽑아 나열하는 방법
 * 입력
 * 3 2 // N, M
 *
 * 출력
 * 1 1
 * 1 2
 * 1 3
 * 2 1
 * 2 2
 * 2 3
 * 3 1
 * 3 2
 * 3 3
 * 9  // 방법 수
 */
/**
 * 1. 뽑을 수 있는 수 N개 중 1개를 M번 뽑는다. 방법 수는 N^M이 된다.
 *    M번 동일한 행동을 해야하기 때문에 큰 사이클은 M
 * 2. 기저 조건 - M
 * 3. string 반환
 * // getPermutation(3, 2)
 */
function getPermutation(n, m) {
  let result = "";
  let count = 0;

  function DFS(cycle = 0, arr = []) {
    if (cycle >= m) {
      result += arr.join(" ");
      result += "\n";
      count++;
    } else {
      for (let i = 1; i <= n; i++) {
        arr[cycle] = i;
        DFS(cycle + 1, arr);
      }
    }
  }

  DFS();

  return `${result}${count}`;
}

// review
function solution(n, m) {
  let result = "";
  let count = 0;
  function DFS(index = 0, selected = []) {
    if (index >= m) {
      result += selected.join(" ");
      result += "\n";
      count++;
    } else {
      for (let i = 1; i <= n; i++) {
        selected[index] = i;
        DFS(index + 1, selected);
      }
    }
  }
  DFS();

  return `${result}${count}`;
}
//

/**
 * @문제 - 여러 단위의 동전들이 주어져 있을때 거스름돈을 가장 적은 수의 동전으로 교환 해주려면 어떻게 주면 되는가? 각 단위의 동전은 무한정 쓸 수 있다.
 * 입력
 * 3 // 동전 종류 갯수
 * 1 2 5 // 동전 종류
 * 15 // 거스름돈
 *
 * 출력
 * 3
 */
/**
 * 1. 1,2,5로 15를 만들 수 있는 조합을 구하자. (동전종류가 오름차순으로 주어졌으므로 숫자가 큰 동전부터 사용하여 합이 15가 되는 조합을 구한다. 이때, min이 update되면 최소갯수이므로 실행을 종료한다. )
 * 2. 기저 조건 - 합이 15이상이면 재귀함수를 더이상 호출하지 않는다.
 * 3. number 갯수 반환값
 * getMinCoinCount([1, 2, 5], 15)
 */
function getMinCoinCount(coins, change) {
  let min = Infinity;

  function DFS(sum = 0, count = 0) {
    if (sum > change) return;
    if (min !== Infinity) return;

    if (sum === change) {
      min = Math.min(min, count);
    } else {
      for (let i = coins.length - 1; i >= 0; i--) {
        DFS(sum + coins[i], count + 1);
      }
    }
  }
  DFS();

  return min;
}
/**
 * 동전 종류가 오름차순으로 주어지지 않는다면, 동전 순서 뒤부터 하지 않아도 되고 모든 15 조합을 구하면서 min을 계속 업데이트 해야함
 * getMinCoinCount([1, 5, 2], 15)
 */
function getMinCoinCount(coins, change) {
  let min = Infinity;

  function DFS(sum = 0, count = 0) {
    if (sum > change) return;
    if (count >= min) return;

    if (sum === change) {
      min = Math.min(min, count);
    } else {
      for (let i = 0; i < coins.length; i++) {
        DFS(sum + coins[i], count + 1);
      }
    }
  }
  DFS();

  return min;
}

// review
function solution(coins, price) {
  //   coins.sort();
  let result;

  function DFS(selectedSum = 0, selectedCount = 0) {
    if (result) return;

    if (selectedSum >= price) {
      if (selectedSum === price) result = selectedCount;
    } else {
      for (let i = coins.length - 1; i >= 0; i--) {
        DFS(selectedSum + coins[i], selectedCount + 1);
      }
    }
  }
  DFS();

  return result;
}
//

/**
 * @문제 - 10이하의 N개의 자연수가 주어지면 이 중 M개를 뽑아 일렬로 나열하는 방법을 모두 출력합 니다. (N개의 자연수가 오름차순으로 주어집니다.)
 * 입력
 * 3 2 // N:3, M:2
 * 3 6 9 // 수 3,6,9
 *
 * 출력
 * 3 6
 * 3 9
 * 6 3
 * 6 9
 * 9 3
 * 9 6
 * 6   // 총 갯수
 */
/**
 * 1. '뽑을 수 있는 숫자 중 1개뽑기' M번 반복한다.
 * 2. 기저 조건 - M
 * // getNPermutationM([3, 6, 9], 2))
 */
function getNPermutationM(numbers, M) {
  let result = "";
  let count = 0;

  function DFS(L, selectedNums = [], checkArr = []) {
    if (L >= M) {
      result += selectedNums.join(" ") + "\n";
      count++;
    } else {
      for (let i = 0; i < numbers.length; i++) {
        if (checkArr[i]) continue;

        selectedNums[L] = numbers[i];
        checkArr[i] = true;
        DFS(L + 1, selectedNums, checkArr);

        checkArr[i] = false;
      }
    }
  }
  DFS(0);

  return `${result}${count}`;
}

// review
function solution(numbers, selectCount) {
  let result = "";
  let count = 0;

  function DFS(index = 0, selected = [], checked = {}) {
    if (index >= selectCount) {
      result += selected.join(" ");
      result += "\n";
      count++;
    } else {
      for (let i = 0; i < numbers.length; i++) {
        if (checked[numbers[i]]) continue;

        selected[index] = numbers[i];
        checked[numbers[i]] = true;
        DFS(index + 1, selected, checked);

        delete checked[numbers[i]];
      }
    }
  }
  DFS();

  return `${result}${count}`;
}
//

/**
 * @문제 - 다음 공식을 사용하여 재귀를 이용해 조합수를 구해주는 프로그램을 작성하세요. nCr = n-1Cr-1 + n-1Cr
 * 입력
 * 5 3 // 5C3
 * 출력
 * 10
 */
/**
 * 1. nCr = n-1Cr-1 + n-1Cr
 * 2.
 */
function getCombination(n, r, hash = {}) {
  if (r === 1 || n - r === 1) return n;
  if (r === n || r === 0) return 1;

  if (hash[`${n - 1}_${r}`] === undefined) {
    hash[`${n - 1}_${r}`] = getCombination(n - 1, r, hash);
  }
  if (hash[`${n - 1}_${r - 1}`] === undefined) {
    hash[`${n - 1}_${r - 1}`] = getCombination(n - 1, r - 1, hash);
  }

  return hash[`${n - 1}_${r}`] + hash[`${n - 1}_${r - 1}`];
}

// review
function solution(n, r, resultStore = {}) {
  if (r === 1 || n - r === 1) return n;
  if (r == 0 || n - r === 0) return 1;

  if (resultStore[`${n - 1}_${r}`] === undefined) {
    resultStore[`${n - 1}_${r}`] = solution(n - 1, r, resultStore);
  }
  if (resultStore[`${n - 1}_${r - 1}`] === undefined) {
    resultStore[`${n - 1}_${r - 1}`] = solution(n - 1, r - 1, resultStore);
  }
  return resultStore[`${n - 1}_${r}`] + resultStore[`${n - 1}_${r - 1}`];
}
//

/**
 * @문제 - 가장 윗줄에 1부터 N까지의 숫자가 한 개씩 적혀 있다. 그리고 둘째 줄부터 차례대로 파스칼 의 삼각형처럼 위의 두개를 더한 값이 저장되게 된다.
 * N과 가장 밑에 있는 숫자가 주어져 있을 때 가장 윗줄에 있는 숫자를 구하는 프로그램을 작성하 시오. 단, 답이 여러가지가 나오는 경우에는 사전순으로 가장 앞에 오는 것을 출력하여야 한다.
 * 3 1 2 4  // N: 4, 1 ~ N 까지의 수
 *  4 3 6
 *   7 9
 *   16 // F
 * 입력
 * 4 16 // N: 4, F: 16
 * 출력
 * 3 1 2 4 // 가장 윗줄에 있는 숫자
 */
/**
 * 1. 1 ~ N까지의 연속된 자연수를 a,b,c,d라고 했을 때, F = a(N-1C0) + b(N-1C1) + c(N-1C1) + d(N-1C0)이다. (a < d, b < c)
 *    (N-1단계를 거치면서 합을 구하는 동안 양쪽부터 0개 중복, 1개 중복, 2개 중복...이 되는 상황이기 때문에 조합을 사용함)
 *    a,b,c,d를 나열하여 위의 조건에 부합한 경우를 찾아야 한다. 조금 더 빨리 찾기 위해 작은 수부터 선택해서 나열한다.
 * 2.
 */
function getPascalTriangleBaseNumbers(n, f) {
  let sum = 0;
  let result = "";
  function DFS(L = 0, selectedNums = [], hash = {}) {
    if (!!result) return;

    if (L >= n) {
      for (let i = 0; i < selectedNums.length; i++) {
        sum += selectedNums[i] * getCombination(n - 1, i);
      }
      if (sum === f) {
        result = selectedNums.join(" ");
      }
      sum = 0;
    } else {
      for (let i = 1; i <= n; i++) {
        if (hash[i]) continue;

        selectedNums[L] = i;
        hash[i] = true;
        DFS(L + 1, selectedNums, hash);

        hash[i] = false;
      }
    }
  }
  DFS();

  return result;
}

/**
 * - selectedNus에 각 수에 곱해지는 컴비네이션 값은 정해져 있으므로 미리 구해놓는다.
 * - sum을 selectedNums을 구하면서 업데이트 한다.
 * // getPascalTriangleBaseNumbers(4, 16)
 */
function getPascalTriangleBaseNumbers(n, f) {
  let result = "";
  const counts = Array.from({ length: n }, (_, i) => getCombination(n - 1, i));

  function DFS(L = 0, selectedNums = [], hash = {}, sum = 0) {
    if (!!result) return;

    if (L >= n) {
      if (sum === f) {
        result = selectedNums.join(" ");
      }
    } else {
      for (let i = 1; i <= n; i++) {
        if (hash[i]) continue;

        selectedNums[L] = i;
        hash[i] = true;
        DFS(L + 1, selectedNums, hash, sum + selectedNums[L] * counts[L]);

        hash[i] = false;
      }
    }
  }
  DFS();

  return result;
}

// review
function solution(n, f) {
  let result;
  const countOfSeletedNums = Array.from({ length: n }, (_, i) =>
    getNCombinationR(n - 1, i)
  );

  function DFS(index = 0, selected = [], sum = 0, check = {}) {
    if (result) return;

    if (index >= n) {
      if (sum === f) {
        result = selected.join(" ");
      }
    } else {
      for (let num = 1; num <= n; num++) {
        if (check[num]) continue;

        check[num] = true;
        selected[index] = num;
        DFS(index + 1, selected, sum + num * countOfSeletedNums[index], check);

        delete check[num];
      }
    }
  }
  DFS();

  return result;
}
//

/**
 * @문제 - 1부터 N까지 번호가 적힌 구슬이있습니다.이중 M개를 뽑는 방법의 수를 출력하는 프로그램을 작성하세요.
 * 입력
 * 4 2 // N, M
 *
 * 출력
 * 1 2
 * 1 3
 * 1 4
 * 2 3
 * 2 4
 * 3 4
 * 6
 */
/**
 * 1. 선택한 수는 다시 선택할 수 없다. 이전에 나온 조합은 만들지 않는다. (다음 레벨은 이전 레벨에서 선택한 수의 +1부터 선택 가능)
 * 2. 기저 조건 - M 뽑는 수를 넘으면 재귀 함수를 호출하지 않는다.
 * // getNCombinationM(4, 2)
 */
function getNCombinationM(n, m) {
  let result = "";
  let count = 0;

  function DFS(L = 0, start = 1, nums = []) {
    if (L >= m) {
      result += nums.join(" ");
      result += "\n";
      count++;
    } else {
      for (let i = start; i <= n; i++) {
        nums[L] = i;
        DFS(L + 1, i + 1, nums);
      }
    }
  }
  DFS();

  return `${result}${count}`;
}

// review
function solution(n, m) {
  let result = "";
  let count = 0;

  function DFS(index = 0, start = 1, selected = []) {
    if (index >= m) {
      result += selected.join("");
      result += "\n";
      count++;
    } else {
      for (let num = start; num <= n; num++) {
        selected[index] = num;
        DFS(index + 1, num + 1, selected);
      }
    }
  }
  DFS();

  return `${result}${count}`;
}
//

/**
 * @문제 - N개의 정수가 주어지면 그 숫자들 중 K개를 뽑는 조합의 합이 임의의 정수 M의 배수인 개수 는 몇 개가 있는지 출력하는 프로그램을 작성하세요.
 * 예를 들면 5개의 숫자 2 4 5 8 12가 주어지고, 3개를 뽑은 조합의 합이 6의 배수인 조합을 찾으면 4+8+12 2+4+12로 2가지가 있습니다.
 * 입력
 * 5 3 // N:5, K:3 (5개 숫자 중 3개를 뽑음)
 * 2 4 5 8 12 // 5개 숫자
 * 6 // M: 6 (6의 배수)
 *
 * 출력
 * 2
 */
/**
 * 1. 이전에 뽑은 index자리 이후의 숫자를 뽑는다.
 * 2. 기저 조건 - K 두개의 수를 뽑으면 재귀함수를 호출하지 않는다.
 * getMultipleOfMInCombination([2, 4, 5, 8, 12], 3, 6)
 */
function getMultipleOfMInCombination(numbers, k, m) {
  let count = 0;

  function DFS(L = 0, index = 0, sum = 0) {
    if (L >= k) {
      if (sum % m === 0) {
        count++;
      }
    } else {
      for (let i = index; i < numbers.length; i++) {
        DFS(L + 1, i + 1, sum + numbers[i]);
      }
    }
  }
  DFS();

  return count;
}

// review
function solution(numbers, k, m) {
  let result = 0;

  function DFS(index = 0, startIndex = 0, sum = 0) {
    if (index >= k) {
      if (sum % m === 0) {
        result++;
      }
    } else {
      for (let i = startIndex; i < numbers.length; i++) {
        DFS(index + 1, i + 1, sum + numbers[i]);
      }
    }
  }
  DFS();

  return result;
}
//
