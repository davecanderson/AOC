let aoc = require("./AOC-2023.js");

let solver = new aoc.Solver("03", "2023");
let input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

solver.testData.P1 = {
  input: input,
  answer: 4361,
};
solver.testData.P2 = {
  input: input,
  answer: 467835,
};

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((s) => s.trim());
};

solver.solvePart1 = function (data) {
  let total = [];
  let checkIsPart = function (i, j) {
    var p = [];
    if (data[i - 1]) {
      p.push(data[i - 1][j - 1]);
      p.push(data[i - 1][j]);
      p.push(data[i - 1][j + 1]);
    }
    p.push(data[i][j + 1]);
    p.push(data[i][j - 1]);
    if (data[i + 1]) {
      p.push(data[i + 1][j - 1]);
      p.push(data[i + 1][j]);
      p.push(data[i + 1][j + 1]);
    }
    return p.some((c) => c && /[^\d\.]/.test(c));
  };
  data.forEach((l, i) => {
    let isPart = false;
    let num = "";
    l.split("").forEach((c, j) => {
      if (/\d/.test(c)) {
        num += c;
        isPart = isPart || checkIsPart(i, j);
      }
      if (/[^\d]/.test(l[j + 1])) {
        if (num != "" && isPart) total.push(parseInt(num));
        num = "";
        isPart = false;
      }
    });
  });
  return total.reduce((a, c) => a + c, 0);
};

solver.solvePart2 = function (data) {
  let gears = [];
  let checkIsGear = function (i, j) {
    if (data[i - 1]) {
      if (data[i - 1][j - 1] == "*") return { i: i - 1, j: j - 1 };
      if (data[i - 1][j] == "*") return { i: i - 1, j: j };
      if (data[i - 1][j + 1] == "*") return { i: i - 1, j: j + 1 };
    }
    if (data[i][j + 1] == "*") return { i: i, j: j + 1 };
    if (data[i][j - 1] == "*") return { i: i, j: j - 1 };
    if (data[i + 1]) {
      if (data[i + 1][j - 1] == "*") return { i: i + 1, j: j - 1 };
      if (data[i + 1][j] == "*") return { i: i + 1, j: j };
      if (data[i + 1][j + 1] == "*") return { i: i + 1, j: j + 1 };
    }
  };
  data.forEach((l, i) => {
    let isGear = null;
    let num = "";
    l.split("").forEach((c, j) => {
      if (/\d/.test(c)) {
        num += c;
        isGear = isGear || checkIsGear(i, j);
      }
      if (/[^\d]/.test(l[j + 1])) {
        if (num != "" && isGear) {
          const key = isGear.i + "_" + isGear.j;
          gears[key] = gears[key] || [];
          gears[key].push(parseInt(num));
        }
        num = "";
        isGear = null;
      }
    });
  });
  return Object.keys(gears)
    .filter((k) => gears[k].length == 2)
    .reduce((a, c) => a + gears[c][0] * gears[c][1], 0);
};

aoc.run(solver);
