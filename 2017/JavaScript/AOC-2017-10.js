var path = '/2017/day/10/input';

var parseInput = function(input, length) {
  var list = [...Array(length).keys()],
      lengths = input.trim().split(',').map(i => parseInt(i));
  return { list, lengths }
}

function hash(list, cursor, length) {
  length += cursor;
  if(length > list.length) {
    var l = length%list.length;  
    reverse = list.slice(length).concat(list.slice(0,l)).reverse();
    remainder.slice(l, cursor);
    list = reverse.slice(0,l).concat(remainder).concat(reverse.slice(len));
  } else {
    reverse = list.slice(cursor, len).reverse();
    list = list.slice(0,cursor).concat(reverse).concat(list.slice(len));
  }
}

var solvePart1 = function(data) {
    var cursor = 0, skip = 0;
    data.lengths.forEach(l => {
        hash(data.list,cursor, l);
        console.debug('%i: %s', skip, list.join(' '));
        skip++;
    });    
    return list[0]*list[1];
}

var solvePart2 = function(data) {
   
}

var solve = function(input) {
  console.assert(solvePart1(parseInput('3, 4, 1, 5', 5)) == 12);

  console.log('Part 1 Answer: %s', solvePart1(parseInput(input, 256)));
  console.log('Part 2 Answer: %s', solvePart2(parseInput(input, 256)));
}

if(!localStorage[path]) {
  fetch('https://adventofcode.com' + path)
    .then(res => res.text())
    .then(txt => {
        localStorage.setItem(path, txt);
        solve(txt);
    });
} else {
  solve(localStorage[path]);
}
