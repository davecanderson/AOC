var input = [459, 71790];

function player() {
    return {
        marbles: [],
        get score() {
            return this.marbles.reduce((s,m) => s + m, 0);
        }
    }
}

function marbleCircle() {
    return {
        marbles: [0],
        currentMarble: 0,
        get log() {
            return this.marbles.map((m, i) => (i == this.currentMarble) ? ('(' + m).padStart(3, ' ') + ')' : ' ' + m.toString().padStart(2, ' ').padEnd(3,' ')).join(''); 
        },
        place: function(m) {      
            var idx = (this.currentMarble + 2)%this.marbles.length;
            this.marbles.splice(idx, 0, m);
            this.currentMarble = this.marbles.indexOf(m);
        },
        remove: function() {
            this.currentMarble = this.currentMarble > 7 ? this.currentMarble - 7 : (this.currentMarble - 7) + this.marbles.length;
            return this.marbles.splice(this.currentMarble, 1)[0];

        }
    }
}

var placeMarble = function(m, player) {
    
}

var highScore = function(playerCount, lastPoint) {
    console.log('%i players; last marble is worth %i points', playerCount, lastPoint);

    var players = Array.from({ length: playerCount }, p => new player());
    var circle = new  marbleCircle();

    //console.log('[-] %s', circle.log);

    for(var m = 1; m <= lastPoint; m++) {
        var p = m%(playerCount);
        if(m%23===0) {
            players[p].marbles.push(m);
            players[p].marbles.push(circle.remove(m));
        } else {
            circle.place(m);
        }
        //console.log('[%i] %s', p == 0 ? playerCount : p, circle.log);
    }

    //console.log('%O', players);
    
    var winner = players.sort((a,b) => b.score - a.score)[0];

    console.log('Winner scores: %i', winner.score);
    
    return winner.score;
}

var solvePart1 = function() {
    return highScore.apply(null, input); 
}

var solvePart2 = function() {
   return highScore.apply(null, [input[0], input[1]*100]); 
}

var solve = function() {
  console.log('Part 1 Answer: %s', solvePart1());
  console.log('Part 2 Answer: %s', solvePart2());
}

console.assert(highScore(9, 25) == 32);
console.assert(highScore(10, 1618) == 8317);
console.assert(highScore(13, 7999) == 146373);
console.assert(highScore(17, 1104) == 2764);
console.assert(highScore(21, 6111) == 54718);
console.assert(highScore(30, 5807) == 37305);

solve();