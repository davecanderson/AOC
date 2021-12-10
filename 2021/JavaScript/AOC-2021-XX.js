let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('xx', '2021');

solver.testData.P1 = { input: "", answer: "" };
solver.testData.P2 = { input: "", answer: "" };

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((i) => parseInt(i));
};

solver.solvePart1 = function (data) {
  return "";
};

solver.solvePart2 = function (data) {
  return "";
};

aoc.run(solver);