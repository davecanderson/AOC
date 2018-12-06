var inputUrl = 'https://adventofcode.com/2018/day/4/input';

var testInput = `
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up
`;

var reGuardTime = /^\[\d{4}-\d{2}-\d{2}\s\d{2}:(\d{2})\]/;
var reGuardId = /Guard\s#(\d+)\s/;

var parseInput = function(input) {
  //input = testInput;
  var log = input.trim('\n').split('\n'), guardLog = {}, id, shift;
  
  log.sort().forEach(function(l){
      if(reGuardId.test(l)) {
        if(shift) {
          shift.sleepString = getShiftSleep(shift);
          shift.sleepTotal = getShiftSleepTotal(shift.sleepString);
          guardLog[id].shifts.push(shift);                  
        }
        id = l.match(reGuardId)[1]; 
        guardLog[id] = guardLog[id] || { id: id, shifts: [] };
        shift = { sleep: [] };
      } else {
        shift.sleep.push(parseInt(l.match(reGuardTime)[1]));
      }      
  });

  return Object.keys(guardLog).map(k => ({ 
    id: guardLog[k].id, 
    shifts: guardLog[k].shifts, 
    totalSleep: guardLog[k].shifts.reduce((s,i) => (s + i.sleepTotal), 0),
    sleepMinutes: getSleepMinutes(guardLog[k].shifts).sort((a,b) => b.total - a.total)
   }));
}


var solvePart1 = function(input) {
    input = input.sort((a,b) => b.totalSleep - a.totalSleep);
    var guard = input[0];
    return guard.id * guard.sleepMinutes.sort((a,b) => b.total - a.total)[0].minute;
}

var solvePart2 = function(input) {
    input = input.sort((a,b) => b.sleepMinutes[0].total - a.sleepMinutes[0].total);
    var guard = input[0];
    return guard.id * guard.sleepMinutes[0].minute;
}

var getShiftSleep = function(shift) {
    var sleeping = '', state = 0;
    for(var i = 0; i < 60; i++) {
        if(i == shift.sleep[0]) {
            shift.sleep = shift.sleep.slice(1);
            state = (state+1)%2;
        }
        sleeping += state.toString();        
    }
    return sleeping;
}

var getShiftSleepTotal = function(sleep) {
    var total = 0;
    sleep.split('').forEach(function(c) {
        total += parseInt(c);
    })
    return total;
}

var getSleepMinutes = function(shifts) {
    var sleep = new Array(60).fill(0);
    for(var i = 0; i < 60; i++) {
      for(var s = 0; s < shifts.length; s++){
        if(shifts[s].sleepString.charAt(i) === '1') sleep[i]++;
      }   
    }
    var i = 0;
    return sleep.map(s => ({ minute: i++, total: s}));
}

var solve = function(input) {
  var data = parseInput(input);
  console.log(data);
  console.log('Part 1 Answer: %O', solvePart1(data));
  console.log('Part 2 Answer: %s', solvePart2(data));
}

fetch(inputUrl)
  .then(res => res.text())
  .then(res => {
      solve(res);
  })
