let aoc = require("./AOC-2023.js");

let solver = new aoc.Solver("04", "2023");
let input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

solver.testData.P1 = { input: input, answer: 13 };
solver.testData.P2 = { input: input, answer: 30 };

solver.parseInput = function (input) {
  let reCard = /^Card\s+(?<id>\d+):(?<winners>.*?)\|(?<numbers>.*)$/;
  return input
    .trim()
    .split("\n")
    .map((l) => {
      const data = reCard.exec(l.trim());
      const winners = data.groups["winners"]
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n));
      const numbers = data.groups["numbers"]
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n));
      return {
        id: parseInt(data.groups["id"]),
        count: 1,
        winners: winners,
        numbers: numbers,
        winning: numbers.filter((n) => winners.includes(n)).length,
      };
    });
};

solver.solvePart1 = function (data) {
  let total = 0;
  data.forEach((d) => {
    if (d.winning) total += Math.pow(2, d.winning - 1);
  });
  return total;
};

solver.solvePart2 = function (data) {
  data.forEach((d,i) => {
    if (d.winning) {
        for(let j = 1; j <= d.winning; j++) {
            data[i + j].count += d.count;
        }
    }
  });
  return data.reduce((a, c) => a + c.count, 0);
};

aoc.run(solver);
