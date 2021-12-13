let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('11', '2021');

const testData = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const stepsP1 = 100;
const stepsP2 = 1000;

solver.testData.P1 = { input: testData, answer: 1656 };
solver.testData.P2 = { input: testData, answer: 195 };

const Octopus = function (energy) {
  let _energy = energy;
  let _adjacent = [];
  return {
    step: function () {
      ++_energy;
      if(_energy === 10) {
        _adjacent.forEach((o) => o.step());
      }
    },
    addOctopus: function (o) {
      _adjacent.push(o);
    },
    flash: function () {
      if(_energy > 9) {
        _energy = 0;
        return true;
      }
      return false;
    }
  }
}

solver.parseInput = function (input) {
  var data = input
    .trim()
    .split("\n")
    .map((s) => s.split('').map((i) => new Octopus(i)));

    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j ++) {
        if(i > 0) data[i][j].addOctopus(data[i-1][j]);
        if(i < 9) data[i][j].addOctopus(data[i+1][j]);        
        if(j > 0) data[i][j].addOctopus(data[i][j-1]);
        if(j < 9) data[i][j].addOctopus(data[i][j+1]);
        if(i > 0 && j > 0) data[i][j].addOctopus(data[i-1][j-1]);
        if(i > 0 && j < 9) data[i][j].addOctopus(data[i-1][j+1]);
        if(i < 9 && j < 9) data[i][j].addOctopus(data[i+1][j+1]);
        if(i < 9 && j > 0) data[i][j].addOctopus(data[i+1][j-1]);
      }
    }

    return data;
};

solver.solvePart1 = function (data) {
  let flashes = 0;
  for(let s = 1; s <= stepsP1; s++) {
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j ++) {
        data[i][j].step();
      }
    }
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j ++) {
        flashes += data[i][j].flash();
      }
    }
  }
  return flashes;
};

solver.solvePart2 = function (data) {
  let step = 1;
  for(let s = 1; s <= stepsP2; s++) {
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j ++) {
        data[i][j].step();
      }
    }
    let flashes = 0;
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j ++) {
        flashes += data[i][j].flash();
      }
    }
    if(flashes === 100) {
      step = s;
      break;
    }
  }
  return step;
};

aoc.run(solver);