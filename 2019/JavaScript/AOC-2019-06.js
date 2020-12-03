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

const getSharedOrbit = function(o1, o2) {
  if(o1.orbit === o2.orbit) return o1.orbit;
  if(!o1.orbits.includes(o2.orbit)) return getSharedOrbit(o1, o2.orbit);
  if(!o2.orbits.includes(o1.orbit)) return getSharedOrbit(o1.orbit, o2);
  getSharedOrbit(o1.orbit, o2.orbit);
}

const getTransfers = function(o1, o2) {
  var transfers = [], sharedOrbit = getSharedOrbit(o1,o2);
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

const getOrbitTransfers = function(map, body1, body2) {
  return getTransfers(map[body1], map[body2]).length;
}

const solvePart1 = function(data) {
  return getTotalOrbits(data);
}

const solvePart2 = function(data) {   
  return getTransfers(data, 'YOU', 'SAN'); 
}

const solve = function() {
  var data = parseInput(localStorage[path]);  
  console.log('%s Day %s Part 1 Answer: %s', year, day, solvePart1(data));
  console.log('%s Day %s Part 2 Answer: %s', year, day, solvePart2(data));
}

const testPart1 = function() {
  var map = parseInput(testInput1);

  console.log("Test Part 1");

  console.assert(map.COM.orbitCount == 0);
  console.assert(map.D.orbitCount == 3);
  console.assert(map.L.orbitCount == 7);

  console.assert(getTotalOrbits(map) == 42); 
}

const testPart2 = function() {
  var map = parseInput(testInput2);

  console.log("Test Part 2");

  let so1 = getSharedOrbit(map.YOU, map.L);
  let so2 = getSharedOrbit(map.YOU, map.SAN);

  console.assert(so1.body === 'K', `YOU and L shared orbit ${so1.body} is not equal to K`);
  console.assert(so2.body === 'D', `YOU and SAN shared orbit ${so2.body} is not equal to D`);

  //let ot1 = getOrbitTransfers(map.YOU, map.L);
  //let ot2 = getOrbitTransfers(map.YOU, map.SAN);

  //console.assert(ot1 === 0, `YOU and L orbit transfers ${ot1} is not equal to 0`);
  //console.assert(ot2 === 4, `YOU and SAN orbit transfers ${ot2} is not equal to 4`);   
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

test();
//run();

})();