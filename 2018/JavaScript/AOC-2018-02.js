var inputUrl = 'https://adventofcode.com/2018/day/2/input';

var parseInput = function(input) {
  return input.trimEnd('\n').split('\n');
}

var solvePart1 = function(inputs) {
    var hasTwo = 0, hasThree = 0;
    inputs.forEach(function (i) {
        var chars = {};
        for(c = 0; c < i.length; c++) {
            if(chars[i[c]]) {
                chars[i[c]]++;     
            } else {
                chars[i[c]] = 1;
            }
        }
        Object.keys(chars).forEach(function(k){
            if(chars[k] == 2) chars.hasTwo = true;
            if(chars[k] == 3) chars.hasThree = true;
        })
        if(chars.hasTwo) hasTwo++;
        if(chars.hasThree) hasThree++;
    })
    return hasTwo * hasThree;
}

var solvePart2 = function(inputs) {
    var diff, length = inputs.length;
    for(var i = 0; i < length; i++) { 
        var s1 = inputs[i];
        for(var y = 0; y < length; y++) { 
            diff = compare(s1,inputs[y]);
            if(diff && diff >= 0) {
                return s1.slice(0,diff) + s1.slice(diff+1);
            }
        };
    };
}

var compare = function(s1, s2) {
    var diff = null;
    for(var i = 0; i < s1.length; i++) {
        if(s1[i] == s2[i]) continue;
        if(diff) return -1;
        diff = i;
    }
    return diff;
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
