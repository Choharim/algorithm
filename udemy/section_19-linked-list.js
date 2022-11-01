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
}
