const year = "2021";
const day = "04";

var LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");
const args = process.argv.slice(2);

const testData = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const testDataP1 = { input: testData, answer: 4512 };
const testDataP2 = { input: testData, answer: 1924 };

const parseInput = function (input) {
  var lines = input
    .trim()
    .split("\n");

  var data = {
    numbers: lines[0].split(',').map((i) => parseInt(i)),
    cards: []
  };

  for(var l = 1; l < lines.length; l += 6) {
    data.cards.push( { rows:
        [
          lines[l+1].trim().replace(/\s+/g,',').split(',').map((i) => parseInt(i)),
          lines[l+2].trim().replace(/\s+/g,',').split(',').map((i) => parseInt(i)),
          lines[l+3].trim().replace(/\s+/g,',').split(',').map((i) => parseInt(i)),
          lines[l+4].trim().replace(/\s+/g,',').split(',').map((i) => parseInt(i)),
          lines[l+5].trim().replace(/\s+/g,',').split(',').map((i) => parseInt(i))
        ],        
        cols: [[],[],[],[],[]]
      }
    );
  }

  data.cards.forEach((c) => c.rows.forEach((r) => { 
    c.cols[0].push(r[0]);
    c.cols[1].push(r[1]);
    c.cols[2].push(r[2]);
    c.cols[3].push(r[3]);
    c.cols[4].push(r[4]);
  }));

  return data;
};

const getScore = function (winner) {
  let unmarked = winner.card.rows.flat().filter((n) => winner.numbers.indexOf(n) < 0);
  return unmarked.reduce((a,c) => c + a, 0) * winner.numbers.pop();
}

const solvePart1 = function (data) {
  let getWinner = function() {
    let winner, n = 5;
    while (!winner && n < data.numbers.length) {
      var numbers = data.numbers.slice(0,n);
      data.cards.forEach((c) => {
        if(
          c.rows.some((row) => row.every((n) => numbers.includes(n))) 
          ||
          c.cols.some((col) => col.every((n) => numbers.includes(n)))     
        ) winner =  {
            card: c,
            numbers: numbers
          }
      })
      n++;
    }
    return winner || {
      card: { rows: [], cols: [] },
      numbers: []
    }
  }

  let winner = getWinner();
  
  return getScore(winner);
};

const solvePart2 = function (data) {
  let getLoser = function() {
    let loser, winners = [], n = 5;
    while (!loser && n < data.numbers.length) {
      var numbers = data.numbers.slice(0,n);

      data.cards.filter((c) => !winners.includes(c)).forEach((c) => {
        if(
          c.rows.some((row) => row.every((n) => numbers.includes(n))) 
          ||
          c.cols.some((col) => col.every((n) => numbers.includes(n)))     
        ) winners.push(c);
      })

      if(data.cards.length === winners.length) {
        loser = {
          card: winners.pop(),
          numbers: numbers
        }
      }

      n++;
    }
    return loser || {
      card: { rows: [], cols: [] },
      numbers: []
    }
  }

  let loser = getLoser();
  
  return getScore(loser);
};

const testPart1 = function (data, answer) {
  var result = solvePart1(data);
  console.assert(result === answer, `Part 1 Answer ${result} is not ${answer}`);
};

const testPart2 = function (data, answer) {
  var result = solvePart2(data);
  console.assert(result === answer, `Part 2 Answer ${result} is not ${answer}`);
};

const test = function () {  
  if (args.includes("-p1")) {
    testPart1(parseInput(testDataP1.input), testDataP1.answer);
  }
  if (args.includes("-p2")) {
    testPart2(parseInput(testDataP2.input), testDataP2.answer);
  }
};

const solve = function () {
  const path = `${year}-${day}-input.txt`;
  const data = parseInput(localStorage[path]);

  if (args.includes("-p1")) {
    console.log("Part 1 Answer: %s", solvePart1(data));
  }

  if (args.includes("-p2")) {
    console.log("Part 2 Answer: %s", solvePart2(data));
  }
};

console.log(`AoC ${year}/${day}`);

if (args.includes("-test")) {
  test();
} else {
  solve();
}