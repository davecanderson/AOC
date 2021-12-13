let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('13', '2021');

const testData = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

const foldPaper = function(fold, data) {
  let foldedCoords = [];
  for(let coord of data) {
    if(fold.dir === 'x') {
      if(coord.x > fold.pos) {
        foldedCoords.push({ x: fold.pos - (coord.x - fold.pos), y: coord.y });
      } else {
        foldedCoords.push(coord);
      }
    }
    if(fold.dir === 'y') {
      if(coord.y > fold.pos) {
        foldedCoords.push({ x: coord.x, y: fold.pos - (coord.y - fold.pos) });
      } else {
        foldedCoords.push(coord);
      }
    }
  }
  var dots = foldedCoords.reduce((a,c) => { a[`${c.x}-${c.y}`] = c; return a; }, {});
  return Object.keys(dots).map((k) => dots[k]);
}

solver.testData.P1 = { input: testData, answer: 17 };
solver.testData.P2 = { input: testData, answer: "" };

solver.parseInput = function (input) {
  let lines = input
              .trim()
              .split("\n");
  let coords = lines
              .filter((s) => /\d+,\d/.test(s))
              .map((s) => { let coord = s.split(','); return { x: parseInt(coord[0].trim()), y: parseInt(coord[1].trim()) } });

  var folds = lines
              .filter((s) => /(x|y)=\d+/.test(s))
              .map((s) => { let fold = s.split('='); return { dir: fold[0].split('').pop(), pos: parseInt(fold[1].trim()) } });

  return { coords, folds };
};

solver.solvePart1 = function (data) {
  return foldPaper(data.folds.shift(), data.coords).length;
};

solver.solvePart2 = function (data) {
  for(let fold of data.folds) {
    data.coords = foldPaper(fold, data.coords);
  }

  var maxX = Math.max(...data.coords.map((c) => c.x));
  var maxY = Math.max(...data.coords.map((c) => c.y));

  let y = 0;
  while(y <= maxY) {
    let dots = data.coords.filter((c) => c.y === y).map((c) => c.x), line = '';
    for(let x = 0; x <= maxX; x++) {
      line += dots.includes(x) ? '#' : ' ';
    }
    console.log(line);
    y++;
  }

  return '[see log]';
};

aoc.run(solver);