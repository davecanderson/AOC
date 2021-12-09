const year = "2021";
const day = "07";

var LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");
const args = process.argv.slice(2);

const testDataP1 = { input: "16,1,2,0,4,2,7,1,2,14", answer: 37 };
const testDataP2 = { input: "16,1,2,0,4,2,7,1,2,14", answer: 168 };

const parseInput = function (input) {
  return input
    .trim()
    .split(",")
    .map((i) => parseInt(i));
};

const factorial = function (n) {
  if(n) {
    return n + factorial(n-1);
  }
  return n;
}

const solvePart1 = function (data) {
  var min = Math.min(...data),
      max = Math.max(...data),
      minFuel = Infinity;

  for(let f = min; f <= max; f++) {
    minFuel = Math.min(minFuel, data.map((d) => Math.abs(d - f)).reduce((a,c) => a + c, 0));
  }

  return minFuel;
};

const solvePart2 = function (data) {
  var min = Math.min(...data),
      max = Math.max(...data),
      minFuel = Infinity;

  for(let f = min; f <= max; f++) {
    minFuel = Math.min(minFuel, data.map((d) => factorial(Math.abs(d - f))).reduce((a,c) => a + c, 0));
  }

  return minFuel;
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