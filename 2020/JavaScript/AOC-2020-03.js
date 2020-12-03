(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '3';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

    const parseInput = function (input) {
        return input.trim().split('\n');
    }

    const countTrees = function(data, slope) {
        var pos = { x: 0, y: 0}, trees = 0;
        for(var r = 0; r < data.length; r++) {
            pos.x += slope.x;
            pos.x = pos.x % data[r].length;
            pos.y += slope.y;
            if(pos.y >= data.length) continue;
            if(data[pos.y].charAt(pos.x) == '#') trees++;
        }
        return trees;
    }

    const totalTrees = function(data) {
        var slopes = [
           { x: 1, y: 1},
           { x: 3, y: 1},
           { x: 5, y: 1},
           { x: 7, y: 1},
           { x: 1, y: 2}
        ];
        var treeCount = slopes.map(s => countTrees(data, s));
        return treeCount.reduce((a,c) => { return a * c; }, 1);
    }

    const solvePart1 = function (data) {
        return countTrees(data, { x: 3, y: 1});
    }

    const solvePart2 = function (data) {
        return totalTrees(data);
    }

    const testPart1 = function (data) {
        console.assert(countTrees(data, { x: 3, y: 1}) == 7);
    }

    const testPart2 = function (data) {
        console.assert(totalTrees(data) == 336);
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