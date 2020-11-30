(function() {
'use strict'

const site = 'https://adventofcode.com';
const year = '2019';
const day = '2';
const path = `${year}/day/${day}/input`;
const url = `${site}/${path}`;

const testInput = [1,9,10,3,2,3,11,0,99,30,40,50];

const parseInput = function(input) {
  return input.trim().split(',').map(i => parseInt(i));
}

const instruction = function(i, arr) {
    return {
        oppcode: arr[i],
        aIn: arr[i+1],
        bIn: arr[i+2],
        cOut: arr[i+3]
    }
} 

const operate = function(register, instr) {
   switch(instr.oppcode)
   {
        case 1:
            register[instr.cOut] = register[instr.aIn] + register[instr.bIn];
            return true;
        case 2:
            register[instr.cOut] = register[instr.aIn] * register[instr.bIn];
            return true;
        default:
            return false;        
   }
}

const runProgram = function(input) {
    var i = 0;
    while(operate(input, instruction(i, input))) {
        console.debug(input);
        i += 4;
    }
    console.debug(input[0]);
    return input[0];
}

const runUntil = function(input, until) {
  var noun = 0, verb = 0, result = 0, memory = [];
  for(var n = 0; n < 100; n++) {
    for(var v = 0; v < 100; v++) {
      memory = input.slice(0);
      memory[1] = n;
      memory[2] = v;
      result = runProgram(memory);
      if(result == until) 
        return { noun: n, verb: v };
    }
  } 
}

const solvePart1 = function(data) {
  data[1] = 12;
  data[2] = 2;
  return runProgram(data);
}

const solvePart2 = function(data) {   
  var result = runUntil(data, 19690720);
  return (100 * result.noun) + result.verb;
}

const solve = function(input) {
  console.log('%s Day %s Part 1 Answer: %s', year, day, solvePart1(parseInput(input)));
  console.log('%s Day %s Part 2 Answer: %s', year, day, solvePart2(parseInput(input)));
}

const testPart1 = function() {
  console.assert(runProgram([1,0,0,0,99]) == 2);
  console.assert(runProgram([2,3,0,3,99]) == 2);
  console.assert(runProgram([2,4,4,5,99,0]) == 2);
  console.assert(runProgram([1,1,1,4,99,5,6,0,99]) == 30);
  console.assert(runProgram(testInput) == 3500);
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
run();

})();