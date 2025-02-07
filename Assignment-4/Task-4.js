// Array of product objects with prices in Indian Rupees (₹)
const products = [
  { name: "Laptop", price: 65000, category: "Electronics" },
  { name: "Shirt", price: 1200, category: "Clothing" },
  { name: "Phone", price: 50000, category: "Electronics" },
  { name: "Shoes", price: 2500, category: "Clothing" },
  { name: "Headphones", price: 3000, category: "Electronics" },
  { name: "Book", price: 500, category: "Education" },
];

// Task 1: Use map() to transform data (convert product names to uppercase)
const productNamesUppercase = products.map((product) =>
  product.name.toUpperCase()
);
console.log("Product Names in Uppercase:", productNamesUppercase);

/*
Expected Output:
Product Names in Uppercase: [ 'LAPTOP', 'SHIRT', 'PHONE', 'SHOES', 'HEADPHONES', 'BOOK' ]
*/

// Task 2: Use filter() to extract products in 'Electronics' category
const electronicsProducts = products.filter(
  (product) => product.category === "Electronics"
);
console.log("Electronics Products:", electronicsProducts);

/*
Expected Output:
Electronics Products: [
    { name: 'Laptop', price: 65000, category: 'Electronics' },
    { name: 'Phone', price: 50000, category: 'Electronics' },
    { name: 'Headphones', price: 3000, category: 'Electronics' }
]
*/

// Task 3: Use reduce() to calculate the total price of all products
const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
console.log("Total Price of All Products: ₹", totalPrice);

/*
Expected Output:
Total Price of All Products: ₹ 121200
*/

// Task 4: Combine map(), filter(), and reduce()
// Function to calculate total price of products from a specific category
function getTotalPriceByCategory(category) {
  return products
    .filter((product) => product.category === category) // Filter by category
    .map((product) => product.price) // Extract prices
    .reduce((sum, price) => sum + price, 0); // Calculate total price
}

console.log(
  "Total Price of Electronics: ₹",
  getTotalPriceByCategory("Electronics")
);
console.log("Total Price of Clothing: ₹", getTotalPriceByCategory("Clothing"));

/*
Expected Output:
Total Price of Electronics: ₹ 118000
Total Price of Clothing: ₹ 3700
*/
