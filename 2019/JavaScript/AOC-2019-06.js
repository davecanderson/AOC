(function() {
'use strict'

const site = 'https://adventofcode.com';
const year = '2019';
const day = '6';
const path = `${year}/day/${day}/input`;
const url = `${site}/${path}`;

const testInput1 = `
COM)B
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
`;

const testInput2 = `
COM)B
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
I)SAN
`;

const parseInput = function(input) {
  var map = {};
  input.trim().split('\n').forEach(o => mapOrbit(map, o.split(')')));
  return map;
}

const getOrbits = function(body) {
  if(body.orbits.length) {
    var orbits = 1;
    body.orbits.forEach(o => orbits += o.orbitCount);
    return orbits;
  } 
  return 0;
}

const mapOrbit = function(map, o) {
  map[o[0]] = map[o[0]] || { body: o[0], orbits: [], get orbit() { return this.orbits[0]; }, get orbitCount() { return getOrbits(this); } };
  map[o[1]] = map[o[1]] || { body: o[1], orbits: [], get orbit() { return this.orbits[0]; }, get orbitCount() { return getOrbits(this); } };
  map[o[1]].orbits.push(map[o[0]]);
}

const getTotalOrbits = function(map) {
  return Object.values(map).map(m => m.orbitCount).reduce((a,c) => c += a);
}

const getShareOrbit = function(o1, o2) {
  while(o2.orbits.length) {
    if(o1.orbit == o2.orbit) return o2.orbit;
    o2 = o2.orbit;
  }
  return o1.orbits.length ? getShareOrbit(o1.orbit, o2) : o1;
}

const getTransfer = function(o1, o2) {
  var transfers = [], sharedOrbit = getShareOrbit(o1,o2);
  while(o1.orbit != sharedOrbit) {
    transfers.push(o1.orbit.body + ' to ' + o1.orbit.orbit.body);
    o1 = o1.orbit;
  }
  while(o2.orbit != sharedOrbit) {
    transfers.push(o2.orbit.body + ' to ' + o2.orbit.orbit.body);
    o2 = o2.orbit;
  }
  console.log(transfers.join(' > '));
  return transfers;
}

const getOrbitTransfer = function(map, body1, body2) {
  return getTransfer(map[body1], map[body2]).length;
}

const solvePart1 = function(data) {
  return getTotalOrbits(data);
}

const solvePart2 = function(data) {   
  return getMinTransfer(data, 'YOU', 'SAN'); 
}

const solve = function() {
  var data = parseInput(localStorage[path]);  
  console.log('%s Day %s Part 1 Answer: %s', year, day, solvePart1(data));
  console.log('%s Day %s Part 2 Answer: %s', year, day, solvePart2(data));
}

const testPart1 = function() {
  var map = parseInput(testInput1);

  console.assert(map.COM.orbitCount == 0);
  console.assert(map.D.orbitCount == 3);
  console.assert(map.L.orbitCount == 7);

  console.assert(getTotalOrbits(map) == 42); 
}

const testPart2 = function() {
  var map = parseInput(testInput2);

  console.assert(getShareOrbit(map.YOU, map.L).body === 'K');
  console.assert(getShareOrbit(map.D, map.SAN).body === 'I');
  console.assert(getShareOrbit(map.YOU, map.SAN).body === 'D');

  console.assert(getOrbitTransfer(map, 'G', 'C') == 0);
  console.assert(getOrbitTransfer(map, 'G', 'D') == 1);
  console.assert(getOrbitTransfer(map, 'YOU', 'SAN') == 4);   
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
//run();

})();