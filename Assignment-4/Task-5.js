// Callback function to filter out even numbers (keep only odd numbers)
function filterOdd(numbers) {
  return numbers.filter((num) => num % 2 !== 0);
}

// Callback function to double each number
function doubleNumbers(numbers) {
  return numbers.map((num) => num * 2);
}

// Callback function to calculate the sum of all numbers
function calculateSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Bonus Task: Callback function to find the maximum number in the array
function findMax(numbers) {
  return numbers.reduce((max, num) => (num > max ? num : max), numbers[0]);
}

// processData function that accepts an array and a callback
function processData(numbers, callback) {
  return callback(numbers);
}

// Example array of numbers
const numbersArray = [10, 25, 33, 40, 57, 68, 79, 82, 95];

// Using processData with different callbacks
console.log("Odd Numbers:", processData(numbersArray, filterOdd));
console.log("Doubled Numbers:", processData(numbersArray, doubleNumbers));
console.log("Sum of Numbers:", processData(numbersArray, calculateSum));
console.log("Maximum Number:", processData(numbersArray, findMax));

/*
Expected Output:
Odd Numbers: [ 25, 33, 57, 79, 95 ]
Doubled Numbers: [ 20, 50, 66, 80, 114, 136, 158, 164, 190 ]
Sum of Numbers: 489
Maximum Number: 95
*/
