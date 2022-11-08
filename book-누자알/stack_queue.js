/**
 * 린터 괄호 원리
 */
function linter(code) {
  const openBracket = ["{", "[", "("];
  const closeBracket = ["}", "]", ")"];

  const bracketPair = {
    "}": "{",
    "]": "[",
    ")": "(",
  };

  let stack = [];

  for (const string of code) {
    if (openBracket.includes(string)) {
      stack.push(string);
    } else if (closeBracket.includes(string)) {
      const bracket = stack.pop();

      if (!bracket) throw Error(`${string} doesnt have opening brace`);
      if (bracket !== bracketPair[string])
        throw Error(`${string} has mismatched opening brace`);
    }
  }

  if (stack.length) throw Error(`${stack.join()} doesnt have closing brace`);
}

/**
 * @문제 - 스택을 이용해 문자열을 거꾸로 만드는 함수를 작성해라.
 */
function reverse(str) {
  let stack = [];

  for (const char of str) {
    stack.push(char);
  }

  let result = "";
  while (stack.length) {
    result += stack.pop();
  }

  return result;
}
