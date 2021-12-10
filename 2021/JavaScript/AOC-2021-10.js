let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('10', '2021');

const testData = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

solver.testData.P1 = { input: testData, answer: 26397 };
solver.testData.P2 = { input: testData, answer: 288957 };

solver.parseInput = function (input) {
  return input
    .trim()
    .split("\n");
};

solver.solvePart1 = function (data) {
  let re = /(\(\)|\[\]|{}|<>)/;
  let score = 0;
  data.forEach((s) => {
    let line = s;
    while(re.test(line)) {
      line = line.replace(re,'');
    }
    let round = line.indexOf(')');
    let square = line.indexOf(']');
    let curly = line.indexOf('}');
    let angle = line.indexOf('>');
    if(round >= 0 && (square < 0 || round < square) && (curly < 0 || round < curly) && (angle < 0 || round < angle)) score += 3;
    if(square >= 0 && (round < 0 ||square < round) && (curly < 0 || square < curly) && (angle < 0 || square < angle)) score += 57;
    if(curly >= 0 && (square < 0 || curly < square) && (round < 0 || curly < round) && (angle < 0 || curly < angle)) score += 1197;
    if(angle >= 0 && (square < 0 || angle < square) && (curly < 0 || angle < curly) && (round < 0 || angle < round)) score += 25137;
  })
  return score;
};

solver.solvePart2 = function (data) {
  let re = /(\(\)|\[\]|{}|<>)/;
  let score = [];

  let incomplete = data.filter((s) => {
    let line = s;
    while(re.test(line)) {
      line = line.replace(re,'');
    }
    let round = line.indexOf(')');
    let square = line.indexOf(']');
    let curly = line.indexOf('}');
    let angle = line.indexOf('>');
    return round < 0 && square < 0 && curly < 0 && angle < 0;
  });

  console.log(incomplete);

  incomplete.forEach((s) => {
    let seq = s.split(''), close = [], complete = [];
    for(let i = seq.length -1;i>=0;i--) {
      if(/(\)|\]|}|>)/.test(seq[i])) {
        close.unshift(seq[i]);
      } else {
        if(
          (seq[i] === '(' && close[0] === ')') ||
          (seq[i] === '[' && close[0] === ']') ||
          (seq[i] === '{' && close[0] === '}') ||
          (seq[i] === '<' && close[0] === '>')
        ) {
          close.shift();
        } else {
          if(seq[i] === '(') complete.push(')');
          if(seq[i] === '[') complete.push(']');
          if(seq[i] === '{') complete.push('}');
          if(seq[i] === '<') complete.push('>');
        } 
      }
    }

    console.log(complete.join(''));

    score.push(complete.map((s) => {
      if(s === ')') return 1;
      if(s === ']') return 2;
      if(s === '}') return 3;
      if(s === '>') return 4;
    }).reduce((a,c) => a*5 + c, 0));
  });

  return score.sort((a,b) => a - b)[Math.ceil(score.length/2)-1];
};

aoc.run(solver);