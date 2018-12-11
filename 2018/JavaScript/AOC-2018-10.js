var output,
    inputUrl = 'https://adventofcode.com/2018/day/10/input',
    squareInput = `
position=< 0,  0> velocity=< 0,  0>
position=< 1,  0> velocity=< 0,  0>
position=< 0,  1> velocity=< 0,  0>
position=< 1,  1> velocity=< 0,  0>
position=< 0, -1> velocity=< 0,  0>
position=<-1,  0> velocity=< 0,  0>
position=<-1, -1> velocity=< 0,  0>
position=<-1,  1> velocity=< 0,  0>
position=< 1, -1> velocity=< 0,  0>
    `,    
    testInput = `
position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>
`;

function point(position, velocity) {
    var span = window.document.createElement('span');
    output.appendChild(span);
    span.textContent = '*';
    
    var p = {
        x: position[0],
        y: position[1],
        velocity: { 
            x: velocity[0],
            y: velocity[1]
        },
        move: function() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.position(this.x, this.y);
        },
        unmove: function() {
            this.x -= this.velocity.x;
            this.y -= this.velocity.y;
            this.position(this.x, this.y);
        },
        position: function(x,y) {            
            span.setAttribute('style','position: absolute; display: inline-block; text-align: center; height: 12px; width: 12px; top: ' + (x*12) + 'px; left: ' + (y*12) + 'px;');
        }
    }

    p.position(p.x,p.y);

    return p;
}

var parseInput = function(input) {
  //input = testInput;
  var points = input.trim().split('\n').map(i => i.match(/([0-9\-\s]*,[0-9\-\s]*)/g));
  return points.map(p => { 
    var pos = p[0].split(','), 
        vel = p[1].split(','); 
    return new point([parseInt(pos[1]), parseInt(pos[0])],[parseInt(vel[1]),parseInt(vel[0])])
  });
}

var boundedArea = function (points) {
    var width = Math.max(...points.map(d => d.x)) - Math.min(...points.map(d => d.x)),
        height = Math.max(...points.map(d => d.y)) - Math.min(...points.map(d => d.y));

    return width*height;
}

var solvePart1 = function(data) {
    var minArea = Number.POSITIVE_INFINITY,
        area = boundedArea(data),
        seconds = 0;

    while(area < minArea) {
        minArea = area;
        data.forEach(d => d.move());
        area = boundedArea(data);
        seconds++;
    }
    
    console.log("Message After %i Seconds", seconds--);

    data.forEach(d => d.unmove());
}

var solve = function(input) {
  var data = parseInput(input);
  solvePart1(data);
}

fetch(inputUrl)
  .then(res => res.text())
  .then(res => {
      window.document.getElementsByTagName('body')[0].innerHTML = "<div style='position: absolute; height: 0px; width: 0px; top: 50%; left: 50%;'></div>";
      output = window.document.getElementsByTagName('div')[0];
      solve(res, output);
  })
