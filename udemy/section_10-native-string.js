/**
 * @문제 - 문장에 특정 단어가 몇개 들어가는지 세어라.
 */

/**
 * @풀이
 * 1. 문장을 순회하며 단어와 동일한 문자를 가지고 있으면 단어에서 가리키는 index를 +1 옮긴다.
 * 2. 다른 문자를 가진다면 단어에서 가리키는 index를 0으로 초기화한다.
 * 3. 동일한 문자이고 단어에서 가리키는 index기 미지막 index일 때 카운트를 해준다.
 */
function searchNativeString(sentence, word) {
  let count = 0;
  let wordIndex = 0;

  for (let index = 0; index < sentence.length; index++) {
    if (word[wordIndex] === sentence[index]) {
      if (wordIndex < word.length - 1) {
        wordIndex += 1;
      } else {
        count += 1;
        wordIndex = 0;
      }
    } else {
      wordIndex = 0;
    }
  }

  return count;
}
console.log(searchNativeString("testwordttesawordsewredword", "word"));
