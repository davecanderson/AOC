const year = "2021";
const day = "03";

var LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");
const args = process.argv.slice(2);

const testData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;
const testDataP1 = { input: testData, answer: 198 };

const testDataP2 = { input: testData, answer: 230 };

const parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((l) => l.trim().split('').map((i) => parseInt(i)));
};

const solvePart1 = function (data) {
  var len = data[0].length, gamma = '', epsilon = '';
  for(var i = 0; i < len; i++) {
     var digits = data.map((d) => d[i]);
     if(digits.filter((d) => d).length > digits.filter((d) => !d).length) {
       gamma += '1';
       epsilon += '0';
     } else {
      gamma += '0';
      epsilon += '1';
     }
  }
  return parseInt(gamma,2) * parseInt(epsilon,2);
};

const solvePart2 = function (data) {
  var len = data[0].length, oxygen = { criteria: data }, co2 = { criteria: data };
  for(var i = 0; i < len; i++) {
    oxygen.digits = oxygen.criteria.map((d) => d[i]);
    oxygen.bit = oxygen.digits.filter((d) => d).length >= oxygen.digits.filter((d) => !d).length ? 1 : 0;
    if(oxygen.criteria.length > 1) {
      oxygen.criteria = oxygen.criteria.filter((c) => c[i] === oxygen.bit);
    }

    co2.digits = co2.criteria.map((d) => d[i]);
    co2.bit = co2.digits.filter((d) => d).length >= co2.digits.filter((d) => !d).length ? 0 : 1;
    if(co2.criteria.length > 1) {
      co2.criteria = co2.criteria.filter((c) => c[i] === co2.bit);
    }
  }
  return parseInt(oxygen.criteria[0].join(''),2) * parseInt(co2.criteria[0].join(''),2);
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