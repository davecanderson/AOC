let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('09', '2021');

const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`;

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

solver.testData.P1 = { input: testData, answer: 15 };
solver.testData.P2 = { input: testData, answer: 1134 };

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((r) => r.trim().split('').map((i) => parseInt(i)));
};

solver.solvePart1 = function (data) {
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

solver.solvePart2 = function (data) {
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

aoc.run(solver);