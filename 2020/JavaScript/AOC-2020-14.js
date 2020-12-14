(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '14';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput1 = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

    const testInput2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

    const reMask = /[10X]{36}$/;

    const parseInput = function (input) {
        return input.trim().split('\n');
    }

    const getInstructon = function(i) {
        var m = i.split(' = ')
        return { 
            mem: parseInt(m[0].replace('mem[','').replace(']','')), 
            val: parseInt(m[1]) 
        };
    }

    const setMemory = function (mask, val) {
        var bitmask = mask.split('');
        var binval = val.toString(2).padStart(bitmask.length, '0').split('');
        var mem = binval.map((v,i) => { if(bitmask[i] !== 'X') return bitmask[i]; return v; }).join('');
        return parseInt(mem, 2);
    }

    const setFloatingMemory = function (mem, mask, instr) {
        var bitmask = mask.split('');
        var binval = instr.mem.toString(2).padStart(bitmask.length, '0').split('');
        var address = binval.map((v,i) => { 
            if(bitmask[i] === '0') return binval[i];
            return bitmask[i];
        });
        var addresses = [address.join('')];
        while(!addresses.every(m => m.indexOf('X') < 0)) {
            var a = [];
            addresses.forEach(m => {
                a.push(m.replace(/X/,'0'));
                a.push(m.replace(/X/,'1'));
            });
            addresses = a;
        }
        addresses.forEach(a => mem[parseInt(a, 2)] = instr.val);
    }

    const solvePart1 = function (data) {
        var mem = {}, mask = data[0].match(reMask)[0];
        data.forEach(i => {
            if(reMask.test(i)) {
                mask = i.match(reMask)[0];
            } else {
                var instr = getInstructon(i);
                mem[instr.mem] = setMemory(mask, instr.val);               
            }
        });
        return Object.keys(mem).reduce((a,c) => a + mem[c], 0);
    }

    const solvePart2 = function (data) {
        var mem = {}, mask = data[0].match(reMask)[0];
        data.forEach(i => {
            if(reMask.test(i)) {
                mask = i.match(reMask)[0];
            } else {
                var instr = getInstructon(i);
                setFloatingMemory(mem, mask, instr);               
            }
        });
        return Object.keys(mem).reduce((a,c) => a + mem[c], 0);
    }

    const testPart1 = function (data) {
        var mask = data[0].match(reMask)[0]
        console.assert(setMemory(mask, 11) === 73);
        console.assert(setMemory(mask, 101) === 101);
        console.assert(setMemory(mask, 0) === 64);

        var a = solvePart1(data);
        console.assert(a == 165);
    }

    const testPart2 = function (data) {
        var a = solvePart2(data);
        console.assert(a == 208);
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
    run();

})();