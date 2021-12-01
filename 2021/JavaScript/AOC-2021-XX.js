const year = "2021";
const day = "01";

var LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");
const args = process.argv.slice(2);

const testDataP1 = { input: "", answer: "" };
const testDataP2 = { input: "", answer: "" };

const parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((i) => parseInt(i));
};

const solvePart1 = function (data) {
  return "";
};

const solvePart2 = function (data) {
  return "";
};

const testPart1 = function (data, answer) {
  var result = solvePart1(data);
  console.assert(result === answer, `Part 1 Answer ${result} is not ${answer}`);
};

const testPart2 = function (data, answer) {
  var result = solvePart2(data);
  console.assert(result === answer, `Part 2 Answer ${result} is not ${answer}`);
};

const test = function () {  
  if (args.includes("-p1")) {
    testPart1(parseInput(testDataP1.input), testDataP1.answer);
  }
  if (args.includes("-p2")) {
    testPart2(parseInput(testDataP2.input), testDataP2.answer);
  }
};

const solve = function () {
  const path = `${year}-${day}-input.txt`;
  const data = parseInput(localStorage[path]);

  if (args.includes("-p1")) {
    console.log("Part 1 Answer: %s", solvePart1(data));
  }

  if (args.includes("-p2")) {
    console.log("Part 2 Answer: %s", solvePart2(data));
  }
};

console.log(`AoC ${year}/${day}`);

if (args.includes("-test")) {
  test();
} else {
  solve();
}