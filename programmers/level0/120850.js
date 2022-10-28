/**
 * @keyword
 * - insertion sort를 이용할 수 있다.
 * 1. 문자열 내 문자를 숫자화할 수 있을 때 결과 배열에 담는다.
 * 2. 처음 결과배열에 담으면 해당 배열은 정렬되어 있다고 볼 수 있다.
 * 3. 정렬된 배열에 요소를 추가하며 정렬하기 위해서 삽입 정렬의 원리를 이용한다.
 */
function solution(my_string) {
  var result = [];
  let pointer;

  for (let i = 0; i < my_string.length; i++) {
    const number = Number(my_string[i]);
    if (Number.isNaN(number)) continue;

    if (!result.length) {
      result.push(number);
    } else {
      for (pointer = result.length - 1; pointer >= 0; pointer--) {
        if (result[pointer] > number) {
          result[pointer + 1] = result[pointer];
        } else {
          break;
        }
      }
      if (pointer === result.length - 2) {
        result.push(number);
      } else {
        result[pointer + 1] = number;
      }
    }
  }
  return result;
}
