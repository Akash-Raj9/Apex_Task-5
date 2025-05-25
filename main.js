const products = [
  // Electronics
  { id: 1, category: "Electronics", name: "Wireless Headphones", price: 49.99, image: "images/headphones.jpg" },
  { id: 2, category: "Electronics", name: "Smart Watch", price: 79.99, image: "images/watch.jpg" },
  { id: 3, category: "Electronics", name: "Bluetooth Speaker", price: 39.99, image: "images/speaker.jpg" },

  // Clothing
  { id: 4, category: "Clothing", name: "Men's T-Shirt", price: 19.99, image: "images/tshirt.png" },
  { id: 5, category: "Clothing", name: "Women's Jacket", price: 59.99, image: "images/jacket.png" },
  { id: 6, category: "Clothing", name: "Jeans", price: 39.99, image: "images/jeans.jpg" },

  // Footwear
  { id: 7, category: "Footwear", name: "Running Shoes", price: 69.99, image: "images/shoes.png" },
  { id: 8, category: "Footwear", name: "Sandals", price: 29.99, image: "images/sandals.png" },
  { id: 9, category: "Footwear", name: "Formal Shoes", price: 89.99, image: "images/formal-shoes.jpg" },

  // Books
  { id: 10, category: "Books", name: "JavaScript Guide", price: 24.99, image: "images/js-book.jpg" },
  { id: 11, category: "Books", name: "CSS Mastery", price: 19.99, image: "images/css-book.jpg" },
  { id: 12, category: "Books", name: "HTML5 Cookbook", price: 29.99, image: "images/html-book.jpg" },

  // Home
  { id: 13, category: "Home", name: "Coffee Maker", price: 49.99, image: "images/coffee-maker.jpg" },
  { id: 14, category: "Home", name: "Vacuum Cleaner", price: 79.99, image: "images/vacuum.jpg" },
  { id: 15, category: "Home", name: "Air Purifier", price: 99.99, image: "images/air-purifier.jpg" },

  // Beauty
  { id: 16, category: "Beauty", name: "Lipstick", price: 14.99, image: "images/lipstick.jpg" },
  { id: 17, category: "Beauty", name: "Face Cream", price: 19.99, image: "images/face-cream.jpg" },
  { id: 18, category: "Beauty", name: "Perfume", price: 29.99, image: "images/perfume.jpg" },

  // Sports
  { id: 19, category: "Sports", name: "Yoga Mat", price: 24.99, image: "images/yoga-mat.jpg" },
  { id: 20, category: "Sports", name: "Dumbbells", price: 49.99, image: "images/dumbbells.jpg" },
  { id: 21, category: "Sports", name: "Tennis Racket", price: 79.99, image: "images/tennis-racket.jpg" },

  // Toys
  
  // Garden
  
];

const productGrid = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let cart = [];
let filteredProducts = [...products];

function renderProducts(items = filteredProducts) {
  productGrid.innerHTML = "";
  if (items.length === 0) {
    productGrid.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>No products found.</p>";
    return;
  }
  items.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img loading="lazy" src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(div);
  });
  productGrid.classList.remove("grid");
  void productGrid.offsetWidth;
  productGrid.classList.add("grid");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    updateCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">x</button>`;
    cartItems.appendChild(li);
  });

  // Add $50 delivery fee if cart is not empty
  if (cart.length > 0) {
    const deliveryFee = 50;
    const li = document.createElement("li");
    li.innerHTML = `Delivery Fee - $${deliveryFee.toFixed(2)}`;
    cartItems.appendChild(li);
    total += deliveryFee;
  }

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}


function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thanks for shopping, Akash! Your order has been placed.");
  cart = [];
  updateCart();
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm);
    return matchCategory && matchSearch;
  });

  renderProducts(filteredProducts);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCart();
});
