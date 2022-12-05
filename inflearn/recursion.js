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
