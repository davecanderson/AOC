let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('02', '2021');

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((i) => { 
      var instr = i.split(' '); return { 
        direction: instr[0], 
        distance: parseInt(instr[1]) 
      } 
    });
};

solver.solvePart1 = function (data) {
  var pos = { depth: 0, dist: 0 };
  for(var d = 0; d < data.length; d++) {
    switch(data[d].direction) {
      case "forward":
        pos.dist += data[d].distance;
        break;
      case "up":
        pos.depth -= data[d].distance;
        break;
      case "down":
        pos.depth += data[d].distance;
        break;
    }
  }
  return pos.depth * pos.dist;
};

solver.solvePart2 = function (data) {
  var pos = { depth: 0, dist: 0, aim: 0 };
  for(var d = 0; d < data.length; d++) {
    switch(data[d].direction) {
      case "forward":
        pos.dist += data[d].distance;
        pos.depth += pos.aim * data[d].distance;
        break;
      case "up":
        pos.aim -= data[d].distance;
        break;
      case "down":
        pos.aim += data[d].distance;
        break;
    }
  }
  return pos.depth * pos.dist;
};

aoc.run(solver);