import { Solver, run } from './AOC-2024.mjs';

const solver = new Solver('06', '2024');
const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

solver.test.p1.input = input;
solver.test.p1.answer = 41;
solver.test.p2.input = input;
solver.test.p2.answer = 6;

solver.parseInputLine = function (s) {
  return s.split('');
};

const walkRoute = function(data) {
  const guard = {}, route = [], obstacles = [], max_i = data.length, max_j = data[0].length;
  const UP = 1, DOWN = 2, LEFT = 4, RIGHT = 8;

  let inLoop = false;

  data.forEach((l,i) => {
    route[i] = [];
    l.forEach((c,j) => {
      if(c == '^') {
        guard.i = i;
        guard.j = j;
        guard.facing = '^';
      }
      if(c == '#') {
        obstacles.push(`${i}-${j}`);
      }
    })
  });

  do {
    let i = guard.i, j = guard.j;
      
    switch (guard.facing) {
      case '^':
        if(route[i][j] & UP) {
          inLoop = true;
          continue;
        }
        route[i][j] |= UP;
        i--;
        break;
      case 'v':
        if(route[i][j] & DOWN) {
          inLoop = true;
          continue;
        }
        route[i][j] |= DOWN;
        i++;
        break;
      case '>':
        if(route[i][j] & RIGHT) {
          inLoop = true;
          continue;
        }
        route[i][j] |= RIGHT;
        j++;
        break;
      case '<':
        if(route[i][j] & LEFT) {
          inLoop = true;
          continue;
        }
        route[i][j] |= LEFT;
        j--;
        break;
    }
    
    if(obstacles.includes(`${i}-${j}`)) {
      switch (guard.facing) {
        case '^':
          guard.facing = '>';
          break;
        case 'v':
          guard.facing = '<';
          break;
        case '>':
          guard.facing = 'v';
          break;
        case '<':
          guard.facing = '^';
          break;
      }
    }
    else {
      guard.i = i;
      guard.j = j;
    }

  } while(!inLoop && 0 <= guard.i && guard.i < max_i && 0 <= guard.j && guard.j < max_j)

  return inLoop ? [] : route;
}

solver.solvePart1 = function (data) {
  return walkRoute(data).flat().filter(c => c).length;
};

solver.solvePart2 = function (data) {
  const route = walkRoute(JSON.parse(JSON.stringify(data))), addObstacles = [];

  route.forEach((l,i) => {
    l.forEach((c,j) => {
      if(c) {
        addObstacles.push({i,j});
      }
    })
  });

  let loops = 0;
  addObstacles.forEach(o => {
    const d = JSON.parse(JSON.stringify(data));
    d[o.i][o.j] = '#';
    const r = walkRoute(d);
    if(r.length == 0) loops++;
  })

  return loops;
};

run(solver);