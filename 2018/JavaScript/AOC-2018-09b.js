var input = [459, 71790];

function player() {
    return {
        marbles: [],
        get score() {
            return this.marbles.reduce((s,m) => s + m, 0);
        }
    }
}

function marble(value) {
    var m = {
        value: value,
        insert: function(m) {
            m.prev = this.next;
            m.next = this.next.next;
            this.next.next.prev = m;
            this.next.next = m;
            return m;
        },
        score: function(marbles) {
            var m = this.prev.prev.prev.prev.prev.prev.prev;
            m.prev.next = m.next;
            m.next.prev = m.prev.next;
            marbles.push(m.value);
            return m.next;
        }
    }

    m.prev = m;
    m.next = m;
    
    return m;    
}

marble.prototype.toString = function () { return this.value; }

var placeMarble = function(m, player) {
    
}

var highScore = function(playerCount, lastPoint) {
    console.log('%i players; last marble is worth %i points', playerCount, lastPoint);

    var players = Array.from({ length: playerCount }, p => new player());
    var currentMarble = new marble(0);

    for(var m = 1; m <= lastPoint; m++) {
        var p = m%playerCount;
        if(m%23===0) {
            players[p].marbles.push(m);
            currentMarble = currentMarble.score(players[p].marbles);
        } else {
            currentMarble = currentMarble.insert(new marble(m));
        }
    }
    
    var winner = players.sort((a,b) => b.score - a.score)[0];
    
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