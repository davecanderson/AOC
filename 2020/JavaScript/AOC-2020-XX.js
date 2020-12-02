(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = 'X';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./aoc');
    }

    const testInput1 = ``;
    const testInput2 = ``;

    const parseInput = function (input) {
        return input.trim().split('\n');
    }

    const solvePart1 = function (data) {

    }

    const solvePart2 = function (data) {
        
    }

    const testPart1 = function (data) {

    }

    const testPart2 = function (data) {

    }

    const test = function () {
        testPart1(parseInput(testInput1));
        testPart2(parseInput(testInput2));
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
    //run();

})();