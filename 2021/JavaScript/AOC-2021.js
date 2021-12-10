let LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");
const args = process.argv.slice(2);

class Solver {
  year;
  day;

  testData = {
    P1: { input: "", answer: "" },
    P2: { input: "", answer: "" }
  };

  constructor(day, year) {
    this.day = day;
    this.year = year;
  }

  parseInput = function (input) {
    return input
      .trim()
      .split("\n")
      .map((i) => parseInt(i));
  };
  
  solvePart1 = function (data) {
    return "";
  };
  
  solvePart2 = function (data) {
    return "";
  };
}

const testPart1 = function (solver) {
  var data = solver.parseInput(solver.testData.P1.input),
      result = solver.solvePart1(data);
  console.assert(result === solver.testData.P1.answer, `Part 1 Answer ${result} is not ${solver.testData.P1.answer}`);
};

const testPart2 = function (solver) {
  var data = solver.parseInput(solver.testData.P2.input),
      result = solver.solvePart2(data);
  console.assert(result === solver.testData.P2.answer, `Part 2 Answer ${result} is not ${solver.testData.P2.answer}`);
};

const test = function (solver) {  
  if (args.includes("-p1")) {
    testPart1(solver);
  }
  if (args.includes("-p2")) {
    testPart2(solver);
  }
};

const solve = function (solver) {
  const path = `${solver.year}-${solver.day}-input.txt`;
  const data = solver.parseInput(localStorage[path]);

  if (args.includes("-p1")) {
    console.log("Part 1 Answer: %s", solver.solvePart1(data));
  }

  if (args.includes("-p2")) {
    console.log("Part 2 Answer: %s", solver.solvePart2(data));
  }
};

const run = function(solver) {
  if(solver instanceof Solver) {
    console.log(`AoC ${solver.year}/${solver.day}`);

    if (args.includes("-test")) {
      test(solver);
    } else {
      solve(solver);
    }
  } else {
    console.error("AoC Solver required!")
  }
}

module.exports.run = run;
module.exports.Solver = Solver;