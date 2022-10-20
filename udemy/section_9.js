/**
 * @문제 - 문자열을 역순으로 재배치해라.
 * ex)
 * reverse('awesome') // 'emosewa'
 * reverse('rithmschool') // 'loohcsmhtir'
 */

/**
 * @풀이
 * awes -> sewa
 * awe -> ewa
 * 1. 기존 input의 마지막 문자를 앞에 붙인다.
 * 2. 기저 조건은 문자열이 1일 때 이다.
 */
function reverse(string) {
  if (string.length === 1) return string[0];

  return string[string.length - 1] + reverse(string.slice(0, -1));
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
 * @풀이
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
 * @문제 - 인수는 배열과 함수이고 배열의 요소에 함수에 만족하는 것이 있으면 true를 아니면 false를 리턴해라.
 * const isOdd = val => val % 2 !== 0;
 * ex)
 * someRecursive([1,2,3,4], isOdd) // true
 * someRecursive([4,6,8,9], isOdd) // true
 * someRecursive([4,6,8], isOdd) // false
 * someRecursive([4,6,8], val => val > 10); // false
 */

/**
 * @풀이
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
 * @풀이
 * 1. ['car','taco','banana'] ->  ['Car','Taco','Banana'] / 하위 문제: ['car','taco'] ->  ['Car','Taco']
 * 2. 이를 보아 [...f(n-1),`${input 마지막 문자열의 첫 문자를 대문자로 변경한 것}`]
 * 3. 기저 조건은 array.length가 1일 때 이다.
 */
function capitalizeFirst(array) {
  if (array.length === 1)
    return [`${array[0][0].toUpperCase()}${array[0].slice(1)}`];

  return [
    ...capitalizeFirst(array.slice(0, -1)),
    `${array[array.length - 1][0].toUpperCase()}${array[array.length - 1].slice(
      1
    )}`,
  ];
}

function capitalizeFirst(array) {
  if (array.length === 0) return [];

  return [
    ...capitalizeFirst(array.slice(0, -1)),
    `${array[array.length - 1][0].toUpperCase()}${array[array.length - 1].slice(
      1
    )}`,
  ];
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
function nestedEvenSum(obj) {
  let result = 0;

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object") {
      result += nestedEvenSum(value);
    } else {
      if (value % 2 === 0) {
        result += value;
      }
    }
  }

  return result;
}

/**
 * @문제 - 문자열이 들어있는 배열에서 모두 대문자로 변경해라.
 */

/**
 * @풀이
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
/*

stringifyNumbers(obj)

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

/**
 * @풀이
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
      result = [...result, value];
    } else if (typeof value === "object") {
      result = [...result, ...collectStrings(value)];
    }
  }

  return result;
}
