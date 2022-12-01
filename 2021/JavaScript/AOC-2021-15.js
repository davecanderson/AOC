let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('15', '2021');

const testData = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

solver.testData.P1 = { input: testData, answer: 40 };
solver.testData.P2 = { input: testData, answer: "" };

class Node {
  x;
  y;
  risk = 0;
  neighbours = null;

  constructor(x,y,risk) {
    this.x = x;
    this.y = y;
    this.risk = risk;
  }

  get neighbours () { return this.neighbours; };

  get key () { return `_${this.x}_${this.y}_`; };

  getNeighbours = (graph) => {
    if(!this.neighbours) {
      this.neighbours = new Set();
      let up = graph.get(`_${this.x}_${this.y-1}_`);
      let down = graph.get(`_${this.x}_${this.y+1}_`);
      let left = graph.get(`_${this.x-1}_${this.y}_`);
      let right = graph.get(`_${this.x+1}_${this.y}_`);
      if(up) this.neighbours.add(up);
      if(down) this.neighbours.add(down);
      if(left) this.neighbours.add(left);
      if(right) this.neighbours.add(right);
    }
    return this.neighbours;
  }
}

const leastRisk = (risks, visited) => {
  let leastKey = null, leastValue = null;
  for(let [key, value] of risks) {
    if(visited.has(key)) continue;
    leastKey = leastKey || key;
    leastValue = leastValue || value;
    if(value < leastValue) {
      leastKey = key;
      leastValue = value;
    }
  }
  return leastKey;
}

const findLeastRiskPath = (graph, start, end) => {
  let risks = new Map();
  let visited = new Set();
  let parents = { end: null };

  risks.set(end.key, Infinity);
  
  for(let node of start.getNeighbours(graph)) {
    risks.set(node.key, node.risk);
  }

  for(let node in start.getNeighbours(graph)) {
    parents[node.key] = start.key;
  }

  let key = leastRisk(risks, visited);

  while(key) {
    let risk = risks.get(key);
    let children = graph.get(key).getNeighbours(graph);
    for(let child of children) {
      let newRisk = risk + child.risk;
      if(!risks.has(child.key) || risks.get(child.key) > newRisk) {
        risks.set(child.key, newRisk);
        parents[child.key] = key;
      }
    }
    visited.add(key);
    key = leastRisk(risks, visited);
  }

  return risks.get(end.key);
} 

solver.parseInput = function (input) {
  var data = input
    .trim()
    .split("\n")
    .map((s) => s.trim().split('').map((i) => parseInt(i)));

  let graph = new Map();

  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
      let node = new Node(i,j,data[i][j]);
      graph.set(node.key, node);
    }
  }

  return {
    graph,
    start: graph.get('_0_0_'),
    end: graph.get(`_${data.length-1}_${data[0].length-1}_`)
  };
};

solver.solvePart1 = function (data) {
  return findLeastRiskPath(data.graph, data.start, data.end);
};

solver.solvePart2 = function (data) {
  return "";
};

aoc.run(solver);