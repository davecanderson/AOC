(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '9';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

    const parseInput = function (input) {
        return input.trim().split('\n').map(l => parseInt(l));
    }

    const isValid = function(vals, num) {
        return vals.some(v => vals.indexOf(num-v) != -1);
    }

    const areSum = function(vals, num) {
        var acc = 0;
        for(var i = 0; i < vals.length; i++) {
            acc = vals[i];
            for(var j = i+1; j < vals.length; j++) {
                if(acc == num) return vals.slice(i, j)
                if(acc > num) break;
                acc += vals[j];
            }
        }
    }

    const solvePart1 = function (data, len) {
        return data.slice(len).filter((v,i) => !isValid(data.slice(i, i+len), v))[0];
    }

    const solvePart2 = function (data, len) {
        var num = solvePart1(data, len),
            sum = areSum(data, num),
            sorted = sum.sort((a,b) => a > b ? 1 :-1);
        
        return sorted[0] + sorted[sorted.length-1];
    }

    const testPart1 = function (data) {
        var a = solvePart1(data, 5);
        console.assert(a == 127);
    }

    const testPart2 = function (data) {
        var a = solvePart2(data, 5);
        console.assert(a == 62);
    }

    const test = function () {
        var data = parseInput(testInput);
        testPart1(data);
        testPart2(data);
    }

    const solve = function (input) {
        var data = parseInput(input);
        console.log('Part 1 Answer: %s', solvePart1(data, 25));
        console.log('Part 2 Answer: %s', solvePart2(data, 25));
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