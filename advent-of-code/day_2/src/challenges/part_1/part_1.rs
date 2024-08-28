use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn is_game_possible(line: &str, max_red: i32, max_green: i32, max_blue: i32) -> bool {
    // Split the line into the game ID part and the cube sets part
    let parts: Vec<&str> = line.split(": ").collect();
    let _game_id = parts[0].replace("Game ", "").parse::<i32>().unwrap();
    let cubes_sets = parts[1].split("; ");

    // Iterate through each set of cubes shown in the game
    for cubes_set in cubes_sets {
        let mut red = 0;
        let mut green = 0;
        let mut blue = 0;

        // Split the set into individual cube counts and colors
        for cube_info in cubes_set.split(", ") {
            let mut info = cube_info.split_whitespace();
            let count = info.next().unwrap().parse::<i32>().unwrap(); // Parse the number of cubes
            let color = info.next().unwrap(); // Get the color of the cubes

            // Assign the count to the appropriate color variable
            match color {
                "red" => red = count,
                "green" => green = count,
                "blue" => blue = count,
                _ => (),
            }
        }

        // If any color exceeds the maximum allowed, the game is not possible
        if red > max_red || green > max_green || blue > max_blue {
            return false;
        }
    }

    // If all sets are within the limits, the game is possible
    true
}

fn sum_possible_games(file_path: &str, max_red: i32, max_green: i32, max_blue: i32) -> i32 {
    let path = Path::new(file_path);
    let file = File::open(&path).expect("Failed to open file");
    let reader = io::BufReader::new(file);

    let mut total_sum = 0;

    // Iterate through each line in the file
    for line in reader.lines() {
        if let Ok(line) = line {
            // Extract the game ID from the line
            let parts: Vec<&str> = line.split(": ").collect();
            let game_id = parts[0].replace("Game ", "").parse::<i32>().unwrap();

            // If the game is possible, add its ID to the total sum
            if is_game_possible(&line, max_red, max_green, max_blue) {
                total_sum += game_id;
            }
        }
    }

    total_sum
}

pub fn result_part_1() {
    // Define the maximum cubes available for each color
    let max_red = 12;
    let max_green = 13;
    let max_blue = 14;

    // Calculate the sum of possible game IDs using the input file
    let result = sum_possible_games("src/challenges/input.txt", max_red, max_green, max_blue);
    println!("The sum of possible game IDs is: {}", result);
}
