var path = '/2018/day/13/input';

/*
  test input needs to have backslash escaped
  and needs to start without line break as 
  using trim() breaks puzzle input as spaces
  are significant.
*/

var testInput1 = `|
v
|
|
|
^
|`;

var testInput2 = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/`;

var turns = ['L','S','R'];

var parseInput = function(input) {
  // using trim removes required spaces!
  var track = input.split('\n').map(l => l.split('')),
      cars = [];
  for(var y = 0; y < track.length; y++) {
        for(var x = 0; x < track[y].length; x++) {
            var t = track[y][x];
            if(t == '') continue;
            if(/[v^<>]/.test(t)) {
                cars.push({ x, y, direction: t, turn: 0 });
                switch(t) {
                    case 'v':
                    case '^':
                        track[y][x] = '|';
                        break;
                    case '<':
                    case '>':
                        track[y][x] = '-';
                        break;
                }
            }
        }
    }
    return { track, cars }
}

var print = function(data) {
  var track = ''
  for(var y = 0; y < data.track.length; y++) {
    for(var x = 0; x < data.track[y].length; x++) {
       var car = data.cars.filter(c => c.x == x && c.y == y);
       track += car.length ? car[0].direction : data.track[y][x];
    }
    track += '\n';
  }
  console.debug(track);
}

var trainTrack = function(data) {
    var move = function(car) {
        switch(car.direction) {
            case 'v':
                return moveCar(car, car.x, car.y+1);
            case '^':
                return moveCar(car, car.x, car.y-1);
            case '<':
                return moveCar(car, car.x-1, car.y);
            case '>':
                return moveCar(car, car.x+1, car.y);
        }
    }

    var moveCar = function(car, x, y) {
        var t = data.track[y][x];
        if(data.cars.some(c => c.x == x && c.y == y)) {
            return { x, y } 
        }
        switch(t) {
            case '\\':
                turnCar(car, '\\'+car.direction);
                break;
            case '/':
                turnCar(car, '/'+car.direction);
                break;
            case '+':
                turnCar(car, '+'+turns[car.turn]+car.direction);
                car.turn = (car.turn+1)%turns.length;
                break;
        }

        car.x = x;
        car.y = y;
                
        return null; // no crash
    }

    var turnCar = function(car, turn) {
        switch(turn) {
            case '+L^':
                car.direction = '<';
                break;
            case '+Lv':
                car.direction = '>';
                break;
            case '+L>':
                car.direction = '^';
                break;
            case '+L<':
                car.direction = 'v';
                break;
            case '+S^':
            case '+Sv':
            case '+S>':
            case '+S<':
                break;
            case '+R^':
                car.direction = '>';
                break;
            case '+Rv':
                car.direction = '<';
                break;
            case '+R>':
                car.direction = 'v';
                break;
            case '+R<':
                car.direction = '^';
                break;
            case '\\^':
                car.direction = '<';
                break;
            case '\\v':
                car.direction = '>';
                break;
            case '\\>':
                car.direction = 'v';
                break;
            case '\\<':
                car.direction = '^';
                break;
            case '/^':
                car.direction = '>';
                break;
            case '/v':
                car.direction = '<';
                break;
            case '/>':
                car.direction = '^';
                break;
            case '/<':
                car.direction = 'v';
                break;
            default:
                console.error('Unknown turn %s for %O', turn, car);
        } 
    }

    return {
        move: move
    }
}

var solvePart1 = function(data) {

    var track = trainTrack(data), crash, maxIterations = 200, iterations = 0;

    while(!crash && iterations < maxIterations) {      
        //print(data);
        for(var c = 0; c < data.cars.length; c++) {
            crash = track.move(data.cars[c]);
            if(crash) break;
        }
        data.cars = data.cars.sort((a,b) => a.y == b.y ? a.x - b.x : a.y - b.y); 
        iterations++;
    }

    console.debug('crash %O detected after %i iterations', crash, iterations);

    return crash ? crash.x + ',' + crash.y : 'not found';
}

var solvePart2 = function(data) {
   var track = trainTrack(data), maxIterations = 20000, iteration = 0;

    while(data.cars.length > 1 && iteration < maxIterations) {
        var crashes = [];      
        for(var c = 0; c < data.cars.length; c++) {
            var crash = track.move(data.cars[c]);
            if(crash) {
              crashes.push(data.cars[c]);
              data.cars.filter(c => c.x == crash.x && c.y == crash.y).forEach(c => crashes.push(c));
            }
        }
        if(crashes.length) {
          console.debug('[%i] %i cars, %i crashes', iteration, data.cars.length, crashes.length);
        }
        data.cars = data.cars.filter(c => !crashes.includes(c));
        data.cars = data.cars.sort((a,b) => a.y == b.y ? a.x - b.x : a.y - b.y); 
        iteration++;
    }

    return data.cars.length > 1 ? 'not found' : data.cars[0].x + ',' + data.cars[0].y
}

var solve = function(input) {
  console.assert(solvePart1(parseInput(testInput1)) == '0,3');
  console.assert(solvePart1(parseInput(testInput2)) == '7,3');

  console.log('Part 1 Answer: %s', solvePart1(parseInput(input)));
  console.log('Part 2 Answer: %s', solvePart2(parseInput(input)));
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
