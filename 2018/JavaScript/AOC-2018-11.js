// https://adventofcode.com/2018/day/11;

var parseInput = function(input) {
  input = testInput;
  return input.trim().split(',').map(i => parseInt(i));
}

function cell(x, y, serial) {
    var id = x + 10; level = id * y;
    level += serial;
    level = level * id;
    level = (level/100).toString().split('.')[0].slice(-1);
    level -= 5;            
    return level;
}

var solvePart1 = function(serial) {
    var grid = createGrid(serial), max = { power: Number.NEGATIVE_INFINITY };
    for(var y = 0; y < 298; y++) {
        for(var x = 0; x < 298; x++) {
            var power = totalPower(x,y,grid);
            if(power > max.power) {
                max = { power, x, y };
            }
        }
    }

    // coords not index
    max.x++;
    max.y++;

    console.log('Largest %s,%s with %i total', max.x, max.y, max.power); 

    return max.x + ',' + max.y;
}

var solvePart2 = function(serial) {
    var grid = createGrid(serial), max = { power: Number.NEGATIVE_INFINITY };

    for(var y = 0; y < 299; y++) {
        for(var x = 0; x < 299; x++) {
            var cellMax = maxPower(x,y,grid);
            if(cellMax.power > max.power) {
                max = cellMax;
            }
        }
    }

    // coords not index
    max.x++;
    max.y++;

    console.log('Largest %s,%s,%s with %i total', max.x, max.y, max.s, max.power); 

    return max.x + ',' + max.y + ',' + max.s;
}


var createGrid = function(serial) {
    var grid = [];
    for(var y = 1; y <= 300; y++) {
        var row = [];
        for(var x = 1; x <= 300; x++) {
            row.push(cell(x,y,serial));
        }
        grid.push(row);
    }
    return grid;
}

var totalPower = function(x,y,grid) {
    try {
      var power = 0;
      for(var sy = 0; sy < 3 && y+sy < 300; sy++) {
        for(var sx = 0; sx < 3 && x+sx < 300; sx++) {
            power += grid[y+sy][x+sx];
        }
      }
      return power;
    } catch {
      console.log('Missing %s,%s', x, y);
    }
}

var maxPower = function(x,y,grid) {
    var power = grid[y][x], s = 1; max = { power: Number.NEGATIVE_INFINITY };
    while(s < 300 && x+s < 300 && y+s < 300) {
        if(power && power > max.power) {
            max = { power, x, y, s };
        }
        power += grid[y+s][x+s]; // add new corner
        for(var sx = 0; sx < s; sx++) {
            power += grid[y+s][x+sx]; // add row
        }
        for(var sy = 0; sy < s; sy++) {
            power += grid[y+sy][x+s]; // add column
        }
        s++;        
    }
    return max;
}

console.assert(cell(3,5,8) == 4);
console.assert(cell(122,79,57) == -5);
console.assert(cell(217,196,39) == 0);
console.assert(cell(101,153,71) == 4);

console.assert(solvePart1(18) == '33,45');
console.assert(solvePart1(42) == '21,61');

console.log(solvePart1(7347));

console.assert(solvePart2(18) == '90,269,16');
console.assert(solvePart2(42) == '232,251,12');

console.log(solvePart2(7347));