/**
 * @다익스트라 알고리즘
 * 두 정점 사이 최단 경로 찾기
 */

/**
 * ex)
 * A -> E 최단 경로 구하기
 * 시작 vertex: A
 * visited: 방문한 vertex 집단
 * distance: 시작 vertex부터 각 vertex까지 최단 거리 (계속 업데이트 됨)
 * previous : 각 지점 distance 업데이트 했을 때 경로의 직전 vertex
 * 1. distance에서 가장 작은 값을 갖고, 여태 방문한 적 없는 vertex에 들린다. (가장 작은 값을 찾기 위해 우선 순위 큐를 사용한다.)
 *    visited에 추가
 * 2. 해당 vertex의 인접 vertex 중 visieted에 속해있지 않은 인접 vertex의 시작 vertex ~ 해당 vertex ~ 인접 vertex 경로 합이 작으면
 *     distance 업데이트 하고, previous도 업데이트 한다.
 * 3. 반복한다.
 *
 */

/**
 * 최소 값을 갖는 vertex를 찾기 위한 우선 순위 큐
 */
class PriorityQueue1 {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });

    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

/**
 * @우선순위큐 - 이진 힙 사용하여 성능 개선
 */
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });

    this.bubbleUp();
  }

  bubbleUp() {
    let parentIndex;
    let index = this.values.length - 1;
    while (index > 0) {
      parentIndex = Math.floor((index - 1) / 2);

      if (this.values[parentIndex].priority <= this.values[index].priority)
        break;

      [this.values[parentIndex], this.values[index]] = [
        this.values[index],
        this.values[parentIndex],
      ];
      index = parentIndex;
    }
  }

  dequeue() {
    const firstPriority = this.values[0];

    const end = this.values.pop();

    if (!this.values.length) return firstPriority;

    this.values[0] = end;

    this.bubbleDown();

    return firstPriority;
  }

  bubbleDown() {
    let index = 0;
    let leftChildIndex;
    let rightChildIndex;

    while (1) {
      leftChildIndex = 2 * index + 1;
      rightChildIndex = leftChildIndex + 1;

      if (leftChildIndex >= this.values.length) return;

      if (
        this.values[index].priority <= this.values[leftChildIndex].priority &&
        this.values[index].priority <=
          (this.values[rightChildIndex]?.priority ?? Infinity)
      )
        return;

      let swapIndex;
      if (
        this.values[leftChildIndex].priority <
        (this.values[rightChildIndex]?.priority ?? Infinity)
      ) {
        swapIndex = leftChildIndex;
      } else {
        swapIndex = rightChildIndex;
      }

      [this.values[swapIndex], this.values[index]] = [
        this.values[index],
        this.values[swapIndex],
      ];

      index = swapIndex;
    }
  }
}

class WeightedGraph {
  constructor() {
    this.adjacentList = {
      A: [
        { node: "B", weight: 4 },
        { node: "C", weight: 2 },
      ],
      B: [
        { node: "A", weight: 4 },
        { node: "E", weight: 3 },
      ],
      C: [
        { node: "A", weight: 2 },
        { node: "D", weight: 2 },
        { node: "F", weight: 4 },
      ],
      D: [
        { node: "C", weight: 2 },
        { node: "E", weight: 3 },
        { node: "F", weight: 1 },
      ],
      E: [
        { node: "B", weight: 3 },
        { node: "D", weight: 3 },
        { node: "F", weight: 1 },
      ],
      F: [
        { node: "C", weight: 4 },
        { node: "D", weight: 1 },
        { node: "E", weight: 1 },
      ],
    };
  }

  addVertex(vertex) {
    if (!this.adjacentList[vertex]) {
      this.adjacentList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, weight) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.adjacentList[vertex1].push({ node: vertex2, weight });
    this.adjacentList[vertex2].push({ node: vertex1, weight });
  }

  /**
   * priority queue 사용하지 않고, 원리만 생각해서 작성한 코드
   * 결과값: A -> C -> D -> F -> E (6)
   */
  dijkstra1(start, end) {
    let visited = [];
    const vertexs = Object.keys(this.adjacentList);
    let distance = Object.assign(
      {},
      ...vertexs.map((key) => ({
        [key]: start === key ? 0 : Infinity,
      }))
    );
    let previous = Object.assign(
      {},
      ...vertexs.map((key) => ({ [key]: null }))
    );

    let current = start;
    와일: while (visited.length < vertexs.length) {
      visited.push(current);

      for (const { node: adjacentVertex, weight } of this.adjacentList[
        current
      ]) {
        if (visited.find((v) => v === adjacentVertex)) continue;

        const path = distance[current] + weight;
        if (distance[adjacentVertex] > path) {
          distance[adjacentVertex] = path;
          previous[adjacentVertex] = current;
        }
      }

      let shortest = { vertex: null, distance: Infinity };
      for (const key in distance) {
        if (visited.find((v) => v === key)) continue;

        if (shortest.distance > distance[key]) {
          shortest = { vertex: key, distance: distance[key] };
        }
      }

      if (shortest.distance === Infinity) break 와일;
      current = shortest.vertex;
    }

    let target = end;
    let result = target;

    while (1) {
      result = `${previous[target]} -> ${result}`;
      target = previous[target];
      if (target === start) break;
    }

    return `${result} (${distance[end]})`;
  }

  /**
   * @다익스트라 알고리즘
   */
  dijkstra(start, end) {
    const nodes = new PriorityQueue();
    let distance = {};
    let previous = {};

    for (const vertex in this.adjacentList) {
      distance[vertex] = start === vertex ? 0 : Infinity;
      previous[vertex] = null;
      nodes.enqueue(vertex, start === vertex ? 0 : Infinity);
    }

    let shortest;

    while (nodes.values.length) {
      shortest = nodes.dequeue()?.val;

      if (!shortest || shortest === end) break;

      for (const { node, weight } of this.adjacentList[shortest]) {
        if (!nodes.values.find((v) => v.val === node)) continue;

        const path = distance[shortest] + weight;
        if (distance[node] > path) {
          previous[node] = shortest;
          distance[node] = path;
          nodes.enqueue(node, path);
        }
      }
    }

    let target = end;
    let result = target;

    while (1) {
      result = `${previous[target]} -> ${result}`;
      target = previous[target];
      if (target === start) break;
    }

    return `${result} (${distance[end]})`;
  }
}

let weightedGraph = new WeightedGraph();
console.log(weightedGraph.dijkstra1("A", "E"));
console.log(weightedGraph.dijkstra("A", "E"));
