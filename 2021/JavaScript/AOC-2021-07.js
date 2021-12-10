let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('07', '2021');

const factorial = function (n) {
  if(n) {
    return n + factorial(n-1);
  }
  return n;
}

solver.testData.P1 = { input: "16,1,2,0,4,2,7,1,2,14", answer: 37 };
solver.testData.P2 = { input: "16,1,2,0,4,2,7,1,2,14", answer: 168 };

solver.parseInput = function (input) {
  return input
    .trim()
    .split(",")
    .map((i) => parseInt(i));
};

solver.solvePart1 = function (data) {
  var min = Math.min(...data),
      max = Math.max(...data),
      minFuel = Infinity;

  for(let f = min; f <= max; f++) {
    minFuel = Math.min(minFuel, data.map((d) => Math.abs(d - f)).reduce((a,c) => a + c, 0));
  }

  return minFuel;
};

solver.solvePart2 = function (data) {
  var min = Math.min(...data),
      max = Math.max(...data),
      minFuel = Infinity;

  for(let f = min; f <= max; f++) {
    minFuel = Math.min(minFuel, data.map((d) => factorial(Math.abs(d - f))).reduce((a,c) => a + c, 0));
  }

  return minFuel;
};

aoc.run(solver);