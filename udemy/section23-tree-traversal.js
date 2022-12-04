/**
 * @tree traversal 트리 순회
 */

/**
 * 트리를 만들기 위해 binary search tree를 구현하자.
 */
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.insertNode = function insertNode(
  inserted,
  current = this.root
) {
  if (current.value === inserted.value) return;

  if (current.value > inserted.value) {
    if (!current.left) {
      current.left = inserted;
    } else {
      this.insertNode(inserted, current.left);
    }
  } else {
    if (!current.right) {
      current.right = inserted;
    } else {
      this.insertNode(inserted, current.right);
    }
  }
};

BinarySearchTree.prototype.insert = function (value) {
  const inserted = new Node(value);

  if (!this.root) {
    this.root = inserted;
  } else {
    this.insertNode(inserted);
  }
};
const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

/**
 * @BFS (breadth first search) - 너비 우선 탐색
 * [ 10, 6, 15, 3, 8, 20 ]
 * 특징
 * - queue의 최대 길이는 트리의 마지막 단계의 노드 갯수와 동일하다. 트리가 넓을 경우 공간복잡도가 O(2^n)이다.
 *   예를 들어, 이진 트리에 모든 노드가 있고 깊이가 10 (최대 단계 9)라면 2^9 = 512의 길이를 최대로 가진다.
 * - 너비는 없고 깊이만 있는 linear한 트리일 경우는 공간 복잡도가 O(1)이다.
 * - 모든 노드를 모두 방문하니 DFS와 시간 복잡도는 동일하다.
 */

/**
 * @방법1 - 반복문
 * 1. 작업할 노드를 queue에 저장한다.
 * 2. queue가 비어있지 않으면 (작업할 노드가 있으면) dequeue한 노드의 value를 결과값이 담는다. 그리고 dequeue한 노드의 왼/오 노드를 앞으로 작업해야 하니 queue에 담는다.
 * 3. 이를 반복한다.
 */
BinarySearchTree.prototype.BFS = function () {
  let queue = [this.root];
  let result = [];

  let dequeue;
  while (queue.length) {
    dequeue = queue.shift();

    result.push(dequeue.value);
    if (dequeue.left) {
      queue.push(dequeue.left);
    }
    if (dequeue.right) {
      queue.push(dequeue.right);
    }
  }

  return result;
};

/**
 * @방법2 - 재귀
 * 재귀를 작성할 때 작성하기 쉬운 방법!!
 * - 기저 조건을 파악한다.
 * - 리턴 값을 파악한다.
 * - 기저조건일 때와 기저조건이 아닐 때의 결과 형태는 동일해야하고, 기저 조건이 아닐 때는 재귀를 실행하되 이때의 재귀 함수는 기저 조건에서 반환한 값이 반환된다고 생각한다.
 * - 재귀 함수의 인자는 기저 조건과 관련되어 있다.
 *
 * 1. 작업할 노드를 queue에 저장한다.
 * 2. queue가 비었으면 작업을 끝낸다. -> 기저 조건
 * 3. 결과값은 노드의 value이다. 재귀 함수의 리턴 값은 항상 노드의 value가 담겨진 배열이다.
 */
BinarySearchTree.prototype.BFS = function (queue = [this.root]) {
  let result = [];
  if (!queue.length) return result;

  const dequeue = queue.shift();

  let updatedQueue = [...queue];

  if (dequeue.left) {
    updatedQueue.push(dequeue.left);
  }
  if (dequeue.right) {
    updatedQueue.push(dequeue.right);
  }

  return [dequeue.value, ...this.BFS(updatedQueue)];
};

/**
 * @DFS (depth first search) - 깊이 우선 탐색
 * 특징
 * - 깊이보다 너비가 넓은 트리의 경우, BFS보다 적은 임시 메모리 공간을 사용함
 * - 너비는 없고 깊이만 깊은 linear한 트리의 경우, 깊게 끝까지 들어가기 까지 처리 중인 레벨 모두 메모리에 저장 되어야 한다.
 * - 모든 노드를 모두 방문하니 BFS와 시간 복잡도는 동일하다.
 */

/**
 * @전위순회 (pre order)
 * - 방문한 곳 node 값 넣기 먼저
 * [ 10, 6, 3, 8, 15, 20 ]
 * 특징
 * - 다시 이전과 동일한 트리 구조로 되돌릴 수 있다.
 */
BinarySearchTree.prototype.DFSPreOrder = function (startNode = this.root) {
  let result = [];

  function traverse(node) {
    if (!node) return;

    result.push(node.value);

    if (node.left) {
      traverse(node.left);
    }
    if (node.right) {
      traverse(node.right);
    }
  }

  traverse(startNode);

  return result;
};
BinarySearchTree.prototype.DFSPreOrder = function (start = this.root) {
  let result = [];

  if (!start) return result;

  result.push(start.value);
  if (start.left) {
    result = [...result, ...this.DFSPreOrder(start.left)];
  }
  if (start.right) {
    result = [...result, ...this.DFSPreOrder(start.right)];
  }

  return result;
};

/**
 * @후위순회 (post order)
 * - 방문한 곳 node 값 넣기 나중에
 * [ 3, 8, 6, 20, 15, 10 ]
 */
BinarySearchTree.prototype.DFSPostOrder = function () {
  let result = [];

  function traverse(node) {
    if (!node) return;

    if (node.left) {
      traverse(node.left);
    }
    if (node.right) {
      traverse(node.right);
    }
    result.push(node.value);
  }
  traverse(this.root);

  return result;
};

/**
 * @중위순회 (in order)
 * - 방문한 곳 node 값 넣기 중간에
 * [ 3, 6, 8, 10, 15, 20 ]
 * 특징
 * - 이진 탐색 트리에서 오름차순으로 정렬된 배열을 얻는다.
 */
BinarySearchTree.prototype.DFSInOrder = function () {
  let result = [];

  function traverse(node) {
    if (!node) return;

    if (node.left) {
      traverse(node.left);
    }
    result.push(node.value);
    if (node.right) {
      traverse(node.right);
    }
  }

  traverse(this.root);

  return result;
};

/**
 * @DFS - stack으로 구현
 *
 */
console.log(tree.BFS());
console.log(tree.DFSPreOrder());
console.log(tree.DFSPostOrder());
console.log(tree.DFSInOrder());
