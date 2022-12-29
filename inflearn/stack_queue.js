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
console.log(solution("(A(BC)D)EF(G(H)(IJ)K)LM(N)"));
