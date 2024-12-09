import { Solver, run } from './AOC-2024.mjs';

const solver = new Solver('07', '2024');
const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

solver.test.p1.input = input;
solver.test.p1.answer = 3749;
solver.test.p2.input = input;
solver.test.p2.answer = 11387;

solver.parseInputLine = function (s) {
  const test = s.trim().split(':');
  return { 
    isValid: false,
    result: parseInt(test[0]), 
    inputs: test[1].trim().split(' ').map(i => parseInt(i)) 
  };
};

const isValidCheck = function(test) {
  let results = [];

  results.push({ total: test.inputs[0], label: `${test.inputs[0]}`});

  test.inputs.forEach((input, idx) => {
      if(idx > 0) {
      const calibration = [],
            isLast = test.inputs.length == (idx + 1);     

      for(let result of results) {
        const mul = {
          total: result.total * input,
          label: `${result.label} * ${input}`
        }

        if(mul.total <= test.result) calibration.push(mul);
        if(isLast && mul.total == test.result) {
          test.isValid = true;
          test.label = mul.label;
        }

        const add = {
          total: result.total + input,
          label: `${result.label} + ${input}`
        }

        if(add.total <= test.result) calibration.push(add);
        if(isLast && add.total == test.result) {
          test.isValid = true;
          test.label = add.label;
        }

        const concat = {
          total: parseInt(`${result.total}${input}`),
          label: `${result.label} || ${input}`
        }

        if(concat.total <= test.result) calibration.push(concat);
        if(isLast && concat.total == test.result) {
          test.isValid = true;
          test.label = concat.label;
        }
      }

      results = calibration;
    }
  });
}

solver.solvePart1 = function (data) {
  data.forEach(isValidCheck);

  const valid = data.filter(d => d.isValid);

  return valid.reduce((a,c) => a + c.result, 0);
};

solver.solvePart2 = solver.solvePart1;

run(solver);