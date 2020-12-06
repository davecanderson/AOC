(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '6';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;

    const parseInput = function (input) {
        return input.trim()
            .split('\n\n')
            .map(l => l.split('\n'));
    }

    const yesAnyCount = function (data) {
        var count = 0, answers = [];
        data.split('').forEach(q => {
            if(answers.indexOf(q) < 0) answers.push(q);
        });
        return answers.length;
    }

    const yesAllCount = function (data) {
        if(data.length == 1) return data[0].length;
        var answers = {};
        data.forEach(a => {
            a.split('').forEach(q => {                    
                answers[q] = answers[q] || [];
                answers[q].push(q);
            })
        });
        return Object.keys(answers).filter(k => answers[k].length == data.length).length;         
    }

    const solvePart1 = function (data) {
        return data
            .map(a => a.reduce((a,c) => a+c,''))
            .map(q => yesAnyCount(q)).reduce((a,c) => a+c);
    }

    const solvePart2 = function (data) {
        return data.map(q => yesAllCount(q)).reduce((a,c) => a+c);
    }

    const testPart1 = function (data) {
        var total = data
            .map(a => a.reduce((a,c) => a+c,''))
            .map(q => yesAnyCount(q)).reduce((a,c) => a+c);
        console.assert(total == 11);
    }

    const testPart2 = function (data) {
        var total = data.map(q => yesAllCount(q)).reduce((a,c) => a+c);
        console.assert(total == 6);
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