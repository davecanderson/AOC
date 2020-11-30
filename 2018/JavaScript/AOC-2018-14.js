var path = '/2018/day/14/input';

var testInput = '';

var parseInput = function(input) {
  input = testInput;
  return input.trim().split(',').map(i => parseInt(i));
}

var solvePart1 = function(length) {
    var recipies = '37', elf1 = 0, elf2 = 1;
    length += 10;
    while(recipies.length <= length) {
      //console.debug(recipies.split('').map((r,i) => i == elf1 ? '('+r+')' : i == elf2 ? '['+r+']' : ' '+r+' ').join(''));
      var e1 = parseInt(recipies.charAt(elf1)),
          e2 = parseInt(recipies.charAt(elf2));
      recipies += (e1+e2).toString();  
      elf1 = (elf1 + 1 + e1)%recipies.length; 
      elf2 = (elf2 + 1 + e2)%recipies.length;
    }
    return recipies.substring(length-10, length);
}

var solvePart2 = function(find) {
   var recipies = [3,7], elf1 = 0, elf2 = 1, found = -1, match = [];
    while(found < 0) {
      //console.debug(recipies.split('').map((r,i) => i == elf1 ? '('+r+')' : i == elf2 ? '['+r+']' : ' '+r+' ').join(''));
      var e1 = recipies[elf1],
          e2 = recipies[elf2],
          add = (e1+e2).toString().split('').map(Number);
      recipies.push(...add);
      match.push(...add);  
      elf1 = (elf1 + 1 + e1)%recipies.length; 
      elf2 = (elf2 + 1 + e2)%recipies.length;
      found = match.join('').indexOf(find);
      if(found < 0) {
        match = match.slice(-5);
      }
    }
    return recipies.join('').indexOf(find);
}

var solve1 = function(input) {
  console.assert(solvePart1(5) == '0124515891');
  console.assert(solvePart1(9) == '5158916779');
  console.assert(solvePart1(18) == '9251071085');
  console.assert(solvePart1(2018) == '5941429882');

  console.log('Part 1 Answer: %s', solvePart1(509671));
}

var solve2 = function(input) {
  console.assert(solvePart2('51589') == 9);
  console.assert(solvePart2('01245') == 5);
  console.assert(solvePart2('92510') == 18);
  console.assert(solvePart2('59414') == 2018);

  console.log('Part 2 Answer: %s', solvePart2('509671'));
}

if(!localStorage[path]) {
  fetch('https://adventofcode.com' + path)
    .then(res => res.text())
    .then(txt => {
        localStorage.setItem(path, txt);
        solve2(txt);
    });
} else {
  solve2(localStorage[path]);
}
