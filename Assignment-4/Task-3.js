let arr = [];
let intervalId;

function addData() {
  for (let i = 0; i < 500; i++) {
    arr.push({ data: new Array(500).fill("1234567890") });
  }
  console.log("Current array size:", arr.length);
}

function clearMemory() {
  arr = []; // Dereferencing the array to free memory
  console.log("Memory cleared");
}

// Start adding data every second
intervalId = setInterval(addData, 1000);

// Stop adding data and clear memory after 10 seconds
setTimeout(() => {
  clearInterval(intervalId); // Stops the interval correctly
  clearMemory(); // Clears the array
}, 10000);

/*
Expected Output:

Current array size: 500
Current array size: 1000
Current array size: 1500
Current array size: 2000
Current array size: 2500
Current array size: 3000
Current array size: 3500
Current array size: 4000
Current array size: 4500
Current array size: 5000
Memory cleared

(Heap memory increases during execution; after "Memory cleared", the memory usage should drop when garbage collection occurs.)
*/
