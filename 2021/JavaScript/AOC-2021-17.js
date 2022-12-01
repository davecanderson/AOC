let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('17', '2021');

solver.testData.P1 = { input: "target area: x=20..30, y=-10..-5", answer: "" };
solver.testData.P2 = { input: "", answer: "" };

solver.parseInput = function (input) {
  let xMatch = input.match(/x=([-\d]+)\.\.([-\d]+)/);
  let x = [xMatch[1], xMatch[2]].map((s) => parseInt(s));
  let yMatch = input.match(/y=([-\d]+)\.\.([-\d]+)/);
  let y = [yMatch[1], yMatch[2]].map((s) => parseInt(s));

  return {
    x: { min: Math.min(x[0], x[1]), max: Math.max(x[0], x[1]) },
    y: { min: Math.min(y[0], y[1]), max: Math.max(y[0], y[1]) }
  }
};

const beyondTarget = (coord, target) => {
  return coord.y <= target.y.min;
}

const inTarget = (coord, target) => {
  return coord.x >= target.x.min
    && coord.x <= target.x.max
    && coord.y >= target.y.min
    && coord.y <= target.y.max;
}

const plot = (start, velocity, target) => {
  let pos = start;
  while(!beyondTarget(pos, target) || inTarget(pos, target)) {
    pos.x += velocity.x;
    pos.y += velocity.y;
    velocity.x += velocity.x > 0 ? -1 : velocity.x < 0 ? 1 : 0;
    velocity.y--;
  }
  return inTarget(pos, target);
}

solver.solvePart1 = function (data) {
  let start = { x: 0, y: 0 };
  
  console.assert(plot(start, {x: 7, y: 2}, data));
  console.assert(plot(start, {x: 6, y: 3}, data));
  console.assert(plot(start, {x: 9, y: 0}, data));
};

solver.solvePart2 = function (data) {
  return "";
};

aoc.run(solver);