var path = '/2018/day/12/input';

var testInput = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #
`;

var parseInput = function(input) {
  //input = testInput;
  var lines = input.trim().split('\n');
  return {
      state: /initial state: (.*)*/.exec(lines[0])[1].split(''),
      rules: lines.slice(2).map(r => new rule(r))
  }
}

function potPlant(i, plant) {
    return {
        index: i,
        hasPlant: plant,
        left: null,
        right: null,
        get value() {
            return this.hasPlant ? '#' : '.';
        },
        get state() {
            var l1 = this.left || { value: '.' },
                l2 = l1.left || { value: '.' },
                r1 = this.right || { value: '.' },
                r2 = r1.right ||  { value: '.' };

            return l2.value + l1.value + this.value + r1.value + r2.value;
        }
    }
}

function rule(r) {
    r = r.split(' => ');
    return {
        state: r[0],
        value: r[1]
    }
}

var generate = function(data, generations) {
    var pots = [], 
        newPlantRules = data.rules.filter(r => r.value == '#');

    for(var p = 0; p < data.state.length; p++) {
        var pot = new potPlant(p, data.state[p] == '#');
        if(p > 0) {
            pot.left = pots[p-1];
            pots[p-1].right = pot;
        }
        pots.push(pot);
    }

    for(var g = 0; g < generations; g++) {
        //console.log('%i: %s', g, pots.map(p => p.value).join(''));

        newPlantRules.forEach(r => {
            pots.filter(p => p.state == r.state).forEach(p => p.newPlant = true);
        });
        
        var pR1 = pots[0], 
            pR2 = pots[1], 
            pL2 = pots[pots.length-2], 
            pL1 = pots[pots.length-1],
            newPot;
        
        if(newPlantRules.some(r => r.state == '...' + pR1.value + pR2.value)) {
            newPot = new potPlant(pR1.index-1, false);
            newPot.newPlant = true;
            newPot.right = pR1;
            pR1.left = newPot;
            pots.push(newPot);
        }

        if(newPlantRules.some(r => r.state == '....' + pR1.value)) {
            if(!pR1.left) {
                newPot = new potPlant(pR1.index-1, false);
                newPot.newPlant = false;
                newPot.right = pR1;
                pR1.left = newPot;
                pots.push(newPot);
            }
            newPot = new potPlant(pR1.index-2, false);
            newPot.newPlant = true;
            newPot.right = pR1.left;
            pR1.left.left = newPot;
            pots.push(newPot);
        }

        if(newPlantRules.some(r => r.state ==  pL2.value + pL1.value + '...')) {
            newPot = new potPlant(pL1.index+1, false);
            newPot.newPlant = true;
            newPot.left = pL1;
            pL1.right = newPot;
            pots.push(newPot);
        }

        if(newPlantRules.some(r => r.state == pL1.value + '....')) {
            if(!pL1.right) {
                newPot = new potPlant(pL1.index+1, false);
                newPot.newPlant = false;
                newPot.left = pL1;
                pL1.right = newPot;
                pots.push(newPot);
            }
            newPot = new potPlant(pL1.index+2, false);
            newPot.newPlant = true;
            newPot.left = pL1.right;
            pL1.right.right = newPot;
            pots.push(newPot);
        }

        pots.forEach(p => { p.hasPlant = p.newPlant; p.newPlant = false });
        pots.sort((a,b) => a.index - b.index);
    }

    var total = pots.filter(p => p.hasPlant).map(p => p.index).reduce((s,p) => s += p, 0);

    console.log('%i: [%i]: %s', g, total, pots.map(p => p.value).join(''));

    return total;
}

var solvePart1 = function(data) {
    return generate(data,20);
}

var solvePart2 = function(data) {
    /*
     pattern stabalises after 122 generations and then 
     just shifts right one index at a time.
     total each time increments by 63 so can calculate 
     result rather than simulate all generations.
    */
    var total = generate(data,200);
    total += (50000000000-200)*63;
    return total;
}

var solve = function(input) {
  var data = parseInput(input);
  console.log('Part 1 Answer: %s', solvePart1(data));
  console.log('Part 2 Answer: %s', solvePart2(data));
}

if(!localStorage[path]) {
  fetch('https://adventofcode.com' + path)
    .then(res => res.text())
    .then(txt => {
        localStorage.setItem(path, txt);
        solve(txt);
    });
} else {
  solve(localStorage[path]);
}
