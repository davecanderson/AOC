const year = "2021";
const day = "06";

var LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");
const args = process.argv.slice(2);

const testDataP1 = { input: "3,4,3,1,2", answer: 5934 };
const testDataP2 = { input: "3,4,3,1,2", answer: 26984457539 };

const DAYS_P1 = 80;
const DAYS_P2 = 256;

const parseInput = function (input) {
  return input
    .trim()
    .split(",")
    .map((i) => parseInt(i));
};

const solvePart1 = function (data) {
  for(let day = DAYS_P1; day > 0; day--) {
    var fish = data;
    data.forEach((d,i) => {
      switch(d) {
        case 0:
          fish[i] = 6;
          fish.push(8);
          break;
        default:
          fish[i]--;
      }
    });
    data = fish;
  }
  return data.length;
};

const solvePart2 = function (data) {
  var fish = {};
      fish[0] = 0; 
      fish[1] = 0; 
      fish[2] = 0; 
      fish[3] = 0; 
      fish[4] = 0; 
      fish[5] = 0; 
      fish[6] = 0; 
      fish[7] = 0; 
      fish[8] = 0;

  data.forEach((d) => fish[d]++);

  for(let day = DAYS_P2; day > 0; day--) {
     var newfish = {}; 
     newfish[0] = fish[1]; 
     newfish[1] = fish[2]; 
     newfish[2] = fish[3]; 
     newfish[3] = fish[4]; 
     newfish[4] = fish[5]; 
     newfish[5] = fish[6]; 
     newfish[6] = fish[7] + fish[0]; 
     newfish[7] = fish[8]; 
     newfish[8] = fish[0];
     fish = newfish;
  }

  return fish[0]+ fish[1]+ fish[2]+ fish[3]+ fish[4]+ fish[5]+ fish[6]+ fish[7]+ fish[8];
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