import { Solver, run } from '../../2024/JavaScript/AOC-2024.mjs';

const solver = new Solver('04', '2022');
const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

solver.test.p1.input = input;
solver.test.p1.answer = 2;
solver.test.p2.input = input;
solver.test.p2.answer = 4;

solver.parseInputLine = function (s) {
  return s.split(',').map(p => p.split('-').map(i => parseInt(i)));
};

solver.solvePart1 = function (data) {
  let overlaps = data.filter(p => (p[0][0] <= p[1][0] && p[0][1] >= p[1][1]) || (p[0][0] >= p[1][0] && p[0][1] <= p[1][1]));  
  return overlaps.length;
};

solver.solvePart2 = function (data) {
  let overlaps = data.filter(p => (p[0][0] <= p[1][0] && p[1][0] <= p[0][1]) || (p[0][0] <= p[1][1] && p[1][1] <= p[0][1]));
  console.log(overlaps.map(o => `${o[0][0]}-${o[0][1]},${o[1][0]}-${o[1][1]}`).join('\n'));
  return overlaps.length;
};

run(solver);