(function() {
'use strict'

const site = 'https://adventofcode.com';
const year = '2019';
const day = '5';
const path = `${year}/day/${day}/input`;
const url = `${site}/${path}`;

const parseInput = function(input) {
  return input.trim().split(',').map(i => parseInt(i));
}

const instruction = function(i, arr) {
    var opp = ('00000' + arr[i]).slice(-5),
      instr = {
          idx: i,
          oppcode: parseInt(opp.substring(3)),
          a: { value: arr[i+1], mode: parseInt(opp.charAt(2)) },
          b: { value: arr[i+2], mode: parseInt(opp.charAt(1)) },
          c: { value: arr[i+3], mode: parseInt(opp.charAt(0)) }
      };

    switch(instr.oppcode) {
      case 1:
      case 2:
        instr.len = 4;
        break;
      case 3:
      case 4:
        instr.len = 2;
        delete instr.b;
        delete instr.c;
        break;
      case 5:
      case 6:
        instr.len = 3;
        delete instr.c;
        break;
      case 7:
      case 8:
        instr.len = 4;
        break;
      default:
        instr.len = 0;
    }
    return instr;
} 

const getValue = function(mem, param) {
  switch(param.mode)
  {
    case 0:
      return mem[param.value];
    case 1:
      return param.value;
    default:
      console.error('Unknown Param Mode %O', param);
  }
}

const process = function(mem, instr, input) {
  switch(instr.oppcode)
  {
    case 1:
      mem[instr.c.value] = getValue(mem, instr.a) + getValue(mem, instr.b);
      break;
    case 2:
      mem[instr.c.value] = getValue(mem, instr.a) * getValue(mem, instr.b);
      break;
    case 3:
      mem[instr.a.value] = input;
      break;
    case 4:
      mem.output = getValue(mem, instr.a);
      console.log('%O output %s', instr, mem.output);
      break;
    case 5:
      if(getValue(mem, instr.a) !== 0) {
        mem.idx = getValue(mem, instr.b);
        return;
      }
      break;
    case 6:      
      if(getValue(mem, instr.a) === 0) {
        mem.idx = getValue(mem, instr.b);
        return;
      }
      break;
    case 7:
      mem[instr.c.value] = getValue(mem, instr.a) < getValue(mem, instr.b) ? 1 : 0;
      break;
    case 8:
      mem[instr.c.value] = getValue(mem, instr.a) == getValue(mem, instr.b) ? 1 : 0;
      break;
  }
  mem.idx += instr.len;
}

const exec = function(program, input) {
    var instr = { };
    program.idx = 0;
    while(instr.len !== 0) {
        instr = instruction(program.idx, program);
        process(program, instr, input);
    }
    
    return program;
}

const solvePart1 = function(program) {
  return exec(program, 1).output;
}

const solvePart2 = function(program) {  
  return exec(program, 5).output;
}

const solve = function(input) {
  console.log('%s Day %s Part 1 Answer: %s', year, day, solvePart1(parseInput(input)));
  console.log('%s Day %s Part 2 Answer: %s', year, day, solvePart2(parseInput(input)));
}

const test = function() {
  /* day 2 tests */
  console.assert(exec([1,0,0,0,99])[0] == 2);
  console.assert(exec([2,3,0,3,99])[0] == 2);
  console.assert(exec([2,4,4,5,99,0])[0] == 2);  
  console.assert(exec([1,1,1,4,99,5,6,0,99])[0] == 30);
  console.assert(exec([1,9,10,3,2,3,11,0,99,30,40,50])[0] == 3500);

  /* day 5 part 1 tests */
  console.assert(exec([1002,4,3,4,33])[0] == 1002);
  console.assert(exec([1101,100,-1,4,0])[0] == 1101);
  console.assert(exec([3,0,4,0,99], 123)[0] == 123);  
  
  /* day 5 part 2 tests */
  console.assert(exec([3,9,8,9,10,9,4,9,99,-1,8], 8).output == 1);
  console.assert(exec([3,9,8,9,10,9,4,9,99,-1,8], 88).output == 0);
  console.assert(exec([3,9,7,9,10,9,4,9,99,-1,8], 7).output == 1);
  console.assert(exec([3,9,7,9,10,9,4,9,99,-1,8], 9).output == 0);
  console.assert(exec([3,3,1108,-1,8,3,4,3,99], 8).output == 1);
  console.assert(exec([3,3,1108,-1,8,3,4,3,99], 88).output == 0);  
  console.assert(exec([3,3,1107,-1,8,3,4,3,99], 7).output == 1);
  console.assert(exec([3,3,1107,-1,8,3,4,3,99], 9).output == 0);
  
  console.assert(exec([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 1).output == 1);
  console.assert(exec([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 0).output == 0);
  console.assert(exec([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 1).output == 1);
  console.assert(exec([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 0).output == 0);

  console.assert(exec([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], 7).output == 999);
  console.assert(exec([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], 8).output == 1000);
  console.assert(exec([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], 9).output == 1001);
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