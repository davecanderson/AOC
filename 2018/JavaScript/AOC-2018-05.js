var inputUrl = 'https://adventofcode.com/2018/day/5/input';
var testInput = 'dabAcCaCBAcCcaDA';

var parseInput = function(input) {
    //return testInput;
    return input.trim('\n'); 
}

var reaction = function(s) {
    var r = '';
    for(var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if(reacts(c, s.charAt(i+1))) {
        i++;
      } else {
        r += c;
      }
    }
    return r;
}

var reacts = function(a,b) {
    return (Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32);
}

var solvePart1 = function(input) {
    while(input != (input = reaction(input))) { }
    return input.length;
}

var solvePart2 = function(input) {
   var reactions = [];
   for(var i = 65; i < 91; i++) {
      var c = String.fromCharCode(i), s = input.replace(new RegExp(c, 'gi'),'');
      while(s != (s = reaction(s))) { }
      reactions.push({ char: c, length: s.length });
   }
   return reactions.sort((a,b) => a.length - b.length)[0].length;
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
