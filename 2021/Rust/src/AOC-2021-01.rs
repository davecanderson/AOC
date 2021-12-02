use std::{
    fs::File,
    io::{self, BufRead, BufReader},
    path::Path,
};

fn lines_from_file(filename: impl AsRef<Path>) -> io::Result<Vec<String>> {
    BufReader::new(File::open(filename)?).lines().collect()
}

fn main() {
    let year = 2021;
    let day = 1;
    let filename = format!("..\\..\\scratch\\{}-{:0>2}-input.txt", year, day);

    println!("AOC {}/{:0>2}", year, day);

    let data = lines_from_file(&filename)
        .expect(format!("Unable  to read {}", &filename).as_str());

    let depth = find_depth(&parse_input(&data), 1);

    println!("Part 1 Answer: {}", depth);

    let depth = find_depth(&parse_input(&data), 3);

    println!("Part 2 Answer: {}", depth);
}

fn parse_input(s: &Vec<String>) -> Vec<i32> {
   return s.iter().map(|x| x.parse::<i32>().unwrap()).collect() 
}

fn find_depth(data: &Vec<i32>, incr: usize) -> i32 {
    let mut depth = 0;
    let start = incr - 1;
    for(i, _item) in data.iter().enumerate() {
       if i > start {
           depth += if data[(i-incr)] < data[i] { 1 } else { 0 };
       }
    }
    return depth;
}