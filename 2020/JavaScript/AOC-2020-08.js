(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '8';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

    const parseInput = function (input) {
        return input.trim().split('\n').map(l => {
             var cmd = l.split(' '); 
             return { instr: cmd[0], val: parseInt(cmd[1]) };
            });
    }

    const exec = function (cmdList) {
        var acc = 0, ptr = 0, pos = [];
        function op(cmd) {
            switch(cmd.instr) {
                case 'jmp':
                    return cmd.val;
                case 'acc':
                    acc += cmd.val;
                default:
                    return 1;
            }
        }
        while(pos.indexOf(ptr) < 0 && ptr < cmdList.length) {
            pos.push(ptr);
            ptr += op(cmdList[ptr]);
        }
        return { acc: acc, ptr: ptr };
    }

    const solvePart1 = function (data) {
        return exec(data).acc;
    }

    const solvePart2 = function (data) {
        var cmds, result;
        for(var c = 0; c < data.length; c++) {
            if(data[c] != 'acc') {
                cmds = [];
                data.forEach(d => cmds.push({ instr: d.instr, val: d.val })); 
                if(data[c].instr == 'jmp') cmds[c].instr = 'nop';
                if(data[c].instr == 'nop') cmds[c].instr = 'jmp';            
                result = exec(cmds);
                if(result.ptr == cmds.length) return result.acc;
            }
        }
    }

    const testPart1 = function (data) {
        var a = solvePart1(data);
        console.assert(a == 5);
    }

    const testPart2 = function (data) {
        var a = solvePart2(data);
        console.assert(a == 8);
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