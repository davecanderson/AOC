var inputUrl = 'https://adventofcode.com/2018/day/3/input';

var reClaim = /^#(\d+?)\s@\s(\d+),(\d+): (\d+)x(\d+)$/;

var parseInput = function(input) {
  var squares = input.trimEnd('\n').split('\n'), plot = {}, claims = {};
  squares.forEach(function(s) {
      var re = reClaim.exec(s);
      claims[re[1]] = { id: re[1], x: parseInt(re[2]), y:parseInt(re[3]), w: parseInt(re[4]), h:parseInt(re[5]) };
  })
  Object.keys(claims).forEach(function(c) {
      plotClaim(plot, claims[c]);
  });
  return { "claims": claims, "plot": plot };
}

var solvePart1 = function(input) {
    var overlap = 0;    
    Object.keys(input.plot).forEach(function(p) {
        if(input.plot[p] === 'X') overlap++;
    });
    return overlap;
}

var solvePart2 = function(input) {
    var uniqueClaim;
    Object.keys(input.claims).forEach(function(c) {
        if(isUniqueClaim(input.plot, input.claims[c])) {
          uniqueClaim = input.claims[c];
        }
    });
    return uniqueClaim.id;
}

var plotClaim = function(plot, claim) {
    for(i = 1; i <= claim.w; i++) {
        for(j = 1; j <= claim.h; j++) {
            var coord = (claim.x+i) + '-' + (claim.y+j);
            if(plot[coord]) {
                plot[coord] = 'X';   
            } else {
                plot[coord] = claim.id;
            }
        }
    }
}

var isUniqueClaim = function(plot, claim) {
    for(i = 1; i <= claim.w; i++) {
        for(j = 1; j <= claim.h; j++) {
            var coord = (claim.x+i) + '-' + (claim.y+j);
            if(plot[coord] === 'X') {
                return false;
            }
        }
    }
    return true;
}

var solve = function(input) {
  var inputs = parseInput(input);
  console.log('Part 1 Answer: %s', solvePart1(inputs));
  console.log('Part 2 Answer: %s', solvePart2(inputs));
}

var testInput = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2";

fetch(inputUrl)
  .then(res => res.text())
  .then(res => {
      solve(res);
  })
