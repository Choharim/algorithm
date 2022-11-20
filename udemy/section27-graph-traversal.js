/**
 * @DFS - depth first search
 */

class Graph {
  constructor() {
    this.adjacentList = {
      A: ["B", "C"],
      B: ["A", "D"],
      C: ["A", "E"],
      D: ["B", "E", "F"],
      E: ["C", "D", "F"],
      F: ["D", "E"],
    };
  }

  /**
   * @방법1 - 재귀 사용
   * [ 'A', 'B', 'D', 'E', 'C', 'F' ]
   */
  recursiveDFS(start) {
    const adjacentList = this.adjacentList;
    let result = [];
    let visited = {};

    function helper(vertex) {
      if (visited[vertex] || !vertex) return;

      visited[vertex] = true;
      result.push(vertex);

      for (const v of adjacentList[vertex]) {
        helper(v);
      }
    }

    helper(start);

    return result;
  }

  /**
   * @방법2 - 반복문, stack 사용
   * [ 'A', 'C', 'E', 'F', 'D', 'B' ]
   */
  iterativeDFS(start) {
    let result = [];
    let visited = {};
    let stack = [];

    visited[start] = true;
    stack.push(start);

    let vertex;
    while (stack.length) {
      vertex = stack.pop();

      result.push(vertex);

      for (const v of this.adjacentList[vertex]) {
        if (!visited[v]) {
          visited[v] = true;
          stack.push(v);
        }
      }
    }

    return result;
  }
}
