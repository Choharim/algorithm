/**
 * @문제 - 큰 수 출력하기
 */
function solution(nums) {
  let result = [];

  nums.forEach((num, i) => {
    if (num < nums?.[i - 1]) return;

    result.push(num);
  });
  return result;
}

/**
 * @문제 - 보이는 학생
 */
function solution(heights) {
  let maxHeight = 0;
  let count = 0;

  heights.forEach((height) => {
    if (height > maxHeight) {
      count++;

      maxHeight = height;
    }
  });

  return count;
}

/**
 * @문제 - 가위 바위 보
 */
function solution(n, a, b) {
  const WIN = {
    1: 3,
    2: 1,
    3: 2,
  };
  let result = "";

  for (let i = 0; i < n; i++) {
    if (i > 0) {
      result += "\n";
    }

    if (a[i] === b[i]) {
      result += "D";
      continue;
    }

    if (WIN[a[i]] === b[i]) {
      result += "A";
    } else {
      result += "B";
    }
  }

  return result;
}

/**
 * @문제 - 점수계산
 */
function solution(results) {
  let score = 0;
  let startScore = 0;

  results.forEach((result) => {
    if (result) {
      startScore++;
      score += startScore;
    } else {
      startScore = 0;
    }
  });

  return score;
}

/**
 * @문제 - 등수구하기
 */
/**
 * 1. 점수별로 index를 묶는다
 *    object의 key를 점수, value를 해당 점수를 갖는 index 배열
 * 2. object의 key가 모두 숫자이므로  object 필드의 순서는 오름차순이다.
 *    이를 이용해 object를 순회하면 점수가 낮은 index부터 찾을 수 있다.
 * 3. 꼴등부터 등수를 매겨간다.
 */
function solution(scores) {
  let scoreGroup = {};
  let result = [];

  scores.forEach((score, i) => {
    if (scoreGroup[score] === undefined) {
      scoreGroup[score] = [];
    }
    scoreGroup[score].push(i);
  });

  let rank = scores.length;
  Object.keys(scoreGroup).forEach((key) => {
    rank -= scoreGroup[key].length - 1;

    scoreGroup[key].forEach((index) => {
      result[index] = rank;
    });

    rank -= 1;
  });

  return result;
}

/**
 * @문제 - 격자판 최대합
 */
function solution(matrix) {
  const n = matrix.length;
  let max = 0;

  let sum;
  for (let i = 0; i < n; i++) {
    // 행
    sum = 0;
    sum = matrix[i].reduce((acc, cur) => (acc += cur), 0);
    max = Math.max(max, sum);
    // 열
    sum = 0;
    for (let j = 0; j < n; j++) {
      sum += matrix[j][i];
    }

    max = Math.max(max, sum);

    // 대각선
    if (i === 0 || i === n - 1) {
      sum = 0;

      for (let j = 0; j < n; j++) {
        sum += matrix[j][Math.abs(j - i)];
      }

      max = Math.max(max, sum);
    }
  }

  return max;
}

/**
 * @문제 - 봉우리
 */
/**
 * 1. (0,0)에서 시계방향으로 방문한다.
 * 2. 방문한 곳을 체크하고, 범위를 벗어나거나 방문했던 곳은 가지 않는다.
 * 3. 방문했을 때 주위 값보다 자신이 크면 카운팅한다.
 */
function solution(matrix) {
  const size = matrix.length;
  let check = new Set();
  let count = 0;

  function traverse(x = 0, y = 0) {
    check.add(`${x},${y}`);

    const sides = [
      [x, y + 1],
      [x + 1, y],
      [x, y - 1],
      [x - 1, y],
    ];

    let isLarger = true;
    for (const [a, b] of sides) {
      if (matrix[x][y] <= (matrix[a]?.[b] ?? 0)) {
        isLarger = false;

        break;
      }
    }
    if (isLarger) {
      count++;
    }

    for (const [a, b] of sides) {
      if (a < 0 || a >= size || b < 0 || b >= size) continue;
      if (check.has(`${a},${b}`)) continue;

      traverse(a, b);
    }
  }
  traverse();

  return count;
}
