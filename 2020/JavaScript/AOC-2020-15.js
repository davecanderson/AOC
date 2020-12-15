(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '15';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const parseInput = function (input) {
        return input.trim().split(',').map(l => parseInt(l));
    }

    const solvePart1 = function (data, until) {
        var spoken = {}, turn = 0, nums = parseInput(data);

        nums.forEach((v,i) => { spoken[v] = [i+1]; spoken.last = v; });

        turn = nums.length;

        while(turn < until) {
            var last = spoken[spoken.last];
            spoken.last = last.length > 1 ? last[1] - last[0] : 0;
            spoken[spoken.last] = (spoken[spoken.last] || []).slice(-1);
            spoken[spoken.last].push(++turn);
        }

        return spoken.last;
    }

    const solvePart2 = function (data) {
        
    }

    const testPart1 = function () {
        var a0 = solvePart1('0,3,6',2020);
        var a1 = solvePart1('1,3,2',2020);
        var a2 = solvePart1('2,1,3',2020);
        var a3 = solvePart1('1,2,3',2020);
        var a4 = solvePart1('2,3,1',2020);
        var a5 = solvePart1('3,2,1',2020);
        var a6 = solvePart1('3,1,2',2020);

        console.assert(a0 == 436);
        console.assert(a1 == 1);
        console.assert(a2 == 10);
        console.assert(a3 == 27);
        console.assert(a4 == 78);
        console.assert(a5 == 438);
        console.assert(a6 == 1836);

    }

    const testPart2 = function (data) {
        //var a0 = solvePart1('0,3,6',30000000);
        //var a1 = solvePart1('1,3,2',30000000);
        //var a2 = solvePart1('2,1,3',30000000);
        //var a3 = solvePart1('1,2,3',30000000);
        //var a4 = solvePart1('2,3,1',30000000);
        //var a5 = solvePart1('3,2,1',30000000);
        //var a6 = solvePart1('3,1,2',30000000);

        //console.assert(a0 == 175594);
        //console.assert(a1 == 2578);
        //console.assert(a2 == 3544142);
        //console.assert(a3 == 261214);
        //console.assert(a4 == 6895259);
        //console.assert(a5 == 18);
        //console.assert(a6 == 362);
    }

    const test = function () {
        testPart1();
        //testPart2();
    }

    const solve = function (input) {
        console.log('Part 1 Answer: %s', solvePart1(input, 2020));
        //console.log('Part 2 Answer: %s', solvePart2(data));
    }

    const run = function () {
        solve('2,0,1,9,5,19');
    }
    
    test();
    run();

})();