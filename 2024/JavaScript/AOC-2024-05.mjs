import { Solver, run } from './AOC-2024.mjs';

const solver = new Solver('05', '2024');
const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

solver.test.p1.input = input;
solver.test.p1.answer = 143;
solver.test.p2.input = input;
solver.test.p2.answer = 123;

solver.parseInput = function (input) {
  const rules = {}, updates = [];
  const ruleRegex = /^(\d+)\|(\d+)$/;

  input.trim().split('\n').forEach(l => {
    const rule = l.match(ruleRegex);
    if(rule) {
      let key = parseInt(rule[1]);
      rules[key] = rules[key] || [];
      rules[key].push(parseInt(rule[2]));
    } else {
      if(l.length) {
        updates.push(l.split(',').map(i => parseInt(i)));
      }
    }
  });
  
  return { rules, updates };
};

const isOrdered = function(rules, update) {
  let isOrdered = true;

  do {
    const page = update.shift();
    const order = rules[page] || [];
    isOrdered = update.every(u => order.includes(u));
  } while(update.length && isOrdered);

  return isOrdered;
}

const toOrdered = function(rules, update) {
  let isOrdered = true, ordered = [], unordered = [];

  do {
    //console.log('[%s] > [%s]', update.join(), ordered.join())
    const page = update.shift();
    const order = rules[page] || [];
    isOrdered = update.every(u => order.includes(u));
    if(isOrdered) {
      ordered.push(page);
      unordered = [];
    } else {
      unordered.push(page);
      update = update.slice(unordered.length - 1);
      ordered.push(update.shift());
      update.unshift(...unordered);
      update.unshift(ordered.pop());
    }
  } while(update.length);

  //console.log('[%s] > [%s]', update.join(), ordered.join())
  return ordered;
}

const mid = function(update) {
  const i = Math.floor(update.length / 2 + update.length % 2) - 1;
  return update[i];
}

solver.solvePart1 = function (data) {
  const ordered = data.updates.filter(u => isOrdered(data.rules, [...u]));
  const middle = ordered.map(mid);
  return middle.reduce((a, c) => a + c, 0);
};

solver.solvePart2 = function (data) {
  const notOrdered = data.updates.filter(u => !isOrdered(data.rules, [...u]));
  const ordered = notOrdered.map(u => toOrdered(data.rules, u));
  const middle = ordered.map(mid);
  return middle.reduce((a, c) => a + c, 0);
};

run(solver);