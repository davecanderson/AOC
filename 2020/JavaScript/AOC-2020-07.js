(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '7';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput1 = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;


    const testInput2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

    const myBag = 'shinygold';
        
    const parseInput = function (input) {
        var bags = {};
        input.trim().split('\n').map(l => createBag(l)).forEach(b => {
            bags[b.color] = b.contains;
        });
        return bags;
    }

    const createBag = function(l) {
        var p = l.split('contain')
        return {
            color: p[0].replace('bags','').replace(/\s/g,''),
            contains: p[1].split(',').reduce((a,c) => {
                var m = /(\d+)\s(.*)bags?/.exec(c);
                if(m) a[m[2].replace(/\s/g,'')] = parseInt(m[1]);
                return a
            }, {})
        }
    }

    const solvePart1 = function (data) {
        function getHoldingBags(bag) {            
            return Object.keys(data).filter(b => data[b].hasOwnProperty(bag));
        }
        function getBagCount(bag) {
            var bags = getHoldingBags(bag);
            if(bags.length) {
                return bags.reduce((a,c) => a.concat(getBagCount(c)), bags);
            } else {
                return bags;
            }            
        }
        return getBagCount(myBag).filter((v,i,s) => s.indexOf(v) === i);
    }

    const solvePart2 = function (data) {
        function getBags(bag) {
            var bags = Object.keys(data[bag]);
            if(bags.length) {
                return 1 + bags.reduce((a,c) => a += data[bag][c] * getBags(c), 0);         
            } else {
                return 1;
            }
        }
        return getBags(myBag) -1;
    }

    const testPart1 = function () {
        var a = solvePart1(parseInput(testInput1));
        console.assert(a.length == 4);
    }

    const testPart2 = function () {
        var a1 = solvePart2(parseInput(testInput1));
        var a2 = solvePart2(parseInput(testInput2));
        console.assert(a1 == 32);
        console.assert(a2 == 126);
    }

    const test = function () {
        testPart1();
        testPart2();
    }

    const solve = function (input) {
        var data = parseInput(input);
        console.log('Part 1 Answer: %s', solvePart1(data).length);
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