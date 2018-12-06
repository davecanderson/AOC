var inputUrl = 'https://adventofcode.com/2018/day/xx/input';

var parseInput = function(input) {
  return input.trimEnd('\n');
}

var solvePart1 = function(data) {
    
}

var solvePart2 = function(data) {
   
}

var solve = function(input) {
  var data = parseInput(input);
  console.log('Part 1 Answer: %s', solvePart1(data));
  console.log('Part 2 Answer: %s', solvePart2(data));
}

fetch(inputUrl)
  .then(res => res.text())
  .then(res => {
      solve(res);
  })
