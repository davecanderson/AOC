let aoc = require("./AOC-2023.js");

let solver = new aoc.Solver("02", "2023");
let input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

solver.testData.P1 = {
  input: input,
  answer: 8,
};
solver.testData.P2 = {
  input: input,
  answer: 2286,
};

solver.parseInput = function (input) {
  let reGame = /^Game (?<id>\d+):(?<sets>.*)/;
  let reCubes = /(?<count>\d+) (?<color>(red|green|blue))/;
  return input
    .trim()
    .split("\n")
    .map((l) => {
      const data = reGame.exec(l.trim());
      return {
        id: parseInt(data.groups["id"]),
        sets: data.groups["sets"]
          .trim()
          .split(";")
          .map((s) =>
            s
              .trim()
              .split(",")
              .map((c) => reCubes.exec(c))
              .map((c) => {
                return {
                  color: c.groups["color"],
                  count: parseInt(c.groups["count"]),
                };
              })
          ),
      };
    });
};

solver.solvePart1 = function (data) {
  const max = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let total = 0;
  data.forEach((d) => {
    if (
      d.sets.every((s) => {
        return s.every((c) => c.count <= max[c.color]);
      })
    )
      total += d.id;
  });
  return total;
};

solver.solvePart2 = function (data) {
  let total = 0;
  data.forEach((d) => {
    const max = {
      red: 0,
      green: 0,
      blue: 0,
    };
    d.sets.forEach((s) => {
      s.forEach((c) => {
        max[c.color] = Math.max(max[c.color], c.count);
      });
    });
    total += max.red * max.green * max.blue;
  });
  return total;
};

aoc.run(solver);
