(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '2';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

    const parseInput = function (input) {
        return input.trim().split('\n').map(l => { 
            var p = l.split(': '), m = p[0].slice(0,-2).split('-');
            return { 
                min: parseInt(m[0]),
                max: parseInt(m[1]),
                char: p[0].slice(-1),
                password: p[1]
            } 
        });
    }

    const isValidPart1 = function (pswd) {
        var re = new RegExp('[^'+pswd.char+']', 'g'),
            p = pswd.password.replace(re,'');
        return p.length >= pswd.min && p.length <= pswd.max;
    }

    const isValidPart2 = function (pswd) {
        var c1 = pswd.password.charAt(pswd.min-1),
            c2 = pswd.password.charAt(pswd.max-1);
        
        if(c1 != pswd.char && c2 != pswd.char)
            return false;
        if(c1 == pswd.char && c2 == pswd.char)
            return false;
            
        return true;
    }

    const solvePart1 = function (data) {
        var valid = data.map(p => isValidPart1(p)), count = 0;
        valid.forEach(v => { if(v) count++; });
        return count;
    }

    const solvePart2 = function (data) {
        var valid = data.map(p => isValidPart2(p)), count = 0;
        valid.forEach(v => { if(v) count++; });
        return count;
    }

    const testPart1 = function (data) {
        var valid = data.map(p => isValidPart1(p)), count = 0;
        valid.forEach(v => { if(v) count++; });
        console.assert(count == 2);
    }

    const testPart2 = function (data) {
        var valid = data.map(p => isValidPart2(p)), count = 0;
        valid.forEach(v => { if(v) count++; });
        console.assert(count == 1);
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