/**
 * @문제 - 올바른 괄호
 */
function solution(brackets) {
  const BRACKET = {
    "(": ")",
  };
  let stack = [];

  let poped;
  for (let i = 0; i < brackets.length; i++) {
    if (BRACKET[brackets[i]]) {
      stack.push(brackets[i]);
    } else {
      poped = stack.pop();

      if (brackets[i] !== BRACKET[poped]) return "NO";
    }
  }

  return stack.length ? "NO" : "YES";
}

/**
 * @문제 - 괄호문자제거
 */
function solution(str) {
  const BRACKETS = ["(", ")"];
  let bracketStack = [];
  let alphabetStack = [];

  for (let i = 0; i < str.length; i++) {
    if (BRACKETS.includes(str[i])) {
      if (str[i] === BRACKETS[0]) {
        bracketStack.push(i);
      } else {
        if (!bracketStack.length) continue;

        bracketIndex = bracketStack.pop();

        while (alphabetStack.length) {
          alphabetIndex = alphabetStack.pop();
          if (alphabetIndex < bracketIndex) {
            alphabetStack.push(alphabetIndex);
            break;
          }
        }
      }
    } else {
      alphabetStack.push(i);
    }
  }

  let result = "";
  alphabetStack.forEach((index) => {
    result += str[index];
  });

  return result;
}

/**
 * @문제 - 크레인 인형뽑기(카카오 기출)
 */
function solution(board, moves) {
  let count = 0;
  let stack = [];

  let picked;
  let poped;
  for (let i = 0; i < moves.length; i++) {
    while (board[moves[i] - 1].length && !picked) {
      picked = board[moves[i] - 1].pop();
    }

    if (picked) {
      poped = stack.pop();
      if (poped === picked) {
        count += 2;
      } else {
        stack.push(picked);
      }

      picked = 0;
    }
  }

  return count;
}

/**
 * @$문제 - 후위식 연산(postfix)
 */
/**
 * @$문제 - 쇠막대기
 */

/**
 * @문제 - 공주 구하기
 */
function solution(n, k) {
  let store = Array.from({ length: n }, (_, i) => i + 1);

  let pointer = 0;
  let kCounter = 0;
  while (store.length > 1) {
    kCounter++;
    if (kCounter === k) {
      store.splice(pointer, 1);
      kCounter = 0;
    } else {
      pointer++;
    }

    if (pointer >= store.length) {
      pointer = 0;
    }
  }

  return store[0];
}

/**
 * @문제 - 교육과정 설계
 */
function solution(condition, schedule) {
  let stack = [...condition];
  let poped;

  let pointer = schedule.length - 1;
  while (pointer >= 0) {
    if (!poped) {
      poped = stack.pop();
    }

    if (schedule[pointer] === poped) {
      poped = null;
    }
    pointer--;
  }

  return !!stack.length ? "NO" : "YES";
}
