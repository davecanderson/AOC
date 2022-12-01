let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('12', '2021');

let testData = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

solver.testData.P1 = { input: testData, answer: 10 };
solver.testData.P2 = { input: testData, answer: "" };

class Cave {

  name;
  connections = [];

  constructor(name) {
    this.name = name;
  }    

  get name() { return this.name; };    
  get connections () { return this.connections; };

  addConnection = function(cave) {
    if(cave instanceof Cave && !this.connections.includes(cave)) {
      this.connections.push(cave)
    }
  }
}

solver.parseInput = function (input) {
  let system = {
    start: new Cave('start'),
    end: new Cave('end'),
    getCave: function(s) {
      if(!this[s]) this[s] = new Cave(s);
      return this[s];
    }
  }

  input
    .trim()
    .split("\n")
    .forEach((s) => {
      let caves = s.split('-'),
          cave1 = system.getCave(caves[0]);
          cave2 = system.getCave(caves[1]);
      cave1.addConnection(cave2);
      cave2.addConnection(cave1);
    });

    return system;
};

const visitCaves = function(queue, visited) {
  let cave = queue.shift();
  if(/[a-z]*/.test(cave.name)) visited.push(cave);
  for(let c of cave.connections.filter((cc) => !visited.includes(cc))) {
    queue.push(c);
  }
  if(queue.length) {
    visitCaves(queue, visited);
  }
  console.log(`Visited ${cave.name}`);
}

solver.solvePart1 = function (data) {
  const queue = [data.start], visited = [];
  visitCaves(queue, visited);
  return "";
};

solver.solvePart2 = function (data) {
  return "";
};

aoc.run(solver);