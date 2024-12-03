import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage("./scratch");
const args = process.argv.slice(2);

export class Solver {
  #day;
  #year;
  #parseInputP1;
  #parseInputP2;

  constructor(day, year) {
    this.#day = day;
    this.#year = year;
  }

  test = {
    p1: { input: "", answer: 0 },
    p2: { input: "", answer: 0 },
  };

  get parseInputPart1() {
    return this.#parseInputP1 || this.parseInput;
  }
  set parseInputPart1(parse) {
    this.#parseInputP1 = parse;
  }
  get parseInputPart2() {
    return this.#parseInputP2 || this.parseInput;
  }
  set parseInputPart2(parse) {
    this.#parseInputP2 = parse;
  }

  get title() {
    return `AoC ${this.#year} Day ${this.#day}`;
  }

  get path() {
    return `${this.#year}-${this.#day}-input.txt`;
  }

  parseInputLine = function (s) {
    return parseInt(s);
  };

  parseInput = function (input) {
    return input
      .trim()
      .split("\n")
      .map((s) => this.parseInputLine(s.trim()));
  };

  solvePart1 = function (data) {
    return 0;
  };

  solvePart2 = function (data) {
    return 0;
  };
}

const testPart1 = function (solver) {
  const data = solver.parseInputPart1(solver.test.p1.input),
        result = solver.solvePart1(data);

  if (result === solver.test.p1.answer) {
    console.log(`${solver.title} Part 1 Answer: ${result}`);
  } else {
    console.warn(`${solver.title} Part 1 test expected ${solver.test.p1.answer} but got ${result}`);
  }
};

const testPart2 = function (solver) {
  const data = solver.parseInputPart2(solver.test.p2.input),
        result = solver.solvePart2(data);

  if (result === solver.test.p2.answer) {
    console.log(`${solver.title} Part 2 Answer: ${result}`);
  } else {
    console.warn(`${solver.title} Part 2 test expected ${solver.test.p2.answer} but got ${result}`);
  }
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
  if (args.includes("-p1")) {
    const data = solver.parseInputPart1(localStorage[solver.path]);
    console.log(`${solver.title} Part 1 Answer: ${solver.solvePart1(data)}`);
  }
  if (args.includes("-p2")) {
    const data = solver.parseInputPart2(localStorage[solver.path]);
    console.log(`${solver.title} Part 2 Answer: ${solver.solvePart2(data)}`);
  }
};

export const run = function (solver) {
  if (solver instanceof Solver) {
    if (args.includes("-test")) {
      test(solver);
    } else {
      solve(solver);
    }
  } else {
    console.error("AoC Solver required!");
  }
};
