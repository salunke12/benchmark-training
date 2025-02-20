"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
    const categoryTitle = document.getElementById("category-title");
    const categoryName = localStorage.getItem("catName");
    const loadProducts = () => {
        const url = categoryName
            ? `https://fakestoreapi.com/products/category/${categoryName}`
            : `https://fakestoreapi.com/products/`;
        axios_1.default
            .get(url)
            .then((response) => {
            if (Array.isArray(response.data) && response.data.length) {
                response.data.forEach((product) => {
                    createProductCard(product);
                });
            }
            else {
                console.warn("No products found.");
            }
        })
            .catch((error) => {
            console.error("Error fetching products:", error);
        });
    };
    const createProductCard = (product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.description.slice(0, 100)}...</p>
          <span class="price">$${product.price}</span>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productsContainer.appendChild(card);
    };
    loadProducts();
});
// Image Slider
const slideImages = document.querySelectorAll(".slide-image");
const slidesContainer = document.querySelector(".slides-container");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const navigationDots = document.querySelector(".navigation-dots");
const numberOfImages = slideImages.length;
const slideWidth = slideImages[0].clientWidth;
let currentSlide = 0;
// Initialize Slider
function init() {
    slideImages.forEach((img, i) => {
        img.style.left = `${i * 100}%`;
    });
    slideImages[0].classList.add("active");
    createNavigationDots();
}
init();
// Create Navigation Dots
function createNavigationDots() {
    for (let i = 0; i < numberOfImages; i++) {
        const dot = document.createElement("div");
        dot.classList.add("single-dot");
        navigationDots.appendChild(dot);
        dot.addEventListener("click", () => {
            goToSlide(i);
        });
    }
    navigationDots.children[0].classList.add("active");
}
// Next Button
nextBtn.addEventListener("click", () => {
    if (currentSlide >= numberOfImages - 1) {
        goToSlide(0);
        return;
    }
    currentSlide++;
    goToSlide(currentSlide);
});
// Previous Button
prevBtn.addEventListener("click", () => {
    if (currentSlide <= 0) {
        goToSlide(numberOfImages - 1);
        return;
    }
    currentSlide--;
    goToSlide(currentSlide);
});
// Go To Slide
function goToSlide(slideNumber) {
    slidesContainer.style.transform = `translateX(-${slideWidth * slideNumber}px)`;
    currentSlide = slideNumber;
    setActiveClass();
}
// Set Active Class
function setActiveClass() {
    // Set active class for Slide Image
    const currentActive = document.querySelector(".slide-image.active");
    if (currentActive)
        currentActive.classList.remove("active");
    slideImages[currentSlide].classList.add("active");
    // Set active class for Navigation Dots
    const currentDot = document.querySelector(".single-dot.active");
    if (currentDot)
        currentDot.classList.remove("active");
    navigationDots.children[currentSlide].classList.add("active");
}
//# sourceMappingURL=srcipt.js.map