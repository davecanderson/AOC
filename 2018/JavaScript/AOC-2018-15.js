var path = '/2018/day/15/input';

var testMove = `
#######
#E..G.#
#...#.#
#.G.#G#
#######
`;

var parseInput = function(input) {
  var cavern = [], 
      goblins = [], 
      elves = [], 
      walls = [];
  
  cavern = input.trim().split('\n').map(i => i.split(''));
  
  for(var y = 0; y < cavern.length; y++) {
    for(var x = 0; x < cavern[y].length; x++) {
        if(cavern[y][x] === 'G') goblins.push(new unit('G', x, y));
        if(cavern[y][x] === 'E') elves.push(new unit('E', x, y));
        if(cavern[y][x] === '#') walls.push({ x, y});
    }
  }

  function unit(type,x,y) {
    return {
      type,
      x,
      y,
      distanceTo: function(x,y) {
        return distanceTo({x:this.x, y:this.y}, {x, y});
      }  
    };
  }

  var print = function() {
    var p = '';
    cavern.forEach(row => p += row.join('') + '\n');
    console.debug(p);
  }

  var distanceTo = function(start,end) {
    return Math.abs(start.x-end.x)+Math.abs(start.y-end.y);
  }

  var move = function(unit, targets) {
    var moves = findMoves(unit);     
    console.debug(moves); 
  }

  var possibleMoves = function(x,y) {
    var moves = [];
    if(cavern[y+1][x] === '.') moves.push({ x: x, y: y+1 });
    if(cavern[y][x-1] === '.') moves.push({ x: x-1, y: y });
    if(cavern[y][x+1] === '.') moves.push({ x: x+1, y: y });
    if(cavern[y-1][x] === '.') moves.push({ x: x, y: y-1 });
    return moves;
  }

  var inRange = function(x,y,type) {
    var range = []
    if(/[^#\.]/.test(cavern[y][x+1])) range.push({ x: x+1, y, type: cavern[y][x+1] });
    if(/[^#\.]/.test(cavern[y][x-1])) range.push({ x: x-1, y, type: cavern[y][x-1] });
    if(/[^#\.]/.test(cavern[y+1][x])) range.push({ x, y: y+1, type: cavern[y+1][x] });
    if(/[^#\.]/.test(cavern[y-1][x])) range.push({ x, y: y-1, type: cavern[y-1][x] });
    return range.filter(r => r.type != type);
  }

  var findMoves = function(unit) {
    var queue = [], moves = [], paths = [], root = { x: unit.x, y: unit.y, distance: 0 };
    queue.push(root);

    while(queue.length) {
      var move = queue.pop(), 
          k = move.x+'-'+move.y;

      possibleMoves(move.x,move.y).forEach(m => {
        if(!moves.find(n => n == k)) {
          m.from = move;
          queue.push(m);
          var r = inRange(m.x,m.y,unit.type);
          if(r.length) {
            m.inRange = r;
            m.distance = distanceTo(root,m)
            paths.push(m);
          }
        }
      })

      moves.push(k);
    }

    return paths;
  }

  return { 
    cavern, 
    goblins, 
    elves,
    print,
    step: function() {
      move(elves[0]);
    }
  };
}

var solvePart1 = function(data) {
    data.print();
    data.step();
}

var solvePart2 = function(data) {
   
}

var solve = function(input) {
  solvePart1(parseInput(testMove));

  //var data = parseInput(input);
  //console.log('Part 1 Answer: %s', solvePart1(data));
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
