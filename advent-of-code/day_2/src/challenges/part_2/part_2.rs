use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn calculate_minimum_cubes(line: &str) -> i32 {
    let parts: Vec<&str> = line.split(": ").collect();
    let _game_id = parts[0].replace("Game ", "").parse::<i32>().unwrap();
    let cubes_sets = parts[1].split("; ");

    let mut max_red = 0;
    let mut max_green = 0;
    let mut max_blue = 0;

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

            // Update the count for each color
            match color {
                "red" => red = count,
                "green" => green = count,
                "blue" => blue = count,
                _ => (),
            }
        }

        // Track the maximum number needed for each color
        max_red = max_red.max(red);
        max_green = max_green.max(green);
        max_blue = max_blue.max(blue);
    }

    // Calculate the power of the minimum required cubes (product of max_red, max_green, max_blue)
    max_red * max_green * max_blue
}

fn sum_powers(file_path: &str) -> i32 {
    let path = Path::new(file_path);
    let file = File::open(&path).expect("Failed to open file");
    let reader = io::BufReader::new(file);

    let mut total_power_sum = 0;

    // Iterate through each line in the file
    for line in reader.lines() {
        if let Ok(line) = line {
            // Calculate the power for the current game and add it to the total sum
            total_power_sum += calculate_minimum_cubes(&line);
        }
    }

    total_power_sum
}

pub fn result_part_2() {
    let result = sum_powers("src/challenges/input.txt");
    println!("The sum of the power of minimum sets is: {}", result);
}
