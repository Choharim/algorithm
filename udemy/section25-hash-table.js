/**
 * key-value로 데이터를 저장할 때 사용하기 좋은 데이터 구조.
 * 해쉬 함수를 이용해 특정 key의 hashKey를 얻고 이를 hash의 key로 저장한다.
 * 다른 key도 동일한 hashKey를 얻을 수 있기 때문에 이런 해쉬 충돌을 해결해야 한다.
 *
 * 해쉬 함수
 * - 특정 방법으로 key를 이용해 hash key를 만든다.
 * - 해쉬 충돌을 줄여야 한다. (쵀대한 넓게 분포되게 해야 한다.)
 * - 속도가 빨라야 한다.
 *
 * 해쉬 충돌을 줄이는 빙법
 * 1. separate chaining
 * - 같은 자리에 이중 구조로 추가한다.
 * 2. linear probing
 * - 충돌나면 근처 빈곳에 넣는다.
 * 등.. 그외 여러 방법이 있다.
 */

class HashTable {
  constructor(size = 4) {
    this.keyMap = new Array(size);
  }

  /**
   * key를 특정 규칙을 이용해 변경한 후 hash key로 사용한다.
   */
  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt() - 96;

      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }

    return total;
  }

  /**
   * 개별 체이닝을 통해 충돌을 해결한다.
   */
  set(key, value) {
    if (this.get(key)) return;

    const hashKey = this._hash(key);

    if (!this.keyMap[hashKey]) {
      this.keyMap[hashKey] = [];
    }
    this.keyMap[hashKey].push([key, value]);

    return hashKey;
  }

  get(key) {
    const hashKey = this._hash(key);

    if (!this.keyMap[hashKey]) return;

    for (let i = 0; i < this.keyMap[hashKey].length; i++) {
      const [k, v] = this.keyMap[hashKey][i];
      if (k === key) {
        return v;
      }
    }
  }

  values() {
    let valuesArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (!this.keyMap[i]) continue;

      for (let j = 0; j < this.keyMap[i].length; j++) {
        const [_, value] = this.keyMap[i][j];
        valuesArr.push(value);
      }
    }

    return valuesArr;
  }

  keys() {
    let keysArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (!this.keyMap[i]) continue;

      for (let j = 0; j < this.keyMap[i].length; j++) {
        const [key] = this.keyMap[i][j];
        keysArr.push(key);
      }
    }

    return keysArr;
  }
}
let hash = new HashTable();
console.log(hash.set("hello world", "goodbye!!"));
console.log(hash.set("dogs", "are cool"));
console.log(hash.set("cats", "are fine"));
console.log(hash.set("i love", "pizza"));
console.log(hash.set("i love", "pizza2"));
console.log(hash.keyMap);
console.log(hash.keys());
