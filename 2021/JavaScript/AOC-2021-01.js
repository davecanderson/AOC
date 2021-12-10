let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('01', '2021');

solver.solvePart1 = function (data) {
  var depth = 0;
  for(var d = 0; d < data.length; d++) {
    if(d > 0) {
      depth += data[d-1] < data[d] ? 1 : 0;
    }
  }
  return depth;
};

solver.solvePart2 = function (data) {
  var depth = 0;
  for(var d = 0; d < data.length; d++) {
    if(d > 2) {
      depth += data[d-3] < data[d] ? 1 : 0;
    }
  }
  return depth;
};

aoc.run(solver);