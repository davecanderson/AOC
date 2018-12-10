var inputUrl = 'https://adventofcode.com/2017/day/9/input';

var parseInput = function(input) {
  var data = input.trim('\n'),
      length = data.length,
      group = { garbage: '', garbageCollection: [] };

    for(var i = 0; i < length; i++) {
        var c = data.charAt(i);

        if(c === '!') { 
            i++; 
            continue; 
        }

        if(group.garbage) {
            if(c === '>') {
                group.garbageCollection.push(group.garbage.substring(1));
                group.garbage = '';
            } else {
                group.garbage += c;
            }
            continue;
        }

        switch(c) {
            case '{':
                if(group.children) {
                    group.children.push((group = new Group(group)));                                
                } else {
                    group = new Group();
                }
                break;
            case '}':
                group = group.parent || group;
                break;
            case '<':
                group.garbage += '<';
                break;
            default:
                group.content += c;
                break;
        }
    }

    while(group.parent) {
        group = group.parent;
    }
    
    return group;
}

function Group(parent) {
    function score(group) { 
        var s = 1, parent = group.parent;
        while(parent) { s++; parent = parent.parent; }
        if(group.children && group.children.length > 0) {
            group.children.forEach(c => s += c.score);
        }
        return s;
    }
    function garbageSize(group) { 
        var s = 0;
        group.garbageCollection.forEach(g => s += g.length);
        if(group.children && group.children.length > 0) {
            group.children.forEach(c => s += c.garbageSize);
        }
        return s;
    }
    return {
        get score() {
            return score(this);
        },
        get garbageSize() {
            return garbageSize(this);
        },
        parent: parent, 
        children: [], 
        content: '', 
        garbage: '',
        garbageCollection: [] 
    };
}

var solvePart1 = function(data) {
  return data.score;
}

var solvePart2 = function(data) {
  return data.garbageSize;
}

var solve = function(input) {
  var data = parseInput(input);  
  console.log('Part 1 Answer: %s', solvePart1(data));
  console.log('Part 2 Answer: %s', solvePart2(data));
}

console.assert(solvePart1(parseInput('{}')) == 1);
console.assert(solvePart1(parseInput('{{{}}}')) == 6);
console.assert(solvePart1(parseInput('{{},{}}')) == 5);
console.assert(solvePart1(parseInput('{{{},{},{{}}}}')) == 16);
console.assert(solvePart1(parseInput('{<a>,<a>,<a>,<a>}')) == 1);
console.assert(solvePart1(parseInput('{{<ab>},{<ab>},{<ab>},{<ab>}}')) == 9);
console.assert(solvePart1(parseInput('{{<!!>},{<!!>},{<!!>},{<!!>}}')) == 9);
console.assert(solvePart1(parseInput('{{<a!>},{<a!>},{<a!>},{<ab>}}')) == 3);

console.assert(solvePart2(parseInput('{<>}')) == 0);
console.assert(solvePart2(parseInput('{<random-characters>}')) == 17);
console.assert(solvePart2(parseInput('{<<<<>}') == 3));
console.assert(solvePart2(parseInput('{<{!>}>}') == 2));
console.assert(solvePart2(parseInput('{<!!>}') == 0));
console.assert(solvePart2(parseInput('{<!!!>>}') == 0));
console.assert(solvePart2(parseInput('{<{o"i!a,<{i<a>}') == 10));

fetch(inputUrl)
  .then(res => res.text())
  .then(res => {
      solve(res);
  })
