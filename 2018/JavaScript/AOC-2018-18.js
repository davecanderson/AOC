var path = '/2018/day/18/input';

var testInput = `
.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.
`;

var parseInput = function(input) {
  //input = testInput;
  var _yard = input.trim().split('\n').map(i => i.split(''));

  function print() {
    var p = '';
    _yard.forEach(y => { p += y.join(''); p += '\n'; });
    return p;
  }

  function acre(x,y) {
    var yU = _yard[y-1] || ['','',''],
        yD = _yard[y+1] || ['','',''],
        xL = _yard[y][x-1] || '',
        xR = _yard[y][x+1] || '',
        yUL = xL ? yU[x-1] || '' : '',
        yUR = xR ? yU[x+1] || '' : '',
        yDL = xL ? yD[x-1] || '' : '',
        yDR = xR ? yD[x+1] || '' : '',
        adjacent = yUL + yU[x] + yUR + xL + xR + yDL + yD[x] + yDR;

    return {
        acre: _yard[y][x],
        adjacent,
        trees: adjacent.replace(/[^|]/g,'').length,
        open: adjacent.replace(/[^\.]/g,'').length,
        lumber: adjacent.replace(/[^#]/g,'').length
    }
  }

  function next(x,y) {
    var a = acre(x,y);
    switch(a.acre) {
        case '.':
            if(a.trees > 2) return '|';
            break;
        case '|':
            if(a.lumber > 2) return '#';
            break;
        case '#':
            if(a.lumber > 0 && a.trees > 0) return '#';
            return '.';        
    }
    return a.acre;
  }

  return {
    get yard() { return yard; },
    print,
    run: function(minutes) {
        var p = print(), scores = {};
        for(var minute = 0; minute < minutes; minute++) {
            var yard = Array.from({ length: this.size.y }, y => new Array(this.size.x));
            for(var y = 0; y < this.size.y; y++) {
                for(var x = 0; x < this.size.x; x++) {
                    yard[y][x] = next(x,y);
                } 
            }
            _yard = yard;
            if(p == (p = print())) return;
            var score = p.replace(/[^|]/g,'').length * p.replace(/[^#]/g,'').length;            
            scores[score] = scores[score] || [];
            scores[score].push(minute);            
        }
        return scores;
    },
    size: { x: _yard[0].length, y: _yard.length }
  }
}

var solvePart1 = function(data) {
    //console.debug(data.print());
    data.run(10);

    var trees = data.print().replace(/[^|]/g,'').length,
        lumber= data.print().replace(/[^#]/g,'').length;
    
    return trees * lumber;
}

var solvePart2 = function(data) {
   var scores = data.run(10000);

   console.log(scores);
   
   var trees = data.print().replace(/[^|]/g,'').length,
       lumber = data.print().replace(/[^#]/g,'').length;
    
   return trees * lumber;
}

var solve = function(input) {
  
  console.time('Part 1');
  console.log('Part 1 Answer: %s', solvePart1(parseInput(input)));
  console.timeEnd('Part 1');

  console.time('Part 2');
  console.log('Part 2 Answer: %s', solvePart2(parseInput(input)));
  console.timeEnd('Part 2');
  
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
