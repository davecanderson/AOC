(function() {
'use strict'

const isPasswordPart1 = function(val) {
  if(/\d{6}/.test(val)) {
    var digits = val.split('').map(d => parseInt(d)), hasPair = false;
    for(var d = 1; d < digits.length; d++) {
      if(digits[d-1] === digits[d]) {
        hasPair = true;
      }
      if(digits[d] < digits[d-1]) return false;
    }
    return hasPair;
  }
  return false;
}

const isPasswordPart2 = function(val) {
  if(/\d{6}/.test(val)) {
    var digits = val.split('').map(d => parseInt(d)), pair = digits[0], foundPairs = {};
    for(var d = 1; d < digits.length; d++) {
      if(digits[d] === pair) {
        foundPairs[pair] = foundPairs[pair] || pair.toString();
        foundPairs[pair] += pair.toString();
      } else {
        pair = digits[d];
      }
      if(digits[d] < digits[d-1]) return false;
    }
    return Object.keys(foundPairs).map(p => foundPairs[p].length).indexOf(2) >= 0;
  }
  return false;
}

const solvePart1 = function() {
  var val = 171309, passwords = [];
  for(;val <= 643603; val++) {
    if(isPasswordPart1(val.toString()))
      passwords.push(val);
  }
  return passwords.length;
}

const solvePart2 = function() {   
  var val = 171309, passwords = [];
  for(;val <= 643603; val++) {
    if(isPasswordPart2(val.toString()))
      passwords.push(val);
  }
  return passwords.length;
}

const solve = function() {  
  console.log('%s Day %s Part 1 Answer: %s', year, day, solvePart1());
  console.log('%s Day %s Part 2 Answer: %s', year, day, solvePart2());
}

const testPart1 = function() {
  console.assert(isPasswordPart1('111111'));
  console.assert(!isPasswordPart1('223450'));
  console.assert(!isPasswordPart1('123789'));
}

const testPart2 = function() {
  console.assert(isPasswordPart2('112233'));
  console.assert(!isPasswordPart2('123444'));
  console.assert(isPasswordPart2('112333'));
  console.assert(isPasswordPart2('111122'));
}

const test = function () {
  testPart1();
  testPart2();
}

const run = function() {
  solve();
}

clear();
test();
run();

})();