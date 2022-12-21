/**
 * @문제_Section1 - 세 수 중 최솟값
 */
/**
 * 1. 100이하의 자연수 범위이므로 최소값의 초기값을 100으로 한다.
 * 2. 모든 값과 비교하며 최소값보다 작으면 업데이트 한다.
 */
function solution(nums) {
  let min = 100;
  nums.forEach((n) => {
    if (n < min) {
      min = n;
    }
  });

  return min;
}

/**
 * @문제_Section1 - 삼각형 판별하기
 */
/**
 * 1. 가장 큰 값 보다 나머지의 값의 합이 더 커야 삼각형을 만들 수 있다.
 * 2. sum과 max를 구한다.
 * 3. sum - max > max 를 만족하면 YES아니면 NO를 반환한다.
 */
function solution(sides) {
  let sum = 0;
  let max = 0;

  sides.forEach((side) => {
    sum += side;

    if (side > max) {
      max = side;
    }
  });

  if (sum / 2 > max) return "YES";

  return "NO";
}

/**
 * @문제_Section1 - 연필 개수
 */
/**
 * 1. 한 명당 한 개의 연필을 나누어주므로 사람수 * 1의 연필 개수가 필요하고,
 *    연필 갯수 * 1 다스 / 12개 연필 = 필요한 다스 수 가 나온다. 이때, 다스 수는 정수이므로 소숫점 올림을 해준다.
 */
function solution(people) {
  return Math.ceil(people / 12);
}

/**
 * @문제_Section1 - 1부터 N까지 합 출력하기
 */
/**
 * 1. 1 부터 n까지의 수는 규칙적으로 1씩 증가한다. 1부터는 1씩 증가, 6부터는 1씩 감소한다.
 *    이런 규칙으로 나열된 수의 반을 접어 만나는 수끼리 합을 구하면 동일하다. 만나는 수가 없으면 합의 절반이 된다.
 * 2. 두 수들의 합이 n + 1 이고, n/2개 존재하므로 (n + 1) * n / 2로 계산할 수 있다.
 */
function solution(num) {
  return ((num + 1) * num) / 2;
}

/**
 * @문제_Section1 - 홀수
 */
function solution(nums) {
  let sum = 0;
  let min = 99;
  nums.forEach((n) => {
    if (n % 2) {
      sum += n;

      if (n < min) {
        min = n;
      }
    }
  });

  return `${sum}\n${min}`;
}

/**
 * @문제_Section1 - 10부제
 */
/**
 *
 */
function solution(day, cars) {
  let count = 0;

  cars.forEach((carNum) => {
    if (day === carNum % 10) {
      count++;
    }
  });
  return count;
}

/**
 * @문제_Section1 - 일곱 난쟁이
 */
/**
 * 1. 모든 난쟁이의 몸무게 합을 구하고 100을 빼어 오버된 몸무게 합을 구한다. 오버된 몸무게는 기존 난쟁이가 아닌 두 명 몸무게의 합이다.
 * 2. 기존에 주어진 난쟁이의 순서를 지켜고 몸무게는 모두 다르므로 Set을 사용하여 모든 몸무게를 저장한다.
 * 3. 현재값과 현재값의 짝인 오버된 몸무게 - 현재값이 set에 존재하면 기존 난쟁이가 아니다.
 * 이때, 현재값과 몸무게 - 현재값이 동일하면 몸무게 - 현재값이 set에서 자신을 찾은 것이므로 주의한다.
 */
function solution(weights) {
  const sum = weights.reduce((acc, curr) => (acc += curr), 0);
  const overSum = sum - 100;

  let set = new Set(weights);

  let result = [];
  for (let i = 0; i < weights.length; i++) {
    if (!set.has(overSum - weights[i]) || overSum / 2 === weights[i]) {
      result.push(weights[i]);
    }
  }

  return result;
}

/**
 * @문제_Section1 - A를 #으로
 */
function solution(word) {
  let result = "";

  for (let i = 0; i < word.length; i++) {
    if (word[i] === "A") {
      result += "#";
    } else {
      result += word[i];
    }
  }

  return result;
}

/**
 * @문제_Section1 - 문자 찾기
 */
function solution(word, alphabet) {
  let count = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === alphabet) {
      count++;
    }
  }
  return count;
}

/**
 * @문제_Section1 - 대문자 찾기
 */
function solution(word) {
  let count = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] !== word[i].toLowerCase()) {
      count++;
    }
  }
  return count;
}

/**
 * @문제_Section1 - 가장 긴 문자열
 */
function solution(words) {
  let maxLength = 0;
  let index;

  let currentLength;
  words.forEach((word, i) => {
    currentLength = word.length;

    if (currentLength > maxLength) {
      maxLength = currentLength;
      index = i;
    }
  });

  return words[index];
}

/**
 * @문제_Section1 - 가운데 문자 출력
 */
function solution(word) {
  const middle = word.length / 2;

  let result = "";
  for (let i = Math.ceil(middle - 1); i <= middle; i++) {
    result += word[i];
  }

  return result;
}

/**
 * @문제_Section1 - 중복문자제거
 */
function solution(word) {
  let set = new Set();

  let result = "";
  for (let i = 0; i < word.length; i++) {
    if (set.has(word[i])) continue;

    set.add(word[i]);
    result += word[i];
  }

  return result;
}

/**
 * @문제_Section1 - 중복단어제거
 */
function solution(words) {
  const set = new Set();

  let result = "";
  words.forEach((word) => {
    if (set.has(word)) return;

    set.add(word);
    if (!!result) result += "\n";
    result += word;
  });

  return result;
}
