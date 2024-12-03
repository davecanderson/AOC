let aoc = require("./AOC-2022.js");

let solver = new aoc.Solver("01", "2022");
let input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

solver.testData.P1 = { input: input, answer: 24000 };
solver.testData.P2 = { input: input, answer: 45000 };

solver.parseInput = function (input) {
  const data = input
    .trim()
    .split("\n")
    .map((i) => parseInt(i));

  const elves = [[]];
  let elf = 0;
  data.forEach((d) => {
    if (isNaN(d)) {
      elves.push([]);
      elf++;
    } else {
      elves[elf].push(d);
    }
  });
  return elves;
};

solver.solvePart1 = function (elves) {
  return elves
    .map((e) => e.reduce((a, c) => a + c, 0))
    .sort((a, b) => b - a)[0];
};

solver.solvePart2 = function (elves) {
  return elves
    .map((e) => e.reduce((a, c) => a + c, 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, c) => a + c, 0);
};

aoc.run(solver);
