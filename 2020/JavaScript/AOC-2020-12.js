(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '12';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = `F10
N3
F7
R90
F11`;

    const parseInput = function (input) {
        return input.trim().split('\n').map(l => { return { dir: l.charAt(0), val: parseInt(l.substr(1)) } });
    }

    const steerShip = function (ship, dir, degrees) {
        switch(degrees) {
            case 180:
                if(ship.dir === 'N') { ship.dir = 'S'; break; }
                if(ship.dir === 'S') { ship.dir = 'N'; break; }
                if(ship.dir === 'E') { ship.dir = 'W'; break; }
                if(ship.dir === 'W') { ship.dir = 'E'; break; }
            case 90:
                if((ship.dir === 'N' && dir === 'L') || (ship.dir === 'S' && dir === 'R')) { ship.dir = 'W'; break; }
                if((ship.dir === 'S' && dir === 'L') || (ship.dir === 'N' && dir === 'R')) { ship.dir = 'E'; break; }
                if((ship.dir === 'E' && dir === 'L') || (ship.dir === 'W' && dir === 'R')) { ship.dir = 'N'; break; }
                if((ship.dir === 'W' && dir === 'L') || (ship.dir === 'E' && dir === 'R')) { ship.dir = 'S'; break; }
            case 270:
                if((ship.dir === 'N' && dir === 'L') || (ship.dir === 'S' && dir === 'R')) { ship.dir = 'E'; break; }
                if((ship.dir === 'S' && dir === 'L') || (ship.dir === 'N' && dir === 'R')) { ship.dir = 'W'; break; }
                if((ship.dir === 'E' && dir === 'L') || (ship.dir === 'W' && dir === 'R')) { ship.dir = 'S'; break; }
                if((ship.dir === 'W' && dir === 'L') || (ship.dir === 'E' && dir === 'R')) { ship.dir = 'N'; break; }
        }
    }

    const moveWaypoint = function (waypoint, dir, degrees) {
        var x = waypoint.x, y = waypoint.y;
        switch(degrees) {
            case 180:
                waypoint.x *= -1;
                waypoint.y *= -1;
                break;
            case 90:
                if(dir === 'R') {
                    waypoint.x = y * -1;
                    waypoint.y = x;
                } else {
                    waypoint.x = y;
                    waypoint.y = x * -1;
                }
                break;
            case 270:
                if(dir === 'L') {
                    waypoint.x = y * -1;
                    waypoint.y = x;
                } else {
                    waypoint.x = y;
                    waypoint.y = x * -1;
                }
                break;
        }
    }

    const moveShip = function (ship, action) {
        var dir = action.dir === 'F' ? ship.dir : action.dir;
        switch(dir) {
            case 'N':
                ship.y -= action.val;
                break;
            case 'S':
                ship.y += action.val;
                break;
            case 'E':
                ship.x += action.val;
                break;
            case 'W':
                ship.x -= action.val;
                break;
            default:
                steerShip(ship, dir, action.val);            
                break;
        }
    }

    const moveShipByWaypoint = function (ship, action, waypoint) {
        if(action.dir === 'F') {
            ship.x += action.val * waypoint.x;
            ship.y += action.val * waypoint.y;
        } else {
            switch(action.dir) {
                case 'N':
                    waypoint.y -= action.val;
                    break;
                case 'S':
                    waypoint.y += action.val;
                    break;
                case 'E':
                    waypoint.x += action.val;
                    break;
                case 'W':
                    waypoint.x -= action.val;
                    break;
                default:
                    moveWaypoint(waypoint, action.dir, action.val);            
                    break;
            }
        }
    }

    const solvePart1 = function (data) {
        var ship = { dir: 'E', x: 0, y: 0 };
        data.forEach(a => {
            moveShip(ship, a);
        })
        return Math.abs(ship.x) + Math.abs(ship.y);
    }

    const solvePart2 = function (data, time) {
        var ship = { x: 0, y: 0 }, waypoint = { x: 10, y: -1 };
        data.forEach(a => {
            moveShipByWaypoint(ship, a, waypoint);
        })
        return Math.abs(ship.x) + Math.abs(ship.y);
    }

    const testPart1 = function (data) {
        var a = solvePart1(data);
        console.assert(a == 25);
    }

    const testPart2 = function (data) {
        var a = solvePart2(data);
        console.assert(a == 286);
    }

    const test = function () {
        var data = parseInput(testInput);
        testPart1(data);
        testPart2(data);
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