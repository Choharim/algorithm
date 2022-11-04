class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * @문제 - 리스트 내 모든 원소를 출력해라.
   */
  printAll() {
    let node = this.head;

    for (let i = 0; i < this.length; i++) {
      console.log(node.value);
      node = node.next;
    }
  }

  /**
   * @문제 - 리스트를 거꾸로 뒤집는 메소드를 추가해라.
   */
  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    let next;
    let prev = null;
    for (let i = 0; i < this.length; i++) {
      next = current.next;
      current.prev = prev;

      prev = current;
      current = next;
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * @문제 - 이중 연결 리스트에서 모든 원소를 거꾸로 출력하는 메소드를 추가해라.
   */
  prinitInReverse() {
    let current = this.tail;

    for (let i = this.length - 1; i >= 0; i--) {
      console.log(current.value);
      current = current.prev;
    }
  }
}
