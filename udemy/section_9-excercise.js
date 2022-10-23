/**
 * @문제 - 문자열을 역순으로 재배치해라.
 * ex)
 * reverse('awesome') // 'emosewa'
 * reverse('rithmschool') // 'loohcsmhtir'
 */

/**
 * @풀이1
 * awes -> sewa
 * awe -> ewa
 * 1. 기존 input의 마지막 문자를 앞에 붙인다.
 * 2. 기저 조건은 문자열이 1일 때 이다.
 */
function reverse(string) {
  if (string.length === 1) return string;

  return string[string.length - 1] + reverse(string.slice(0, -1));
}

/**
 * @풀이2
 * 1. helper함수 이용
 */
function reverse(string) {
  const firstIndex = string.length - 1;
  let result = string[firstIndex];

  function helper(i) {
    if (i === 0) return string[0];

    return string[i] + helper(i - 1);
  }

  return result + helper(firstIndex - 1);
}

/**
 * @문제 - 거꾸로 읽어도 제대로 읽는 것과 같은 단어인지 확인해라.
 * ex)
 * isPalindrome('awesome') // false
 * isPalindrome('foobar') // false
 * isPalindrome('tacocat') // true
 * isPalindrome('amanaplanacanalpanama') // true
 * isPalindrome('amanaplanacanalpandemonium') // false
 */

/**
 * @풀이1
 * 1. 양끝의 문자가 다르면 false리턴한다.
 * 2. 다음 재귀를 실행할 때는 확인했던 양끝의 문자는 제거한다.
 * 3. 문자의 길이가 1개이면 true를 반환한다.
 */
function isPalindrome(string) {
  if (string.length === 1) return true;

  if (string[0] !== string[string.length - 1]) return false;

  return isPalindrome(string.slice(1, -1));
}

/**
 * @풀이2
 */
function isPalindrome(string) {
  function helper(i = 0, j = string.length - 1) {
    if (i === j) return true;

    if (string[i] !== string[j]) {
      return false;
    } else {
      return helper(i + 1, j - 1);
    }
  }

  return helper();
}

/**
 * @문제 - 인수는 배열과 함수이고 배열의 요소에 함수에 만족하는 것이 있으면 true를 아니면 false를 리턴해라.
 * const isOdd = val => val % 2 !== 0;
 * ex)
 * someRecursive([1,2,3,4], isOdd) // true
 * someRecursive([4,6,8,9], isOdd) // true
 * someRecursive([4,6,8], isOdd) // false
 * someRecursive([4,6,8], val => val > 10); // false
 */

/**
 * @풀이1
 * 1. [1,2,3,4] -> true , [1,2,3] -> true
 * 2. 하위 문제의 값에 기존 문제 input의 마지막 요소가 홀수이면 true를 리턴하고 그렇지 않으면
 * 하위 문제의 값을 그대로 리턴한다.
 * 3. 기저 조건은 배열의 길이가 0일 때 이다.
 */
function someRecursive(array, callback) {
  if (array.length === 0) return false;

  return callback(array[array.length - 1])
    ? true
    : someRecursive(array.slice(0, -1), callback);
}
function someRecursive(array, callback) {
  if (array.length === 1) return callback(array[array.length - 1]);

  return (
    callback(array[array.length - 1]) ||
    someRecursive(array.slice(0, -1), callback)
  );
}

/**
 * @풀이2
 */
function someRecursive(array, callback) {
  function helper(i = 0) {
    const result = callback(array[i]);

    if (i === array.length - 1) return result;

    if (result) {
      return true;
    } else {
      return helper(i + 1);
    }
  }

  return helper();
}

/**
 * @문제 - 배열의 모든 요소를 flat해라.
 * ex)
 * flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
 * flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
 * flatten([[1],[2],[3]]) // [1,2,3]
 * flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3
 */

/**
 * @풀이1
 * 1. helper함수 방법을 사용할 수 있다.
 *   조건에 맞는 값을 저장해야 하므로 재귀 함수로 반복 하여 값을 추출한 다음 외부 함수에 변수에 담아 리턴하도록 한다.
 */
function flatten(array) {
  let result = [];

  function helper(array) {
    for (const element of array) {
      if (Array.isArray(element)) {
        helper(element);
      } else {
        result = [...result, element];
      }
    }
  }

  helper(array);

  return result;
}

/**
 * @풀이2
 * 1. 배열을 순회하며 숫자면 결과 배열에 넣고 배열이면 이를 반복한다.
 */
function flatten(array) {
  let result = [];

  for (const element of array) {
    if (Array.isArray(element)) {
      result = result.concat(flatten(element));
    } else {
      result = [...result, element];
    }
  }

  return result;
}

/**
 * @문제 - 배열에 들어있는 문자열의 첫 문자를 대문자로 변환하여라.
 * ex)
 * capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']
 */

/**
 * @풀이1
 * 1. ['car','taco','banana'] ->  ['Car','Taco','Banana'] / 하위 문제: ['car','taco'] ->  ['Car','Taco']
 * 2. 이를 보아 [...f(n-1),`${input 마지막 문자열의 첫 문자를 대문자로 변경한 것}`]
 * 3. 기저 조건은 array.length가 1일 때 이다.
 */
function capitalizeFirst(array) {
  if (!array.length) return [];

  return [
    ...capitalizeFirst(array.slice(0, -1)),
    `${array[array.length - 1][0].toUpperCase()}${array[array.length - 1].slice(
      1
    )}`,
  ];
}

/**
 * @풀이2
 */
function capitalizeFirst(array) {
  function helper(i = 0) {
    const element = array[i];

    if (i === array.length - 1)
      return [`${element[0].toUpperCase()}${element.slice(1)}`];

    return [`${element[0].toUpperCase()}${element.slice(1)}`, ...helper(i + 1)];
  }

  return helper();
}

/**
 * @문제 - 객체 값에 짝수를 찾아 합계를 구해라.
 * ex)
 * nestedEvenSum(obj1); // 6
 * nestedEvenSum(obj2); // 10
 */

//  var obj1 = {
//   outer: 2,
//   obj: {
//     inner: 2,
//     otherObj: {
//       superInner: 2,
//       notANumber: true,
//       alsoNotANumber: "yup"
//     }
//   }
// }
// var obj2 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };

/**
 * @풀이
 * 1. 하위 문제를 파악할 수 없다.
 * 2. object를 순회하며 value가 양수일 때 결과값에 더한다.
 * 3. value가 object일 때 이를 반복한다.
 * @확인하기
 * 1. object의 value 모두 object가 아니라고 보고 판단해보자.
 * 2. object의 value가 object이고 해당 value 모두 object가 아니라고 판단해보자.
 */
function nestedEvenSum(object) {
  let result = 0;

  for (const key in object) {
    const value = object[key];

    if (value % 2 === 0) {
      result += value;
    } else if (typeof value === "object") {
      result += nestedEvenSum(value);
    }
  }

  return result;
}

/**
 * @문제 - 문자열이 들어있는 배열에서 모두 대문자로 변경해라.
 */

/**
 * @풀이1
 * 1. ['banana','apple','peach'] ->  ['BANANA','APPLE','PEACH'] // ['banana','apple'] ->  ['BANANA','APPLE']
 * 2. [...f(n -1), `${input의 마지막 요소를 모두 대문자로 변경한 것}`]
 * 3. 기저 조건은 n === 1일 때
 */
function capitalizeWords(array) {
  if (array.length === 0) return [];

  return [
    ...capitalizeWords(array.slice(0, -1)),
    array[array.length - 1].toUpperCase(),
  ];
}

function capitalizeWords(array) {
  if (array.length === 1) {
    return [array[0].toUpperCase()];
  }
  return [
    ...capitalizeWords(array.slice(0, -1)),
    array[array.length - 1].toUpperCase(),
  ];
}

/**
 * @풀이2
 */
function capitalizeWords(array) {
  function helper(i = 0) {
    if (i === array.length) return [];

    return [array[i].toUpperCase(), ...helper(i + 1)];
  }

  return helper();
}

/**
 * @문제 - object value에 숫자를 모두 문자로 변경해라.
let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}
*/

/**
 * @풀이1
 */
function stringifyNumbers(obj) {
  let result = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "number") {
      result[key] = `${value}`;

      // 주의 ) typeof something === 'object'가 true일 때 이는 array 또는 object이다.
    } else if (typeof value === "object" && !Array.isArray(value)) {
      result[key] = stringifyNumbers(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * @풀이2
 */
function stringifyNumbers(obj, result = {}) {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "number") {
      result[key] = `${value}`;
    } else if (typeof value === "object" && !Array.isArray(value)) {
      return stringifyNumbers(value, result);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * @문제 - object의 string value만 모아 배열에 넣어 리턴해라.
 */

/**
 * @풀이
 */
function collectStrings(object) {
  let result = [];

  for (const key in object) {
    const value = object[key];

    if (typeof value === "string") {
      result.push(value);
    } else if (typeof value === "object" && !Array.isArray(value)) {
      result = result.concat(collectStrings(value));
    }
  }

  return result;
}

/**
 * @문제 - 주어진 문자열의 모든 애너그램 배열을 반환해라. (애너그램이란, 문자열 내 모든 문자들을 재배열한 문자열)
 * ex)
 * 'abc' -> ['abc','acb','bac','bca','cab',cba']
 */

/**
 * 시간 복잡도 O(n!)
 * 주어진 단어 내 문자를 줄지어 세워 만들 수 있는 딘아의 갯수를 구하면
 * n * (n - 1) * (n - 2) * ... * 1 개이므로 시간 복잡도는 n!이 된다.
 *
 * @풀이
 * 1. 'abc'의 하위 문제는 'ab'이다. 'ab'의 애너그램은 ['ab','ba']이다.
 * 2. ['ab','ba']를 ['abc','acb','bac','bca','cab',cba']로 만들기 위해선,
 *    c를 각 요소 사이사이에 배치하여 생성한 단어를 배열에 저장하면 된다.
 * 3. f(n-1)이 반환한 배열을 순회하며 기존 문제의 마지막 요소(n번째의 input 마지막 요소)를 결과 배열에 저장한다.
 * 4. input 문자열 길이가 1개일 때는 해당 문자를 배열에 넣어 리턴하면 된다 -> 기저 조건
 */
function anagram(string) {
  let result = [];

  if (string.length === 1) return [string];

  for (const char of anagram(string.slice(0, -1))) {
    for (let i = 0; i <= char.length; i++) {
      // 사이사이 모두 넣어야 하므로 문자열 길이 만큼 순회한다.
      const addedChar = string[string.length - 1];

      result.push(`${char.slice(0, i)}${addedChar}${char.slice(i)}`);
    }
  }

  return result;
}
