import { Solver, run } from './AOC-2024.mjs';

const solver = new Solver('xx', '2024');
const input = ``;

solver.test.p1.input = input;
solver.test.p1.answer = 0;
solver.test.p2.input = input;
solver.test.p2.answer = 0;

solver.parseInputLine = function (s) {
  return parseInt(s);
};

solver.solvePart1 = function (data) {
  return 0;
};

solver.solvePart2 = function (data) {
  return 0;
};

run(solver);