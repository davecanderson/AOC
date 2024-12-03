import { Solver, run } from './AOC-2024.mjs';

const solver = new Solver('03', '2024');

solver.test.p1.input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
solver.test.p1.answer = 161;

solver.test.p2.input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
solver.test.p2.answer = 48;

const regex = /mul\((\d+?),(\d+?)\)/g;
const ignore = /don\'t\(\).*?do\(\)/g;

solver.parseInputPart1 = function (s) {
  return [...s.matchAll(regex)];
};

solver.parseInputPart2 = function (s) {
  s = s.split('\n').join('');
  s = s.replaceAll(ignore, '')
  return [...s.matchAll(regex)];
};

solver.solvePart1 = function (data) {
  let total = 0;
  data.forEach(m => {    
    total += parseInt(m[1]) * parseInt(m[2]);
  });
  return total;
};

solver.solvePart2 = solver.solvePart1;

run(solver);