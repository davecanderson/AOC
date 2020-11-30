var path = '/2018/day/17/input';

var testInput = `
x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504
`;

var parseInput = function(input) {
  //input = testInput;
  input = input.trim().split('\n');
  input = input.map(i => ({ x: /x=([\d\.]*)/.exec(i)[1], y: /y=([\d\.]*)/.exec(i)[1] }));
  
  var clay = [];

  input.forEach(i => {
    var ix = i.x.split('..'), iy = i.y.split('..');
    for(var x = parseInt(ix[0]); x <= parseInt(ix[1] || ix[0]); x++) {
        for(var y = parseInt(iy[0]); y <= parseInt(iy[1] || iy[0]); y++) {
            clay.push([x,y,0]);
        }
    }
  });

  var maxY = clay.sort((a,b) => b[1] - a[1])[0][1],
      minY = clay.sort((a,b) => a[1] - b[1])[0][1],
      maxX = clay.sort((a,b) => b[0] - a[0])[0][0],
      minX = clay.sort((a,b) => a[0] - b[0])[0][0],
      canFall = function (drop) {
        return drop.y <= maxY && !clay.some(c => c[0] === drop.x && c[1] === drop.y+1) ? 1 : 0;
      },
      canFlow = function(drop) {
        if(drop.y === maxY) return 0;
        if(canFlowLeft(drop)) {
          return -1;
        }
        if(canFlowRight(drop)) {
          return 1;
        }
        return 0;
      },
      canFlowLeft = function(drop) {
        return drop.y < maxY && drop.x > minX && !clay.some(c => c[0] === drop.x-1 && c[1] === drop.y);
      },
      canFlowRight = function(drop) {
        return drop.y < maxY && drop.x < maxX && !clay.some(c => c[0] === drop.x+1 && c[1] === drop.y);
      },
      fill = function() {
        var drop = { x: 500, y: 0 }, drip = true, flow = 0;
        while(drip && drop.y < maxY) {
          var y = drop.y, x = drop.x;
          y += canFall(drop);
          if(drop.y == y) {
            switch(flow) {
              case 0:
                flow = canFlow(drop);
                x += flow;
                break;
              case 1:
                x += canFlowRight(drop) ? 1 : 0;
                break;
              case -1:
                x += canFlowLeft(drop) ? -1 : 0;
                break;
            }
          } else {
            flow = 0;
          }
          drip = (drop.x != x || drop.y != y) && x > minX && x < maxX;
          drop.x = x;
          drop.y = y;
        }
        return drop;
      },
      flowWater = function() {
        var drop = fill();
        if((drop.x != 500 || drop.y != 0) && drop.y != maxY) {
          clay.push([drop.x,drop.y,1]);
          return true;
        }
        return false;
      },
      overflowWater = function() {
        var drops = [], drips = [];
        drips.push({ x: 500, y: 1});
        while(drips.length) {
          var drop = drips.pop();
          if(!drops.find(d => d.x == drop.x && d.y == drop.y)) {
            if(canFall(drop)) {
              drips.push({ x: drop.x, y: drop.y+1 });
            } else {
              if(canFlowLeft(drop)) drips.push({ x: drop.x-1, y: drop.y });
              if(canFlowRight(drop)) drips.push({ x: drop.x+1, y: drop.y });
            }
            drops.push(drop);
          }
        }
        return drops.filter(d => d.y <= maxY);
      };

  var print = function(flow) {
    var log = '';
    flow = flow || [];
    for(var y = 0; y <= maxY; y++) {
      for(var x = minX-1; x <= maxX+1; x++) {
         if(y == 0 && x == 500) {
          log += '+';
         } else {
          var c = clay.find(c => c[0] == x && c[1] == y);
          var f = flow.find(f => f.x == x && f.y == y);          
          log += c ? (c[2] ? '~' : '#') : (f ? '|' : '.');
         }
      }
      log += '\n';
    }
    console.debug(log);  
  }

  return { 
    clay, 
    flowWater: flowWater,
    overflowWater: overflowWater,
    print: print
  };
}

var solvePart1 = function(data) {
  //data.print();
  while(data.flowWater()) {
   //data.print();
  }
  var total = data.clay.reduce((s,c) => s += c[2], 0);
  var overflow = data.overflowWater();
  //data.print(overflow);  
  return total += overflow.length;
}

var solvePart2 = function(data) {
   
}

var solve = function(input) {
  var data = parseInput(input);
  console.log('Part 1 Answer: %s', solvePart1(data));
  //console.log('Part 2 Answer: %s', solvePart2(data));
}

if(!localStorage[path]) {
  fetch('https://adventofcode.com' + path)
    .then(res => res.text())
    .then(txt => {
        localStorage.setItem(path, txt);
        solve(txt);
    });
} else {
  solve(localStorage[path]);
}
