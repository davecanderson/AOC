(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '5';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = ``;

    const parseInput = function (input) {
        return input.trim().split('\n');
    }

    const getSeatId = function (seatnum) {
        var row = parseInt(seatnum.slice(0,7).replace(/F/g,'0').replace(/B/g,'1'),2);
        var seat = parseInt(seatnum.slice(-3).replace(/L/g,'0').replace(/R/g,'1'),2);
        return row * 8 + seat;
    }

    const solvePart1 = function (data) {
        return data.map(s => getSeatId(s)).reduce((a,c) => { return c > a ? c : a; }, 0);
    }

    const solvePart2 = function (data) {
        var seats = data.map(s => getSeatId(s));
        return seats.filter(s => seats.indexOf(s+1) < 0 || seats.indexOf(s-1) < 0);
    }

    const test = function () {
        console.assert(getSeatId("BFFFBBFRRR") == 567);
        console.assert(getSeatId("FFFBBBFRRR") == 119);
        console.assert(getSeatId("BBFFBBFRLL") == 820);
    }

    const solve = function (input) {
        var data = parseInput(input);
        console.log('Part 1 Answer: %s', solvePart1(data));
        console.log('Part 2 Answer: %O', solvePart2(data));
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