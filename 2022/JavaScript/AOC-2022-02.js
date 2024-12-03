let aoc = require("./AOC-2022.js");

let solver = new aoc.Solver("02", "2022");
let input = `A Y
B X
C Z`;

solver.testData.P1 = { input: input, answer: 15 };
solver.testData.P2 = { input: input, answer: 12 };

const shapeScore = {
    X: 1, // rock A
    Y: 2, // paper B
    Z: 3  // scissors C
}

const resultScore = {
    X: 0, // loose
    Y: 3, // draw
    Z: 6  // win
}

const getChoice = function (opponent, result) {
    if(result == 'X') {
        // loose
        switch(opponent) {
            case 'A': return 'Z';
            case 'B': return 'X';
            case 'C': return 'Y';
        }
    }
    if(result == 'Y') {
        // draw
        switch(opponent) {
            case 'A': return 'X';
            case 'B': return 'Y';
            case 'C': return 'Z';
        }
    }
    if(result == 'Z') {
        // win
        switch(opponent) {
            case 'A': return 'Y';
            case 'B': return 'Z';
            case 'C': return 'X';
        }
    }
}

solver.parseInput = function (input) {
  let strategy = [];
  input
    .trim()
    .split("\n")
    .forEach((l) => {
      let kvp = l.split(" ");
      strategy.push({
        opponent: kvp[0],
        choice: kvp[1],
        score: shapeScore[kvp[1]],
        win: (kvp[0] == 'A' && kvp[1] == 'Y') || (kvp[0] == 'B' && kvp[1] == 'Z') || (kvp[0] == 'C' && kvp[1] == 'X'),
        draw: (kvp[0] == 'A' && kvp[1] == 'X') || (kvp[0] == 'B' && kvp[1] == 'Y') || (kvp[0] == 'C' && kvp[1] == 'Z')
        });
    });
  return strategy;
};

solver.solvePart1 = function (strategy) {
  return strategy.reduce((a,c) => a + c.score + (c.win ? 6 : (c.draw ? 3 : 0)), 0);
};

solver.solvePart2 = function (strategy) {
  return strategy.reduce((a,c) => a + shapeScore[getChoice(c.opponent, c.choice)] + resultScore[c.choice], 0);
};

aoc.run(solver);
