use std::{
    fs::File,
    io::{self, BufRead, BufReader},
    path::Path,
};

const YEAR = 2021;
const DAY = 0;
    
fn lines_from_file(filename: impl AsRef<Path>) -> io::Result<Vec<String>> {
    BufReader::new(File::open(filename)?).lines().collect()
}

fn parse_input(s: &Vec<String>) -> Vec<i32> {
    return s.iter().map(|x| x.parse::<i32>().unwrap()).collect() 
}

fn find_answer_1(data: &Vec<i32>) -> i32 {
    return 0;
}

fn find_answer_2(data: &Vec<i32>) -> i32 {
    return 0;
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