(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '10';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput1 = `16
10
15
5
1
11
7
19
6
12
4`;

    const testInput2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

    const parseInput = function (input) {
        return input.trim().split('\n').map(l => parseInt(l));
    }

    const solvePart1 = function (data) {
        var voltages = { '1': [], '2': [], '3': [] }, maxV;
        data.sort((a,b) => a > b ? 1 : -1).forEach((v,i) => {
            var volt = i === 0 ? 0 : data[i-1];
            voltages[v - volt].push(v);
            maxV = v;            
        })
        voltages[3].push(maxV+3);
        return voltages[1].length * voltages[3].length;
    }

    const solvePart2 = function (data) {
        var adapters = { '0': { opts: data.filter(d => d <= 3) } };
        data.sort((a,b) => a > b ? 1 : -1).map(a => {
           return adapters[a] = { voltage: a, opts: data.filter(d => d > a && d <= a+3) };
        });
        var chains = {};
        const countChains = function(adapter) {
            if(!chains[adapter.voltage]) {
                if(adapter.opts.length) {
                    chains[adapter.voltage] = adapter.opts.reduce((a,c) => a + countChains(adapters[c]), 0);
                } else {
                    chains[adapter.voltage] = 1;
                }    
            }                        
            return chains[adapter.voltage];
        }
        return countChains(adapters['0']);
    }

    const testPart1 = function () {
        var a1 = solvePart1(parseInput(testInput1));
        var a2 = solvePart1(parseInput(testInput2));
        console.assert(a1 == 35);
        console.assert(a2 == 220);
    }

    const testPart2 = function (data) {
        var a1 = solvePart2(parseInput(testInput1));
        var a2 = solvePart2(parseInput(testInput2));
        console.assert(a1 == 8);
        console.assert(a2 == 19208);
    }

    const test = function () {
        testPart1();
        testPart2();
    }

    const solve = function (input) {
        var data = parseInput(input);
        console.log('Part 1 Answer: %s', solvePart1(data));
        console.log('Part 2 Answer: %s', solvePart2(data));
    }

    const run = function () {
        if (!localStorage[path]) {
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