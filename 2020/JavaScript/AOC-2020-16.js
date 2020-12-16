(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '16';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput1 = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

    const testInput2 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

    const parseInput = function (input) {
        var i = input.trim().split('\n\n');
        return {
            rules: i[0].split('\n').map(l => {
                var ranges = l.match(/\d+-\d+/g).map(m => { 
                    var r = m.split('-'); 
                    return { min: parseInt(r[0]), max: parseInt(r[1]) }
                })
                return { 
                    name: l.split(':')[0],
                    isValid: function(v) {
                        return ranges.some(r => r.min <= v && v <= r.max);
                    }
                }
            }),
            ticket: i[1].split('\n')[1].split(',').map(l => parseInt(l)),
            tickets: i[2].split('\n').slice(1).map(l => l.split(',').map(l => parseInt(l)))
        }
    }

    const solvePart1 = function (data) {
        var invalid = data.tickets.map(ticket => ticket.filter(value => !data.rules.some(rule => rule.isValid(value))));
        return invalid.flat().reduce((a,c) => a+c);
    }

    const solvePart2 = function (data, re) {
        var ticketLength = data.tickets[0].length;
        var validTickets = data.tickets.map(ticket => ticket.filter(value => data.rules.some(rule => rule.isValid(value)))).filter(l => l.length === ticketLength);
        var pos = [];
        for(var i = 0; i < ticketLength; i++) {
            var values = validTickets.map(t => t[i]);
            var rules = data.rules.filter(r => values.every(v => r.isValid(v)));
            pos.push(rules);
        }
        while(pos.some(p => p.length > 1)) {
            var found = pos.filter(p => p.length == 1).map(f => f[0]);
            pos.filter(p => p.length > 1).forEach(p => 
                found.forEach(f => {
                    var idx = p.indexOf(f)
                    if(idx >= 0) p.splice(idx,1);
                })
            );            
        }
        return pos.flat().map((r,i) => { r.val = data.ticket[i]; return r}).filter(r => re.test(r.name)).reduce((a,c) => a*c.val, 1);
    }

    const testPart1 = function (data) {
        var a = solvePart1(data);
        console.assert(a == 71);
    }

    const testPart2 = function (data) {
        var a = solvePart2(data, /.*/);
        console.assert(a == 1716);
    }

    const test = function () {
        testPart1(parseInput(testInput1));
        testPart2(parseInput(testInput2));
    }

    const solve = function (input) {
        var data = parseInput(input);
        console.log('Part 1 Answer: %s', solvePart1(data));
        console.log('Part 2 Answer: %s', solvePart2(data, /departure/));
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