// Define Cart Product Interface
interface CartProduct {
  id: number;
  name: string;
  price: number;
}

// Cart Array
let cart: CartProduct[] = [];

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCartUI();
}

// Add product to cart
export function addToCart(id: number, name: string, price: number) {
  const product: CartProduct = { id, name, price };
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Update cart UI
function updateCartUI() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
              <span>${item.name} - $${item.price}</span>
              <button class="remove-btn" data-index="${index}">Remove</button>
          `;
    cartContainer.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Remove item from cart
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("remove-btn")) {
    const index = Number(target.getAttribute("data-index"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }
});

// Clear entire cart
document.getElementById("clear-cart")?.addEventListener("click", () => {
  cart = [];
  localStorage.removeItem("cart");
  updateCartUI();
});

// Load cart when page loads
document.addEventListener("DOMContentLoaded", loadCart);
