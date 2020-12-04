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
        return input.split('\n\n')
            .map(p => p.match(/(\w{3}:[^\s]*)/g))
            .map(p => p.reduce((a,c) => { 
                var v = c.split(':'); 
                a[v[0]] = v[1]; 
                return a; 
              }, {})
            );       
    }

    const isValidPassport = function (passport) {
        var keys = Object.keys(passport);
        if(keys.length == 8) return true;
        if(keys.length == 7) return typeof passport['cid'] == 'undefined';
        return false;
    }

    const hasValidValues = function  (passport) {
      
        passport.byr = parseInt(passport.byr);
        if(isNaN(passport.byr) || passport.byr < 1920 || passport.byr > 2002) return false;

        passport.iyr = parseInt(passport.iyr);
        if(isNaN(passport.iyr) || passport.iyr < 2010 || passport.iyr > 2020) return false;

        passport.eyr = parseInt(passport.eyr);
        if(isNaN(passport.eyr) || passport.eyr < 2020 || passport.eyr > 2030) return false;

        if(/\d+(cm|in)/.test(passport.hgt)) {
            var h = parseInt(passport.hgt);
            if(/cm/.test(passport.hgt) && (h < 150 || h > 193)) return false;
            if(/in/.test(passport.hgt) && (h < 59 || h > 76)) return false;
        } else {
            return false;
        }

        if(!/#[0-9abcdef]{6}/.test(passport.hcl)) return false;
        if(!/(amb|blu|brn|gry|grn|hzl|oth)/.test(passport.ecl)) return false;
        if(!/^[0-9]{9}$/.test(passport.pid)) return false;

        return true;
    }

    const countValidPassports = function (passports) {
        return passports.filter(p => isValidPassport(p)).length;
    }

    const countValidValuePassports = function (passports) {
        return passports.filter(p => isValidPassport(p) && hasValidValues(p)).length;
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