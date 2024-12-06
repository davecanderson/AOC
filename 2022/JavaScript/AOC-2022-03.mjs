import { Solver, run } from '../../2024/JavaScript/AOC-2024.mjs';

const solver = new Solver('03', '2022');
const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

solver.test.p1.input = input;
solver.test.p1.answer = 157;
solver.test.p2.input = input;
solver.test.p2.answer = 70;

solver.parseInputLine = function (s) {
  const cut = s.length / 2;
  return [s.slice(0, cut).split(''), s.slice(-cut).split('')];
};

solver.solvePart1 = function (data) {
  let sum = 0;
  let priority = data.map(sacs => {
    const c = sacs[0].filter(e => sacs[1].includes(e));
    const i = c[0].charCodeAt(0);
    return i > 90 ? i - 96 : i - 38;
  });
  priority.forEach(element => {
    sum += element;
  });
  return sum;
};

solver.solvePart2 = function (data) {
  let groups = [], sum = 0;
  for(let i = 0; i < data.length; i = i +3) {
    groups.push([
      data[i][0].concat(data[i][1]),
      data[i+1][0].concat(data[i+1][1]),
      data[i+2][0].concat(data[i+2][1])
    ]);  
  }
  let priority = groups.map(sacs => {
    const c = sacs[0].filter(e => sacs[1].includes(e) && sacs[2].includes(e));
    const i = c[0].charCodeAt(0);
    return i > 90 ? i - 96 : i - 38;
  });
  priority.forEach(element => {
    sum += element;
  });
  return sum;
};

run(solver);