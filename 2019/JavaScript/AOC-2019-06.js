(function() {
  'use strict'

  const site = 'https://adventofcode.com';
  const year = '2019';
  const day = '6';
  const path = `${year}/day/${day}/input`;
  const url = `${site}/${path}`;

  const testInput1 = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

  const testInput2 = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;

  const parseInput = function(input) {
    var map = {};
    input.trim().split('\n').forEach(o => mapOrbit(map, o.split(')')));
    return map;
  }

  const getOrbits = function(body) {
    if(body.orbits.length) {
      return body.orbits.reduce((a,c) => a += getOrbits(c), 1);
    } 
    return 0;
  }

  const getSatellites = function(body) {
    if(body.satelites.length) {
      return body.satelites.reduce((a,c) => a.concat(getSatellites(c)), body.satelites);
    } 
    return [];
  }

  const mapOrbit = function(map, o) {
    var body = o[0], sat = o[1];
    map[body] = map[body] || { body: body, orbits: [], satelites: [] };
    map[sat] = map[sat] || { body: sat, orbits: [], satelites: [] };
    map[sat].orbits.push(map[body]);
    map[body].satelites.push(map[sat]);
  }

  const solvePart1 = function(data) {
    return Object.keys(data).reduce((a,c) => a += getOrbits(data[c]), 0);
  }

  const solvePart2 = function(data) {   
    var you = data['YOU'], santa = data['SAN'], transfers = 0;
    while(!getSatellites(you).some(s => s.body === 'SAN')) {
        you = you.orbits[0];
        transfers++;
    }
    while(you.orbits != santa.orbits) {
        santa = santa.orbits[0];
        transfers++;          
    }
    return transfers - 2;
  }

  const solve = function(input) {
    var data = parseInput(input);  
    console.log('Part 1 Answer: %s', solvePart1(data));
    console.log('Part 2 Answer: %s', solvePart2(data));
  }

  const testPart1 = function(data) {
      
    console.assert(getOrbits(data['COM']) == 0);
    console.assert(getOrbits(data['D']) == 3);
    console.assert(getOrbits(data['L']) == 7);
      
    var a = solvePart1(data);
    console.assert(a == 42); 
  }

  const testPart2 = function(data) {
    var a = solvePart2(data);
    console.assert(a == 4);   
  }

  const test = function () {
    testPart1(parseInput(testInput1));
    testPart2(parseInput(testInput2));
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

  test();
  run();

})();