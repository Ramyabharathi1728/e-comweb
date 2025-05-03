// Product Data
const products = [
    { id: 1, name: "Laptop", price: 799, category: "Electronics", image: "e-comimg/lap.png" },
    { id: 2, name: "Phone", price: 599, category: "Electronics", image: "e-comimg/phone.png" },
    { id: 3, name: "Shoes", price: 49, category: "Fashion", image: "e-comimg/shoe.png" },
    { id: 4, name: "T-Shirt", price: 19, category: "Fashion", image: "e-comimg/t-shirt.png" },
    { id: 5, name: "Headphones", price: 99, category: "Electronics", image: "e-comimg/headph.png" },
    { id: 6, name: "Smartwatch", price: 199, category: "Electronics", image: "e-comimg/smartwatch.png" },
    { id: 7, name: "Tablet", price: 399, category: "Electronics", image: "e-comimg/tab.png" },
    { id: 8, name: "Gaming Console", price: 499, category: "Electronics", image: "e-comimg/gamingconsole.png" },
    { id: 9, name: "Jeans", price: 39, category: "Fashion", image: "e-comimg/jean.png" },
    { id: 10, name: "Jacket", price: 89, category: "Fashion", image: "e-comimg/jacket.png" },
    { id: 11, name: "Watch", price: 149, category: "Fashion", image: "e-comimg/wristwatch.png" },
    { id: 12, name: "Blender", price: 99, category: "Home Appliances", image: "e-comimg/blender.png" },
    { id: 13, name: "Vacuum Cleaner", price: 199, category: "Home Appliances", image: "e-comimg/vaccum.png" },
    { id: 14, name: "Microwave Oven", price: 299, category: "Home Appliances", image: "e-comimg/oven.png" },
    { id: 15, name: "JavaScript Guide", price: 29, category: "Books", image: "e-comimg/jsguide.png" },
    { id: 16, name: "Data Structures & Algorithms", price: 39, category: "Books", image: "e-comimg/dsguide.png" },
    { id: 17, name: "Fiction Novel", price: 19, category: "Books", image: "e-comimg/50shades.jpg" },
    { id: 18, name: "Perfume", price: 59, category: "Beauty", image: "e-comimg/perfume.png" },
    { id: 19, name: "Face Cream", price: 29, category: "Beauty", image: "e-comimg/cream.png" },
    { id: 20, name: "Shampoo", price: 15, category: "Beauty", image: "e-comimg/shampoo.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Display Products (Filtered)
function displayProducts(filteredProducts = products) {
    const productList = document.getElementById("product-list");
    if (!productList) return;
    productList.innerHTML = ""; // Clear existing products

    filteredProducts.forEach(product => {
        let div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="showProductDetails(${product.id})">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const productDetailsSection = document.createElement("section");
    productDetailsSection.id = "product-detail-view";
    productDetailsSection.innerHTML = `
        <h2>Product Details</h2>
        <img src="${product.image}" alt="${product.name}" style="max-width:300px;">
        <h3>${product.name}</h3>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="window.location.href='payment.html'">Buy now</button>
        <button onclick="closeProductDetails()">CLose</button>
        <hr>
    `;

    // Optional: Clear and show only this
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    productList.appendChild(productDetailsSection);
}

function closeProductDetails() {
    displayProducts(); // Reshow all products
}



// Function to Update Cart Count
function updateCart() {
    document.getElementById("cart-count").innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Function to Display Cart Items with Images
function displayCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    if (!cartList) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartList.appendChild(div);
    });

    cartTotal.innerText = total.toFixed(2);
}


// Function to Add to Cart
function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    let item = cart.find(i => i.id === productId);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();

    // Create message container
    const message = document.createElement('div');
    message.innerHTML = `${product.name} added to cart 🛒 
        <button id="goToCartBtn" style="margin-left:10px; padding:5px 10px; border:none; background:#fff; color:#000; border-radius:5px; cursor:pointer;">Go to Cart</button>`;
    
    message.style = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); padding:10px; background: orange; color:white; border-radius:5px; z-index:1000; display:flex; align-items:center;';

    document.body.appendChild(message);

    // Add event listener to Go to Cart button
    document.getElementById('goToCartBtn').addEventListener('click', () => {
        window.location.href = "cart.html"; // Redirects to cart page
    });

    // Automatically remove the message after 1 second
    setTimeout(() => message.remove(), 2000);
}


// Function to Clear Cart
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    displayCart();
    updateCart();
}

// Load cart items on page load
document.addEventListener("DOMContentLoaded", displayCart);

// Function to Filter Products
function filterProducts() {
    const searchText = document.getElementById("search").value.toLowerCase();
    const selectedCategory = document.getElementById("category").value;
    const selectedPriceRange = document.getElementById("price").value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

        let matchesPrice = true;
        if (selectedPriceRange !== "all") {
            const [min, max] = selectedPriceRange.split("-").map(Number);
            matchesPrice = product.price >= min && product.price <= max;
        }

        return matchesSearch && matchesCategory && matchesPrice;
    });

    displayProducts(filteredProducts);
}





// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    displayProducts();
    displayCart();
    updateCart();
    displayAdvertisement();
});
