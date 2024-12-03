let aoc = require('./AOC-2023.js');

let solver = new aoc.Solver('05', '2023');
let input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const mapping = {
    seed: 'soil',
    soil: 'fertilizer',
    fertilizer: 'water',
    water: 'light',
    light: 'temperature',
    temperature: 'humidity',
    humidity: 'location'
}

const memo = new WeakMap();

const lookup = function(source, value, maps) {
    const dest = mapping[source];
    const name = `${source}-to-${dest}`;
    const key = `${name}_${value}`;

    let result = {
        dest: dest,
        value: value
    }

    const map = maps[name];

    map.ranges.forEach(r => {
        if(value >= r.src && value < (r.src + r.length)) {
            result.value = r.dest + value - r.src;
            return;
        }
    });

    memo[key] = result;

    return result;
}

const location = function(seed, maps) {
    let log = [`Seed ${seed}`]; 
       
    let result = lookup('seed', seed, maps);
    
    log.push(`${result.dest} ${result.value}`);

    while(result && result.dest != 'location') {
        result = lookup(result.dest, result.value, maps);
        log.push(`${result.dest} ${result.value}`);
    }
    console.log(log.join(', '));
    return result.value;
}

solver.testData.P1 = { input: input, answer: 35 };
solver.testData.P2 = { input: input, answer: 46 };

solver.parseInput = function (input) {
  const re = /^(?<name>[\w-]*)?\s?(?<type>seeds|map):(?<numbers>[\d\s\n]*)$/;
  let data = { 
    seeds: [], 
    maps: {} 
  };
  input
    .trim()
    .split("\n\n")
    .forEach(l => {
        let d = re.exec(l);
        if(d.groups["type"] == 'seeds') {
            data.seeds = d.groups["numbers"].trim().split(' ').map(s => parseInt(s));
        }
        if(d.groups["type"] == 'map') {
            data.maps[d.groups["name"]] = {
                ranges: d.groups["numbers"].trim().split('\n').map(r => { 
                    const n = r.trim().split(' '); 
                    return { 
                        dest: parseInt(n[0]), 
                        src: parseInt(n[1]), 
                        length: parseInt(n[2]) 
                    }
                })
            }
        }
    });
return data;
};

solver.solvePart1 = function (data) {
  return data.seeds.map(s => location(s, data.maps)).sort((a,b) => a-b)[0];
};

solver.solvePart2 = function (data) {
  let min = Infinity;
  for(let i = 0; i < data.seeds.length; i += 2) {
    const end = data.seeds[i] + data.seeds[i+1];
    for(let j = data.seeds[i]; j < end; j++) {
        min = Math.min(min, location(j, data.maps));
    }
  }
  return min;
};

aoc.run(solver);