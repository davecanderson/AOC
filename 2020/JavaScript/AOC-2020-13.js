(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '13';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = `939
7,13,x,x,59,x,31,19`;

    const parseInput1 = function (input) {
        var d = input.trim().split('\n');
        return { 
            depart: parseInt(d[0]),
            buses: d[1].match(/(\d+),*/g).map(b => parseInt(b))
        }
    }

    const parseInput2 = function (input) {
        return input.trim().split(',').map((v,i) => { 
            return { 
                id: parseInt(v), 
                idx: i } 
            })
            .filter((v,i,s) => !(isNaN(v.id)));
    }

    const solvePart1 = function (data) {
        var buses = data.buses.map(b => { return { id: b, wait: b - data.depart % b } })
        var bus = buses.sort((a,b) => a.wait > b.wait ? 1 : -1)[0];
        return bus.id * bus.wait;
    }

    const solvePart2 = function (data, time) {
        var run = true, step = data[0].id;
        time -= (time % step);
        while(run) {
            time += step;
            run = !data.every(b => (time + b.idx) % b.id === 0);
        }
        return time;
    }

    const testPart1 = function (data) {
        var a = solvePart1(data);localStorage
        console.assert(a == 295);
    }

    const testPart2 = function (data) {
        var a1 = solvePart2(parseInput2("7,13,x,x,59,x,31,19"), 0);
        var a2 = solvePart2(parseInput2("17,x,13,19"), 0);
        var a3 = solvePart2(parseInput2("67,7,59,61"), 0);
        var a4 = solvePart2(parseInput2("67,x,7,59,61"), 0);
        var a5 = solvePart2(parseInput2("67,7,x,59,61"), 0);
        var a6 = solvePart2(parseInput2("1789,37,47,1889"), 1000000000);

        console.assert(a1 == 1068781);
        console.assert(a2 == 3417);
        console.assert(a3 == 754018);
        console.assert(a4 == 779210);
        console.assert(a5 == 1261476);
        console.assert(a6 == 1202161486);
    }

    const test = function () {
        testPart1(parseInput1(testInput));
        testPart2();
    }

    const solve = function (input) {
        console.log('Part 1 Answer: %s', solvePart1(parseInput1(input)));
        console.log('Part 2 Answer: %s', solvePart2(parseInput2(input.split('\n')[1]), 100000000000000));
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