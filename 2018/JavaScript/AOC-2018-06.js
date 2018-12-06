var inputUrl = 'https://adventofcode.com/2018/day/6/input';

var testInput = `
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`

var distanceLimit = 10000;

var parseInput = function(input) {
  //input = testInput; distanceLimit = 32;
  var i = 1;
  return input.trim('\n').split('\n').map(c => { var coord = c.split(', '); return { id: i++, x: parseInt(coord[0]), y: parseInt(coord[1]), area: 0 }});
}

var solvePart1 = function(data) {
    var max = {
      x: data.sort((a,b) => b.x - a.x)[0].x,
      y: data.sort((a,b) => b.y - a.y)[0].y
    },
    infinite = [], closest = {};
    for(var i = 0; i <= max.x; i++) {
      closest[i] = {};
      for(var j = 0; j <= max.y; j++) {
        closest[i][j] = getClosest(i,j,data);
        if(closest[i][j] != 0) {
          data.find(e => e.id === closest[i][j]).area++;
        }
      }
    }
    for(var i = 0; i < max.x; i++) {       
       if(!infinite.includes(closest[i][0])) infinite.push(closest[i][0]);
       if(!infinite.includes(closest[i][max.y])) infinite.push(closest[i][max.y]);
    }
    for(var i = 0; i < max.y; i++) {       
       if(!infinite.includes(closest[0][i])) infinite.push(closest[0][i]);
       if(!infinite.includes(closest[max.x][i])) infinite.push(closest[max.x][i]);
    }
    
    var areas = data.filter(d => !infinite.includes(d.id));
    return areas.sort((a,b) => b.area - a.area)[0].area;
}

var solvePart2 = function(data) {
   var max = {
      x: data.sort((a,b) => b.x - a.x)[0].x,
      y: data.sort((a,b) => b.y - a.y)[0].y
    }, region = [];
    for(var i = 0; i <= max.x; i++) {
      for(var j = 0; j <= max.y; j++) {
        if(getTotalDistance(i,j,data) < distanceLimit) region.push({ x: i, y: j });
      }
    }
    return region.length;
}

var getTotalDistance = function(x,y,coords) {
  return getDistances(x,y,coords).sort((a,b) => a.distance - b.distance).reduce((s,c) => s + c.distance, 0);
}

var getClosest = function(x,y,coords) {
   var distances = getDistances(x,y,coords).sort((a,b) => a.distance - b.distance),
   closest = distances[0];     
   return distances.filter(c => c.distance === closest.distance).length > 1 ? 0 : closest.id;  
}

var getDistances = function(x,y,coords) {
   return coords.map(c => ({ id: c.id, distance: getDistance({ x: c.x, y: c.y}, { x: x, y: y}) }));
}

var getDistance = function(a,b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
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