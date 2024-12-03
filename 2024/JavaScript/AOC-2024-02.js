let aoc = require('./AOC-2024.js');

let solver = new aoc.Solver('02', '2024');

const input =  `7 6 4 2 1
                1 2 7 8 9
                9 7 6 2 1
                1 3 2 4 5
                8 6 4 4 1
                1 3 6 7 9`;

solver.testData.P1 = { 
  input: input, 
  answer: 2
};
solver.testData.P2 = { 
  input: input, 
  answer: 4 
};

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((s) => s.trim().split(/\s+/).map(i => parseInt(i)));
};

const asc = [1,2,3];
const desc = [-1,-2,-3];

let isSafe = function(levels) {
  let l = [];
  for(let i = 1; i < levels.length; i++) {
    l.push(levels[i-1] - levels[i]);
  }

  return l.every(d => asc.includes(d)) 
      || l.every(d => desc.includes(d));
}

let isSafeAllowingOne = function(levels) {
  if(isSafe(levels)) return true; 
  const len = levels.length;
  for(let i = 0; i < len; i++) {
    let end = i - len + 1;
    let omitOne = levels.slice(0, i);
    if(end < 0) omitOne = omitOne.concat(levels.slice(end));
    if(isSafe(omitOne)) return true;
  }
  return false;
}

solver.solvePart1 = function (data) {
  data.forEach(l => {
    console.log('%s %s', isSafe(l), l.join(' '));
  });
  return data.filter(isSafe).length;
};

solver.solvePart2 = function (data) {
  data.forEach(l => {
    console.log('%s %s', isSafeAllowingOne(l), l.join(' '));
  });
  return data.filter(isSafeAllowingOne).length;
};

aoc.run(solver);