const year = "2021";
const day = "09";

var LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");
const args = process.argv.slice(2);

const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const testDataP1 = { input: testData, answer: 15 };
const testDataP2 = { input: testData, answer: 1134 };

const parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((r) => r.trim().split('').map((i) => parseInt(i)));
};

const getBasinSize = function(pos, data, basin) {
  let key = `${pos.i}-${pos.j}`;
  if(!basin.includes(key) && data[pos.i] && !isNaN(data[pos.i][pos.j])) {
    if(data[pos.i][pos.j] === 9) return 0;
    basin.push(key);
    return 1 
    + getBasinSize({ i: pos.i - 1, j: pos.j }, data, basin)
    + getBasinSize({ i: pos.i + 1, j: pos.j }, data, basin)
    + getBasinSize({ i: pos.i, j: pos.j - 1 }, data, basin)
    + getBasinSize({ i: pos.i, j: pos.j + 1 }, data, basin)
  }
  return 0;
}

const solvePart1 = function (data) {
  let low = [];
  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
      let height = data[i][j],
          up = (data[i-1]||[])[j],
          down = (data[i+1]||[])[j],
          left = data[i][j-1],
          right = data[i][j+1];
      if(
        (height < up || isNaN(up)) && 
        (height < down || isNaN(down)) && 
        (height < left || isNaN(left)) && 
        (height < right || isNaN(right))
      ){
          low.push(height);
      }
    }
  }
  return low.map((h) => h+1).reduce((a,c) => a + c, 0);
};

const solvePart2 = function (data) {
  let low = [];
  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
      let height = data[i][j],
          up = (data[i-1]||[])[j],
          down = (data[i+1]||[])[j],
          left = data[i][j-1],
          right = data[i][j+1];
      if(
        (height < up || isNaN(up)) && 
        (height < down || isNaN(down)) && 
        (height < left || isNaN(left)) && 
        (height < right || isNaN(right))
      ){
          low.push({i,j});
      }
    }
  }
  return low.map((pos) => getBasinSize(pos, data, [])).sort((a,b) => b - a).slice(0,3).reduce((a,c) => a * c, 1);
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