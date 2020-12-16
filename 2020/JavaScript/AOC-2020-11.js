(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '11';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

    const parseInput = function (input) {
        return input.trim().split('\n');
    }

    const nextSeat1 = function (floor, x, y) {
        var seat = (floor[y]||'').charAt(x),
            seats = 
                (floor[y-1]||'').charAt(x-1) +
                (floor[y-1]||'').charAt(x) +
                (floor[y-1]||'').charAt(x+1) +
                (floor[y]||'').charAt(x-1) +
                (floor[y]||'').charAt(x+1) +
                (floor[y+1]||'').charAt(x-1) +
                (floor[y+1]||'').charAt(x) +
                (floor[y+1]||'').charAt(x+1);
        
        switch(seat) {
            case 'L':
               if(!/#/.test(seats)) return '#';
            case '#':
                if(seats.replace(/[^#]/g,'').length > 3) return 'L'
            default: 
                return seat;
        }
    }

    const getSeat = function (floor, x, y, incr) {
        var s = '.';
        while(s !== '') {
            x += incr.x;
            y += incr.y;
            var s = (floor[y]||'').charAt(x);
            if(/[#L]/.test(s)) break;
        }
        return s;
    }

    const nextSeat2 = function (floor, x, y) {
        var seat = (floor[y]||'').charAt(x),
            seats = 
                getSeat(floor, x, y, {x: -1, y: -1}) +
                getSeat(floor, x, y, {x: -1, y: 0}) +
                getSeat(floor, x, y, {x: -1, y: 1}) +
                getSeat(floor, x, y, {x: 0, y: 1}) +
                getSeat(floor, x, y, {x: 0, y: -1}) +
                getSeat(floor, x, y, {x: 1, y: -1}) +
                getSeat(floor, x, y, {x: 1, y: 0}) +
                getSeat(floor, x, y, {x: 1, y: 1})
            ;
        
            switch(seat) {
                case 'L':
                    if(!/#/.test(seats)) return '#';
                case '#':
                    if(seats.replace(/[^#]/g,'').length > 4) return 'L'
                default: 
                    return seat;
            }
    }

    const iterate = function(floor, next) {
        var seats = [], len = floor[0].length;
        for(var y = 0; y < floor.length; y++) {
            var r = '';
            for(var x = 0; x < len; x++) {
                r += next(floor, x, y);
            }
            seats.push(r);
        }
        //console.log(seats.join('\n'))
        return seats;
    }

    const solvePart1 = function (data) {
        var layout = data.join('\n'), run = true;
        while(run) {
            data = iterate(data, nextSeat1);
            var l = data.join('\n');
            run = l !== layout;
            layout = l;
        }
        return layout.replace(/[^#]/gm,'').length;
    }

    const solvePart2 = function (data) {
        var layout = data.join('\n'), run = true;
        while(run) {
            data = iterate(data, nextSeat2);
            var l = data.join('\n');
            run = l !== layout;
            layout = l;
        }
        return layout.replace(/[^#]/gm,'').length;
    }

    const testPart1 = function (data) {
        var a = solvePart1(data);
        console.assert(a == 37);
    }

    const testPart2 = function (data) {
        var a = solvePart2(data);
        console.assert(a == 26);
    }

    const test = function () {
        testPart1(parseInput(testInput));
        testPart2(parseInput(testInput));
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