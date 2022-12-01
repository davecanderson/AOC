let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('14', '2021');

const testData = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

solver.testData.P1 = { input: testData, answer: 1588 };
solver.testData.P2 = { input: testData, answer: 2188189693529 };

solver.parseInput = function (input) {
  let data = input
    .trim()
    .split("\n");

  let rules = {};
  
  data.slice(2).forEach((s) => { 
    let pair = s.trim().split(' -> '); 
    rules[pair[0]] = pair[1]; 
  });

  return {
    template: data[0].trim(),
    rules
  };
};

const stepsP1 = 10;
const stepsP2 = 40;

const polymerise = function(polymer, rules, steps) {
  for(let s = 0; s < steps; s++) {
    let length = polymer.length - 1, inserted = '';
    for(let l = 0; l < length; l++) {
      inserted += polymer.charAt(l);
      let match = rules[polymer.substring(l,l+2)];
      if(match) {
        inserted += match;
      }
    }    
    polymer = inserted + polymer.charAt(length);
  }
  return polymer;
}

const result = function(polymer) {
  let frequency = polymer.split('').reduce((a,c) => { a[c] = a[c] || 0; ++a[c]; return a; }, {});
  let scores = Object.keys(frequency).map((k) => frequency[k]);
  let most = Math.max(...scores);
  let least = Math.min(...scores);
  return most - least;
}

const expandrules = function(rules) {
  for(let rule of Object.keys(rules)) {
    let insert = rules[rule];
    rules[rule] = {
      ruleA: `${rule.charAt(0)}${insert}`,
      ruleB: `${insert}${rule.charAt(1)}`,
      insert
    }
  }
  return rules;
}

solver.solvePart1 = function (data) {
  let polymer = polymerise(data.template, data.rules, stepsP1);
  return result(polymer);
};

solver.solvePart2 = function (data) {
  let counts = {}, rules = expandrules(data.rules);
  data.template.split('').forEach((s) => counts[s] = 0);
  Object.keys(rules).forEach((s) => { s = s.split(''); counts[s[0]] = 0; counts[s[1]] = 0; });
  let queue = [];
  ++counts[data.template.charAt(0)];
  for(let c = 1; c < data.template.length; c++) {
    ++counts[data.template.charAt(c)];
    queue.push(`${data.template.charAt(c-1)}${data.template.charAt(c)}`);
  }
  for(let s = 0; s < stepsP1; s++) {
    let newQueue = [];
    for(let q of queue) {
      let r = rules[q];
      ++counts[r.insert];
      newQueue.push(r.ruleA);
      newQueue.push(r.ruleB);
    }
    queue = newQueue;
  }
  let scores = Object.keys(counts).map((k) => counts[k]);
  let most = Math.max(...scores);
  let least = Math.min(...scores);
  return most - least;
};

aoc.run(solver);