document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById(
    "products-container"
  ) as HTMLElement;
  const categoryTitle = document.getElementById(
    "category-title"
  ) as HTMLElement;
  const categoryName: string | null = localStorage.getItem("catName");

  const loadProducts = (): void => {
    const url: string = categoryName
      ? `https://fakestoreapi.com/products/category/${categoryName}`
      : `https://fakestoreapi.com/products/`;

    axios
      .get(url)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length) {
          response.data.forEach((product: any) => {
            createProductCard(product);
          });
        } else {
          console.warn("No products found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const createProductCard = (product: any): void => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.description.slice(0, 100)}...</p>
          <span class="price">$${product.price}</span>
          <button>Add to Cart</button>
        `;
    productsContainer.appendChild(card);
  };

  loadProducts();
});

// Image Slider
const slideImages = document.querySelectorAll(
  ".slide-image"
) as NodeListOf<HTMLElement>;
const slidesContainer = document.querySelector(
  ".slides-container"
) as HTMLElement;
const nextBtn = document.querySelector(".next-btn") as HTMLElement;
const prevBtn = document.querySelector(".prev-btn") as HTMLElement;
const navigationDots = document.querySelector(
  ".navigation-dots"
) as HTMLElement;

const numberOfImages: number = slideImages.length;
const slideWidth: number = slideImages[0].clientWidth;
let currentSlide: number = 0;

// Initialize Slider
function init(): void {
  slideImages.forEach((img, i) => {
    img.style.left = `${i * 100}%`;
  });
  slideImages[0].classList.add("active");
  createNavigationDots();
}

init();

// Create Navigation Dots
function createNavigationDots(): void {
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
function goToSlide(slideNumber: number): void {
  slidesContainer.style.transform = `translateX(-${
    slideWidth * slideNumber
  }px)`;
  currentSlide = slideNumber;
  setActiveClass();
}

// Set Active Class
function setActiveClass(): void {
  // Set active class for Slide Image
  const currentActive = document.querySelector(
    ".slide-image.active"
  ) as HTMLElement;
  if (currentActive) currentActive.classList.remove("active");
  slideImages[currentSlide].classList.add("active");

  // Set active class for Navigation Dots
  const currentDot = document.querySelector(
    ".single-dot.active"
  ) as HTMLElement;
  if (currentDot) currentDot.classList.remove("active");
  navigationDots.children[currentSlide].classList.add("active");
}
