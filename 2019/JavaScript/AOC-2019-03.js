(function() {
'use strict'

const site = 'https://adventofcode.com';
const year = '2019';
const day = '3';
const path = `${year}/day/${day}/input`;
const url = `${site}/${path}`;

const testInputA = `
R8,U5,L5,D3
U7,R6,D4,L4
`;

const testInputB = `
R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83
`;

const testInputC = `
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7
`;

const parseInput = function(input) {
  return input.trim().split('\n').map(l => l.split(',').map(w => { return { dir: w.charAt(0), len: parseInt(w.substring(1)) } }));
} 

const getEnd = function(wire) {
  switch(wire.dir) {
      case 'U':
        wire.end = {
          y: wire.start.y + wire.len,
          x: wire.start.x
        };
        break
      case 'D':
        wire.end = {
          y: wire.start.y - wire.len,
          x: wire.start.x
        };
        break;
      case 'L':
        wire.end = {
          y: wire.start.y,
          x: wire.start.x - wire.len
        };
        break;  
      case 'R':
        wire.end = {
          y: wire.start.y,
          x: wire.start.x + wire.len
        };
        break;
    }
}

const getWire = function(input) {
  var wire = {
        start: { x: 0, y: 0 },
        dir: input[0].dir,
        len: input[0].len,
        steps: 0
      };
    
  for(var i = 1; i < input.length; i++) {
    getEnd(wire);
    wire.next = {
        dir: input[i].dir,
        len: input[i].len,
        steps: wire.steps + wire.len,
        start: wire.end,
        prev: wire
    };
    wire = wire.next;
  }

  getEnd(wire);

  while(wire.prev) wire = wire.prev;
  
  return wire;
}

const isIntersecting = function(w1, w2) {
    switch(w1.dir)
    {
      case 'U':
      case 'D':
        if(/[LR]/.test(w2.dir)) {
          var x = w1.start.x, y = w2.start.y,
              minX = Math.min(w2.start.x, w2.end.x),
              maxX = Math.max(w2.start.x, w2.end.x),
              minY = Math.min(w1.start.y, w1.end.y),
              maxY = Math.max(w1.start.y, w1.end.y);

          return minX < x && x < maxX && minY < y && y < maxY;
        }
      case 'L':
      case 'R':
        if(/[UD]/.test(w2.dir)) {
          var x = w2.start.x, y = w1.start.y,
              minX = Math.min(w1.start.x, w1.end.x),
              maxX = Math.max(w1.start.x, w1.end.x),
              minY = Math.min(w2.start.y, w2.end.y),
              maxY = Math.max(w2.start.y, w2.end.y);

          return minX < x && x < maxX && minY < y && y < maxY;
        }
    }
    return false;
}

const getIntersects = function(w1, w2) {
  var intersects = [], a = w1, b = w2;
  do {
    do {      
      if(isIntersecting(a, b)) {
        var pos = { steps: a.steps + b.steps };
        if(/[UD]/.test(a.dir)) {
          pos.x = a.start.x;
        }
        if(/[UD]/.test(b.dir)) {
          pos.x = b.start.x;
        }
        if(/[LR]/.test(a.dir)) {
          pos.y = a.start.y;
        }
        if(/[LR]/.test(b.dir)) {
          pos.y = b.start.y;
        }

        if(/[UD]/.test(a.dir)) {
          pos.steps += Math.abs(pos.y - a.start.y);
        }
        if(/[UD]/.test(b.dir)) {
          pos.steps += Math.abs(pos.y - b.start.y);
        }
        if(/[LR]/.test(a.dir)) {
          pos.steps += Math.abs(pos.x - a.start.x);
        }
        if(/[LR]/.test(b.dir)) {
          pos.steps += Math.abs(pos.x - b.start.x);
        }
        
        intersects.push(pos);
      }
      b = b.next;
    } while (b);
    a = a.next;
    b = w2;
  } while (a);

  return intersects.map(i => { return { x: i.x, y: i.y, dist: Math.abs(i.x) + Math.abs(i.y), steps: i.steps } });
}

const getIntersectDist = function(input) {
  var data = parseInput(input),
      wireA = getWire(data[0]),
      wireB = getWire(data[1]),
      intersects = getIntersects(wireA, wireB); 

  console.debug(intersects);

  return intersects.reduce((a,c) => a = a.dist < c.dist ? a : c).dist;
}

const getIntersectSteps = function(input) {
  var data = parseInput(input),
      wireA = getWire(data[0]),
      wireB = getWire(data[1]),
      intersects = getIntersects(wireA, wireB); 

  console.debug(intersects);

  return intersects.reduce((a,c) => a = a.steps < c.steps ? a : c).steps;
}

const solvePart1 = function(data) {
  return getIntersectDist(data);
}

const solvePart2 = function(data) {   
   return getIntersectSteps(data);
}

const solve = function(input) {
  var data = localStorage[path];  
  console.log('%s Day %s Part 1 Answer: %s', year, day, solvePart1(data));
  console.log('%s Day %s Part 2 Answer: %s', year, day, solvePart2(data));
}

const testPart1 = function() {
  console.assert(getIntersectDist(testInputA) === 6);
  console.assert(getIntersectDist(testInputB) === 159);
  console.assert(getIntersectDist(testInputC) === 135);
}

const testPart2 = function() {
  console.assert(getIntersectSteps(testInputA) === 30);
  console.assert(getIntersectSteps(testInputB) === 610);
  console.assert(getIntersectSteps(testInputC) === 410);
}

const test = function () {
  testPart1();
  testPart2();
}

const run = function() {
  if(!localStorage[path]) {
    fetch(url)
      .then(res => res.text())
      .then(txt => {
          localStorage.setItem(path, txt);
          solve(localStorage[path]);
      });
  } else {
    solve(localStorage[path]);
  }
}

clear();
test();
run();

})();