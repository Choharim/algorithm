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

    let node = this.traverse(this.length - 1);
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

  traverse(order) {
    let i = 1;
    let targetNode = this.head;

    while (i < order && targetNode) {
      targetNode = targetNode.next;
      i++;
    }

    return targetNode;
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
}
