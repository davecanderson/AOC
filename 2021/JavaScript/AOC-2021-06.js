let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('06', '2021');

const DAYS_P1 = 80;
const DAYS_P2 = 256;

solver.testData.P1 = { input: "3,4,3,1,2", answer: 5934 };
solver.testData.P2 = { input: "3,4,3,1,2", answer: 26984457539 };

solver.parseInput = function (input) {
  return input
    .trim()
    .split(",")
    .map((i) => parseInt(i));
};

solver.solvePart1 = function (data) {
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

solver.solvePart2 = function (data) {
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

aoc.run(solver);