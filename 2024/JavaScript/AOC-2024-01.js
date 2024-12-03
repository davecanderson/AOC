let aoc = require('./AOC-2024.js');

let solver = new aoc.Solver('01', '2024');
const input = `3   4
          4   3
          2   5
          1   3
          3   9
          3   3`;

solver.testData.P1 = { 
  input: input, 
  answer: 11
};
solver.testData.P2 = { 
  input: input, 
  answer: 31 
};

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((s) => { 
      let p = s.trim().split(/\s+/);
      return [parseInt(p[0]),parseInt(p[1])]
    });
};

solver.solvePart1 = function (data) {
  let l = [], r = [], d = 0;
  data.forEach(e => {
    l.push(e[0]);
    r.push(e[1]);
  });
  l.sort();
  r.sort();
  l.forEach((e,i) => {
    d += Math.abs(e - r[i]);
  })
  return d;
};

solver.solvePart2 = function (data) {
  let l = [], r = [], s = 0;
  data.forEach(e => {
    l.push(e[0]);
    r.push(e[1]);
  });
  l.forEach((e) => {
    s += e * r.filter(f => f == e).length;
  })
  return s;
};

aoc.run(solver);