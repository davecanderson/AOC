let aoc = require("./AOC-2023.js");

let solver = new aoc.Solver("01", "2023");

solver.testData.P1 = {
  input: `1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`,
  answer: 142,
};
solver.testData.P2 = {
  input: `two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`,
  answer: 281,
};

const regexNumber =
  /(1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine)/;

const strToNum = function (s) {
  return s
    .replaceAll("one", "1")
    .replaceAll("two", "2")
    .replaceAll("three", "3")
    .replaceAll("four", "4")
    .replaceAll("five", "5")
    .replaceAll("six", "6")
    .replaceAll("seven", "7")
    .replaceAll("eight", "8")
    .replaceAll("nine", "9");
};

const tokenize = function (s) {
  let start = "";
  let end = "";
  let i = 0;
  const len = s.length;

  while (!regexNumber.test(start) || !regexNumber.test(end)) {
    if (!regexNumber.test(start)) start = start + s[i];

    if (!regexNumber.test(end)) end = s[len - i - 1] + end;

    i++;
  }

  return strToNum(start) + strToNum(end);
};

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((l) =>
      tokenize(l.trim())
        .split("")
        .map((i) => parseInt(i))
        .filter((i) => !isNaN(i))
    )
    .map((n) => n[0] * 10 + n[Math.max(0, n.length - 1)]);
};

solver.solvePart1 = function (data) {
  return data.reduce((a, c) => a + c, 0);
};

solver.solvePart2 = function (data) {
  return data.reduce((a, c) => a + c, 0);
};

aoc.run(solver);
