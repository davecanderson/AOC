(function() {
'use strict'

const site = 'https://adventofcode.com';
const year = '2019';
const day = '6';
const path = `${year}/day/${day}/input`;
const url = `${site}/${path}`;

const testInput = ``;

const parseInput = function(input) {
  return input.trim().split('\n').map(i => parseInt(i));
}

const solvePart1 = function(data) {
  return;
}

const solvePart2 = function(data) {   
  return;
}

const solve = function() {
  var data = parseInput(localStorage[path]);  
  console.log('%s Day %s Part 1 Answer: %s', year, day, solvePart1(data));
  console.log('%s Day %s Part 2 Answer: %s', year, day, solvePart2(data));
}

const testPart1 = function() {
  var data = parseInput(testInput);
  console.log(data);
}

const testPart2 = function() {
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
//run();

})();