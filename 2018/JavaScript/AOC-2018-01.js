const fetch = require('node-fetch');

var inputUrl = 'https://adventofcode.com/2018/day/1/input';

var parseInput = function(input) {
  return input.trimEnd('\n').split('\n');
}

var solvePart1 = function(inputs) {
    var frequency = 0;
    inputs.forEach(function(i) {
        frequency += parseInt(i);
    })
    return frequency;
}

var solvePart2 = function(inputs) {
    var frequency = 0, repeat = null, frequencies = {};
    while(!repeat) {
        for(var i = 0; i < inputs.length; i++) {
            frequency += parseInt(inputs[i]);
            if(frequencies[frequency]) {
               repeat = frequency
               break;
            } else {
               frequencies[frequency] = frequency;
            }
        }
    }
    return repeat;
}

var solve = function(input) {
  var inputs = parseInput(input);
  console.log('Part 1 Answer: %s', solvePart1(inputs));
  console.log('Part 2 Answer: %s', solvePart2(inputs));
}

fetch(inputUrl)
  .then(res => res.text())
  .then(res => {
      solve(res);
  })