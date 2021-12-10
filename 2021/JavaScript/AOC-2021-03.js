let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('03', '2021');

const testData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

solver.testData.P1 = { input: testData, answer: 198 };
solver.testData.P2 = { input: testData, answer: 230 };

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((l) => l.trim().split('').map((i) => parseInt(i)));
};

solver.solvePart1 = function (data) {
  var len = data[0].length, gamma = '', epsilon = '';
  for(var i = 0; i < len; i++) {
     var digits = data.map((d) => d[i]);
     if(digits.filter((d) => d).length > digits.filter((d) => !d).length) {
       gamma += '1';
       epsilon += '0';
     } else {
      gamma += '0';
      epsilon += '1';
     }
  }
  return parseInt(gamma,2) * parseInt(epsilon,2);
};

solver.solvePart2 = function (data) {
  var len = data[0].length, oxygen = { criteria: data }, co2 = { criteria: data };
  for(var i = 0; i < len; i++) {
    oxygen.digits = oxygen.criteria.map((d) => d[i]);
    oxygen.bit = oxygen.digits.filter((d) => d).length >= oxygen.digits.filter((d) => !d).length ? 1 : 0;
    if(oxygen.criteria.length > 1) {
      oxygen.criteria = oxygen.criteria.filter((c) => c[i] === oxygen.bit);
    }

    co2.digits = co2.criteria.map((d) => d[i]);
    co2.bit = co2.digits.filter((d) => d).length >= co2.digits.filter((d) => !d).length ? 0 : 1;
    if(co2.criteria.length > 1) {
      co2.criteria = co2.criteria.filter((c) => c[i] === co2.bit);
    }
  }
  return parseInt(oxygen.criteria[0].join(''),2) * parseInt(co2.criteria[0].join(''),2);
};

aoc.run(solver);