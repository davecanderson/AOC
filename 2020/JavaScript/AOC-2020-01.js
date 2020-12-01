var path = '/2020/day/01/input';

var testInput = `1721
979
366
299
675
1456`;

var parseInput = function (input) {
  input = testInput;
  return input.trim().split(',').map(i => parseInt(i));
}

var solvePart1 = function (data) {
  console.log(data);
}

var solvePart2 = function (data) {

}

var solve = function (input) {
  var data = parseInput(input);
  console.log('Part 1 Answer: %s', solvePart1(data));
  console.log('Part 2 Answer: %s', solvePart2(data));
}

if (!localStorage[path]) {
  fetch('https://adventofcode.com' + path)
    .then(res => res.text())
    .then(txt => {
      localStorage.setItem(path, txt);
      solve(txt);
    });
} else {
  solve(localStorage[path]);
}
