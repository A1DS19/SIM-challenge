use std::collections::HashMap;
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

// Function to find and combine the first and last digits in a line
fn get_combined_digits(line: &str, word_to_digit_map: &HashMap<&str, char>) -> i32 {
    let mut positions: Vec<(usize, char)> = Vec::new();

    // Find positions of spelled-out numbers in the line and map them to digits
    for (word, &digit) in word_to_digit_map.iter() {
        let mut start_idx = 0;
        while let Some(idx) = line[start_idx..].find(word) {
            let actual_idx = start_idx + idx;
            positions.push((actual_idx, digit)); // Store position and corresponding digit
            start_idx = actual_idx + word.len();
        }
    }

    // Add positions of numeric digits found in the line
    positions.extend(line.chars().enumerate().filter(|&(_, ch)| ch.is_digit(10)));

    // If no digits are found, return 0
    if positions.is_empty() {
        return 0;
    }

    // Sort positions to ensure we correctly identify the first and last digits
    positions.sort_by_key(|&(idx, _)| idx);

    // Extract the first and last digit found in the line
    let first = positions.first().unwrap().1;
    let last = positions.last().unwrap().1;

    // Combine the first and last digits to form a two-digit number and return it
    format!("{}{}", first, last).parse::<i32>().unwrap_or(0)
}

// Function to sum up all calibration values from the list of lines
fn sum_calibration_values(lines: Vec<String>, word_to_digit_map: &HashMap<&str, char>) -> i32 {
    lines
        .iter()
        .map(|line| get_combined_digits(line.trim(), word_to_digit_map)) // Apply get_combined_digits to each line
        .sum()
}

// Function to execute the part 2 result logic
pub fn result_part_2() -> io::Result<()> {
    let path = Path::new("src/challenges/input.txt");
    let file = File::open(&path)?;
    let reader = io::BufReader::new(file);

    let lines: Vec<String> = reader.lines().filter_map(Result::ok).collect();

    // Create a mapping from spelled-out numbers to their corresponding digits
    let word_to_digit_map: HashMap<&str, char> = HashMap::from([
        ("one", '1'),
        ("two", '2'),
        ("three", '3'),
        ("four", '4'),
        ("five", '5'),
        ("six", '6'),
        ("seven", '7'),
        ("eight", '8'),
        ("nine", '9'),
    ]);

    // Calculate and print the total sum of all calibration values
    println!(
        "The total sum of all calibration values is: {}",
        sum_calibration_values(lines, &word_to_digit_map)
    );

    Ok(())
}
