use std::{
    fs::File,
    io::{self, BufRead, BufReader},
    path::Path,
};

const YEAR: i32 = 2021;
const DAY: i32 = 2;

struct Instruction {
    direction: String,
    distance: i32
}
    
fn lines_from_file(filename: impl AsRef<Path>) -> io::Result<Vec<String>> {
    BufReader::new(File::open(filename)?).lines().collect()
}

fn parse_input(s: Vec<String>) -> Vec<Instruction> {
    return s.iter().map(|x| create_instruction(x)).collect() 
}

fn create_instruction(s: &String) -> Instruction {
    let s: Vec<&str> = s.split(' ').collect();
    return Instruction { 
        direction: s[0].to_string(), 
        distance: s[1].parse::<i32>().unwrap()
    };
}

fn find_answer_1(data: &Vec<Instruction>) -> i32 {
    let mut depth = 0;
    let mut distance = 0;
    for(_i, item) in data.iter().enumerate() {
        match item.direction.as_str() {
            "forward" => { distance += &item.distance; }
            "up" => { depth -= &item.distance; }
            "down" => { depth += &item.distance; }
            _ => println!("instruction mismatch")
        }
    }
    return depth * distance;
}

fn find_answer_2(data: &Vec<Instruction>) -> i32 {
    let mut depth = 0;
    let mut distance = 0;
    let mut aim = 0;
    for(_i, item) in data.iter().enumerate() {
        match item.direction.as_str() {
            "forward" => { 
                distance += &item.distance;
                depth += &item.distance * aim;
            }
            "up" => { aim -= &item.distance; }
            "down" => { aim += &item.distance; }
            _ => println!("instruction mismatch")
        }
    }
    return depth * distance;
}

fn main() {
    let filename = format!("..\\..\\scratch\\{}-{:0>2}-input.txt", YEAR, DAY);

    println!("AOC {}/{:0>2}", YEAR, DAY);

    let data = lines_from_file(&filename)
        .expect(format!("Unable  to read {}", &filename).as_str());

    let input = parse_input(data);

    println!("Part 1 Answer: {}", find_answer_1(&input));

    println!("Part 2 Answer: {}", find_answer_2(&input));
}