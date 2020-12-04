(function () {
    'use strict'

    const site = 'https://adventofcode.com';
    const year = '2020';
    const day = '4';
    const path = `${year}/day/${day}/input`;
    const url = `${site}/${path}`;

    const testInput = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

    const testInvalid = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

    const testValid = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

    const parseInput = function (input) {
        var passports = [[]];
        input.trim().split('\n').forEach(l => {
            if(l.trim()=='') {
                passports.push([]);
            } else {
                l.match(/(\w*):([^\s]*)/gm).forEach(m => {
                    passports[passports.length-1].push(m.trim());                    
                })
            }
        }); 
        return passports;       
    }

    const isValidPassport = function (passport) {
        if(passport.length == 8) return true;
        if(passport.length == 7) return passport.map(p => p.split(':')[0] ).indexOf('cid') < 0;
        return false;
    }

    const hasValidValues = function  (passport) {
        var values = {};
        passport.forEach(p => {
            var p = p.split(':');
            values[p[0]] = p[1];
        })
        
        values.byr = parseInt(values.byr);
        if(isNaN(values.byr) || values.byr < 1920 || values.byr > 2002) return false;

        values.iyr = parseInt(values.iyr);
        if(isNaN(values.iyr) || values.iyr < 2010 || values.iyr > 2020) return false;

        values.eyr = parseInt(values.eyr);
        if(isNaN(values.eyr) || values.eyr < 2020 || values.eyr > 2030) return false;

        if(/\d+(cm|in)/.test(values.hgt)) {
            var h = parseInt(values.hgt);
            if(/cm/.test(values.hgt) && (h < 150 || h > 193)) return false;
            if(/in/.test(values.hgt) && (h < 59 || h > 76)) return false;
        } else {
            return false;
        }

        if(!/#[0-9abcdef]{6}/.test(values.hcl)) return false;
        if(!/(amb|blu|brn|gry|grn|hzl|oth)/.test(values.ecl)) return false;
        if(!/^[0-9]{9}$/.test(values.pid)) return false;

        return true;
    }

    const countValidPassports = function (passports) {
        return passports.map(p => isValidPassport(p)).reduce((a,c) => { if(c) a++; return a; },0);
    }

    const countValidValuePassports = function (passports) {
        return passports.map(p => { 
            if(isValidPassport(p)) 
                return hasValidValues(p); 
        }).reduce((a,c) => { if(c) a++; return a; },0);
    }

    const solvePart1 = function (data) {
        return countValidPassports(data);
    }

    const solvePart2 = function (data) {
        return countValidValuePassports(data);
    }

    const testPart1 = function (data) {
        console.assert(countValidPassports(data) == 2);
    }

    const testPart2Invalid = function (data) {
        console.assert(countValidValuePassports(data) == 0);
    }

    const testPart2Valid = function (data) {
        console.assert(countValidValuePassports(data) == 4);
    }

    const test = function () {
        testPart1(parseInput(testInput));
        testPart2Invalid(parseInput(testInvalid));
        testPart2Valid(parseInput(testValid));
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