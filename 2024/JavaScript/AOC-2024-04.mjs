import { Solver, run } from './AOC-2024.mjs';

const solver = new Solver('04', '2024');
const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

solver.test.p1.input = input;
solver.test.p1.answer = 18;
solver.test.p2.input = input;
solver.test.p2.answer = 9;

solver.parseInputLine = function (s) {
  return s.split('');
};

solver.solvePart1 = function (data) {
  const xmas = 'XMAS';
  let total = 0;
  data.forEach((l,i) => {
    l.forEach((c,j) => {
      if(c == 'X') {
        if(`${data[i][j]}${data[i][j-1]}${data[i][j-2]}${data[i][j-3]}` == xmas) total++;
        if(`${data[i][j]}${data[i][j+1]}${data[i][j+2]}${data[i][j+3]}` == xmas) total++;
        if(`${data[i][j]}${(data[i-1]||[])[j]}${(data[i-2]||[])[j]}${(data[i-3]||[])[j]}` == xmas) total++;
        if(`${data[i][j]}${(data[i+1]||[])[j]}${(data[i+2]||[])[j]}${(data[i+3]||[])[j]}` == xmas) total++;
        if(`${data[i][j]}${(data[i-1]||[])[j-1]}${(data[i-2]||[])[j-2]}${(data[i-3]||[])[j-3]}` == xmas) total++;
        if(`${data[i][j]}${(data[i+1]||[])[j+1]}${(data[i+2]||[])[j+2]}${(data[i+3]||[])[j+3]}` == xmas) total++;
        if(`${data[i][j]}${(data[i-1]||[])[j+1]}${(data[i-2]||[])[j+2]}${(data[i-3]||[])[j+3]}` == xmas) total++;
        if(`${data[i][j]}${(data[i+1]||[])[j-1]}${(data[i+2]||[])[j-2]}${(data[i+3]||[])[j-3]}` == xmas) total++;
      }
    });
  });
  return total;
};

solver.solvePart2 = function (data) {
  let total = 0;
  data.forEach((l,i) => {
    l.forEach((c,j) => {
      if(c == 'A') {
        let tl = (data[i-1]||[])[j-1],
            tr = (data[i-1]||[])[j+1],
            bl = (data[i+1]||[])[j-1],
            br = (data[i+1]||[])[j+1];
        
        if(tl == 'M' && tr == 'M' && bl == 'S' && br == 'S') total++;
        if(tl == 'S' && tr == 'S' && bl == 'M' && br == 'M') total++;
        if(tl == 'M' && tr == 'S' && bl == 'M' && br == 'S') total++;
        if(tl == 'S' && tr == 'M' && bl == 'S' && br == 'M') total++;
      }
    });
  });
  return total;
};

run(solver);