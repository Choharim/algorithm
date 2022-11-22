/**
 * @문제 - 두 정점을 받아 둘 사이의 최단 경로를 반환하는 함수를 작성해라
 * ['Idris','Kamil','Lina']
 */

class WeightedGraph {
  constructor() {
    this.hash = {};
  }

  addVertex(vertex) {
    if (!this.hash[vertex]) this.hash[vertex] = [];
  }

  addEdge(start, end, weight) {
    this.addVertex(start);

    this.hash[start].push({ name: end, weight });
  }

  dijkstra(start, end) {
    let previous = {};
    let shortest = {};
    let visited = {};
    let PQ = new PriorityQueue();

    for (const vertex in this.hash) {
      previous[vertex] = null;
      shortest[vertex] = start === vertex ? 0 : Infinity;
      PQ.enqueue(vertex, start === vertex ? 0 : Infinity);
    }

    let current;
    while (1) {
      current = PQ.dequeue()?.name;

      if (!current || current === end) break;

      visited[current] = true;

      for (const { name, weight } of this.hash[current]) {
        if (visited[name]) continue;

        const newWeight = shortest[current] + weight;
        if (shortest[name] > newWeight) {
          previous[name] = current;
          shortest[name] = newWeight;
          PQ.enqueue(name, newWeight);
        }
      }
    }

    let target = end;
    let path = target;
    while (previous[target]) {
      target = previous[target];
      path = `${target} -> ${path}`;
    }
    return `${path} (${shortest[end]})`;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(name, weight) {
    this.values.push({ name, weight });

    this.values.sort((a, b) => a.weight - b.weight);
  }

  dequeue() {
    return this.values.shift();
  }
}

let weightedGraph = new WeightedGraph();
weightedGraph.addEdge("Idris", "Kamil", 1);
weightedGraph.addEdge("Idris", "Talia", 1);
weightedGraph.addEdge("Talia", "Ken", 2);
weightedGraph.addEdge("Ken", "Marco", 3);
weightedGraph.addEdge("Marco", "Sasha", 4);
weightedGraph.addEdge("Sasha", "Lina", 5);
weightedGraph.addVertex("Lina");
weightedGraph.addEdge("Kamil", "Lina", 2);

console.log(weightedGraph.dijkstra("Idris", "Lina"));
