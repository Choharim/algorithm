class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// let fist = new Node("hi");
// fist.next = new Node("there");
// fist.next.next = new Node("how");
// fist.next.next.next = new Node("are");
// fist.next.next.next.next = new Node("you");

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;

    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let node = this.get(this.length - 2);
    const last = node.next;

    if (!last) {
      this.head = null;
      this.tail = null;
    } else {
      node.next = null;
      this.tail = node;
    }

    this.length--;

    return last || node;
  }

  //  @pop 다른 방법
  //   pop() {
  //     if (!this.head) return undefined;

  //     let current = this.head;
  //     let newTail = current;

  //     while (current.next) {
  //       newTail = current;
  //       current = current.next;
  //     }

  //     if (newTail === current) {
  //       this.head = null;
  //       this.tail = null;
  //     } else {
  //       newTail.next = null;
  //       this.tail = newTail;
  //     }

  //     this.length--;
  //     return current;
  //   }

  shift() {
    if (!this.head) return undefined;

    const first = this.head;

    if (!first.next) {
      this.tail = null;
    }

    this.head = this.head.next;
    this.length--;

    return first;
  }

  unshift(value) {
    const node = new Node(value);

    if (!this.head) {
      this.tail = node;
    } else {
      node.next = this.head;
    }

    this.head = node;
    this.length++;

    return this;
  }

  isIndex(index) {
    if (typeof index !== "number") return false;
    if (index >= this.length || index < 0) return false;

    return true;
  }

  get(index) {
    if (!this.isIndex(index)) return null;

    let target = this.head;

    for (let i = 1; i <= index; i++) {
      target = target.next;
    }

    return target;
  }

  set(index, value) {
    const node = this.get(index);
    if (node) {
      node.value = value;

      return true;
    }
    return false;
  }
}
