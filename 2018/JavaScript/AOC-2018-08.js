var inputUrl = 'https://adventofcode.com/2018/day/8/input';

var testInput = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

var parseInput = function(input) {
  //input = testInput;
  return input.trim().split(' ').map(i => parseInt(i));
}

function getNode(input) {
    var node = {
        header: input[0] + ' ' + input[1],
        children: new Array(input[0]),
        meta:  new Array(input[1]),
        get length() {
            return this.children.reduce((s,c) => s + c.length, 2) + this.meta.length;
        },
        get sum() {
            var s = this.meta.reduce((s,m) => s + m, 0);
            return this.children.reduce((s,c) => s + c.sum, s);
        },
        get value() {
            if(this.children.length) {
              var values = this.meta.map(m => this.children[m-1] || { value: 0 });
              return values.reduce((s,m) => s + m.value, 0);
            } else {
              return this.sum;
            }
        }    
    };

    for(var c = 0; c < node.children.length; c++) {
        node.children[c] = getNode(input.slice(node.length - node.meta.length));
    }

    for(var m = 0; m < node.meta.length; m++) {
        node.meta[m] = input[node.length - node.meta.length + m]; 
    }

    return node;
}

var solvePart1 = function(data) {
    var root = getNode(data);
    return root.sum;
}

var solvePart2 = function(data) {
    var root = getNode(data);
    return root.value;
}

var solve = function(input) {
  var data = parseInput(input);
  console.log('Part 1 Answer: %s', solvePart1(data));
  console.log('Part 2 Answer: %s', solvePart2(data));
}

fetch(inputUrl)
  .then(res => res.text())
  .then(res => {
      solve(res);
  })
