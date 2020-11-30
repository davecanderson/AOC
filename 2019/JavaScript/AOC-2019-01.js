(function() {
'use strict'

const site = 'https://adventofcode.com';
const year = '2019';
const day = '1';
const path = `${year}/day/${day}/input`;
const url = `${site}/${path}`;

const testInput = `
12
14
1969
100756
`;

const parseInput = function(input) {
  return input.trim().split('\n').map(i => parseInt(i));
}

const getFuel = function(val) {
  return Math.max(0, Math.floor(val/3)-2);
}

const getFullFuel = function(val) {
    var fullFuel = getFuel(val);
    var addFuel = getFuel(fullFuel);
    while(addFuel)
    {
        fullFuel += addFuel;
        addFuel = getFuel(addFuel);
    }
    return fullFuel;
}

const solvePart1 = function(data) {
  return data.map(getFuel).reduce((a,c) => a+c);
}

const solvePart2 = function(data) {   
  return data.map(getFullFuel).reduce((a,c) => a+c);
}

const solve = function(input) {
  var data = parseInput(input || localStorage[path]);  
  console.log('%s Day %s Part 1 Answer: %s', year, day, solvePart1(data));
  console.log('%s Day %s Part 2 Answer: %s', year, day, solvePart2(data));
}

const testPart1 = function() {

  var data = parseInput(testInput);

  console.log(data);
  
  console.assert(getFuel(data[0]) === 2);
  console.assert(getFuel(data[1]) === 2);
  console.assert(getFuel(data[2]) === 654);
  console.assert(getFuel(data[3]) === 33583);

  console.log(data.map(getFuel).reduce((a,c) => a+c));
}

const testPart2 = function() {

  var data = parseInput(testInput);

  console.log(data);
  
  console.assert(getFullFuel(data[0]) === 2);
  console.assert(getFullFuel(data[1]) === 2);
  console.assert(getFullFuel(data[2]) === 966);
  console.assert(getFullFuel(data[3]) === 50346);

  console.log(data.map(getFullFuel).reduce((a,c) => a+c));
}

const test = function () {
  testPart1();
  testPart2();
}

const run = function() {
  if(!localStorage[path]) {
    fetch(url)
      .then(res => res.text())
      .then(txt => {
          localStorage.setItem(path, txt);
          solve(localStorage[path]);
      });
  } else {
    solve(localStorage[path]);
  }
}

clear();
test();
run();

})();