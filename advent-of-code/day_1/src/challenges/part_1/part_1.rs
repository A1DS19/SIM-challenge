use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

// Function to find the first and last digit in a line
fn find_first_last_digits(line: &str) -> Option<(char, char)> {
    // Find the first digit in the line
    let first_digit = line.chars().find(|&c| c.is_digit(10));
    // Find the last digit in the line by reversing the characters
    let last_digit = line.chars().rev().find(|&c| c.is_digit(10));

    // Return a tuple of the first and last digits if both are found, otherwise return None
    match (first_digit, last_digit) {
        (Some(first), Some(last)) => Some((first, last)),
        _ => None,
    }
}

pub fn result_part_1() -> io::Result<()> {
    let path = Path::new("src/challenges/input.txt");
    let file = File::open(&path)?;
    let reader = io::BufReader::new(file);

    let mut total_sum = 0;

    // Iterate over each line in the file
    for line in reader.lines() {
        if let Ok(line) = line {
            // Find the first and last digits in the line
            if let Some((first_digit, last_digit)) = find_first_last_digits(&line) {
                // Combine the first and last digits to form a two-digit number
                let value = format!("{}{}", first_digit, last_digit)
                    .parse::<i32>()
                    .unwrap_or(0); // Parse the string to an integer, defaulting to 0 if parsing fails

                total_sum += value;
            }
        }
    }

    println!("The total sum of all calibration values is: {}", total_sum);

    Ok(())
}
