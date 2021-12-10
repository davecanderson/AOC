let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('05', '2021');

const testData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

solver.testData.P1 = { input: testData, answer: 5 };
solver.testData.P2 = { input: testData, answer: 12 };

const getLine = function(plot) {
  var match = plot.match(/(\d+),(\d+)\s->\s(\d+),(\d+)/);
  return {
    x1: parseInt(match[1]),
    y1: parseInt(match[2]),
    x2: parseInt(match[3]),
    y2: parseInt(match[4]),
  }
}

const getCoordsPart1 = function(line) {
  var coords = [];
  if(line.x1 === line.x2) {
    let yMax = Math.max(line.y1, line.y2),
        yMin = Math.min(line.y1, line.y2);
    for(let y = yMin; y <= yMax; y++) {
      coords.push([line.x1,y]);
    }
  }
  if(line.y1 === line.y2) {
    let xMax = Math.max(line.x1, line.x2),
        xMin = Math.min(line.x1, line.x2);
    for(let x = xMin; x <= xMax; x++) {
      coords.push([x,line.y1]);
    }
  }
  return coords;
}

const getCoordsPart2 = function(line) {
  if(line.x1 === line.x2 || line.y1 === line.y2) {
    return getCoordsPart1(line);
  } else {
    let coords = [],
        xMax = Math.max(line.x1, line.x2),
        xMin = Math.min(line.x1, line.x2),
        yMax = Math.max(line.y1, line.y2),
        yMin = Math.min(line.y1, line.y2),
        count = xMax-xMin;
        
    for(let n = 0; n <= count; n++) {
      let x, y;
      if(xMax === line.x1) x = xMax - n;
      if(xMax === line.x2) x = xMin + n;
      if(yMax === line.y1) y = yMax - n;
      if(yMax === line.y2) y = yMin + n;
      coords.push([x,y]);
    }

    return coords;
  }
}

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((l) => getLine(l));
};

solver.solvePart1 = function (data) {
  var coords = {}, 
      plot = data.map((d) => getCoordsPart1(d)).flat();
      
  plot.forEach((d) => {
    let s = `${d[0]}-${d[1]}`;
    coords[s] = coords[s] || 0;
    coords[s]++;
  });

  return Object.keys(coords).filter((k) => coords[k] > 1).length;
};

solver.solvePart2 = function (data) {
  var coords = {}, 
      plot = data.map((d) => getCoordsPart2(d)).flat();

  plot.forEach((d) => {
    let s = `${d[0]}-${d[1]}`;
    coords[s] = coords[s] || 0;
    coords[s]++;
  });

  return Object.keys(coords).filter((k) => coords[k] > 1).length;
};

aoc.run(solver);