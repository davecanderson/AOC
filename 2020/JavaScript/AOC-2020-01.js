(function () {
  'use strict'

  const site = 'https://adventofcode.com';
  const year = '2020';
  const day = '1';
  const path = `${year}/day/${day}/input`;
  const url = `${site}/${path}`;

  var parseInput = function (input) {
    return input.trim().split('\n').map(i => parseInt(i));
  }

  var solvePart1 = function (data) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (data[i] + data[j] == 2020) {
          return data[i] * data[j];
        }
      }
    }
  }

  var solvePart2 = function (data) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data.length; j++) {
        for (var k = 0; k < data.length; k++) {
          if (data[i] + data[j] + data[k] == 2020) {
            return data[i] * data[j] * data[k];
          }
        }
      }
    }
  }

  const solve = function (input) {
    var data = parseInput(input);
    console.log('Part 1 Answer: %s', solvePart1(data));
    console.log('Part 2 Answer: %s', solvePart2(data));
  }

  const run = function () {
    if (!localStorage[path]) {
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

  run();

})();