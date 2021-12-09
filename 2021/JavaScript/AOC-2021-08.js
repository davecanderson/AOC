const year = "2021";
const day = "08";

var LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");
const args = process.argv.slice(2);

const testData  = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;
const testDataP1 = { input: testData, answer: 26 };
const testDataP2 = { input: testData, answer: 61229 };

const num1 = '  c  f '; // len = 2 *
const num7 = 'a c  f '; // len = 3 *
const num4 = ' bcd f '; // len = 4 *
const num2 = 'a cde g'; // len = 5 : only without f
const num3 = 'a cd fg'; // len = 5 : only len 5 with all num1
const num5 = 'ab d fg'; // len = 5 : last len 5 
const num6 = 'ab defg'; // len = 6 : only len 6 without num1
const num0 = 'abc efg'; // len = 6 : last len 6
const num9 = 'abcd fg'; // len = 6 : only len 6 with all num4
const num8 = 'abcdefg'; // len = 7 *

const parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((i) => i.split('|').map((s) => s.trim().split(' ')));
};

const getNumber = function(input) {
  let signal = input[0].map((s) => s.split('').sort()),
      reading = input[1].map((s) => s.split('').sort().join('')),
      numbers = {},
      one = [], 
      four = [];

  signal.forEach((s) => {
    switch(s.length) {
      case 2:
        numbers[s.join('')] = 1;
        one = s;
        break;
      case 3:
        numbers[s.join('')] = 7;
        break;
      case 4:
        numbers[s.join('')] = 4;
        four = s;
        break;
      case 7:
        numbers[s.join('')] = 8;
        break;
    } 
  });
  
  let counts = signal.flat().reduce((a,c) => { a[c] = a[c] || 0; ++a[c]; return a }, {});
  let mostCommon = Object.keys(counts).filter((k) => counts[k] === 9)[0];

  signal.filter((k) => k.length === 5 || k.length === 6).forEach((chars) => {
    let num = chars.join('');
    if(!chars.includes(mostCommon)) {
      numbers[num] = 2;
    }
    if(one.every((c) => chars.includes(c)) && chars.length === 5) {
      numbers[num] = 3;
    }
    if(!one.every((c) => chars.includes(c)) && chars.length === 6) {
      numbers[num] = 6;
    }
    if(four.every((c) => chars.includes(c)) && chars.length === 6) {
      numbers[num] = 9;
    }
  });

  console.assert(Object.keys(numbers).length === 8, "Failed to match 2, 3, 6 or 9")

  let five = signal.filter((s) => s.length === 5 && !Object.keys(numbers).includes(s.join('')));
  console.assert(five.length === 1, `Multiple matches for 5 ${five}`)
  numbers[five[0].join('')] = 5;

  let zero = signal.filter((s) => s.length === 6 && !Object.keys(numbers).includes(s.join('')));
  console.assert(zero.length === 1, `Multiple matches for 0 ${zero}`)
  numbers[zero[0].join('')] = 0;

  let output = parseInt(reading.map((d) => numbers[d]).join(''));

  return output;
}

const solvePart1 = function (data) {
  return data.map((d) => d[1].filter((c) => c.length === 2 ||c.length === 3 ||c.length === 4 ||c.length === 7 )).flat().length;
};

const solvePart2 = function (data) {
  let result = [];
  data.forEach((d) => {
    result.push(getNumber(d));
  });
  console.log(result);
  return result.reduce((a,c) => a + c);
};

const testPart1 = function (data, answer) {
  var result = solvePart1(data);
  console.assert(result === answer, `Part 1 Answer ${result} is not ${answer}`);
};

const testPart2 = function (data, answer) {
  var number = getNumber(parseInput('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf')[0]);
  console.assert(number === 5353, `Part 2 Number ${number} is not 5353`);

  var number = getNumber(parseInput('bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef')[0]);
  console.assert(number === 1625, `Part 2 Number ${number} is not 1625`);

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