const productsContainer = document.getElementById("products");
const searchForm = document.getElementById("search-form");
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");

let allProducts = [];
let currentProducts = [];

function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach((product) => {
        const productElement = document.createElement("div");

        productElement.classList.add("card");

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="category">${product.category}</p>
            <p class="price">$${product.price}</p>
            <button class="details-btn" data-id="${product.id}">
                View Details
            </button>
        `;

        productsContainer.appendChild(productElement);
    });
}

async function getProducts() {
    try {
        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        const products = await response.json();

        allProducts = products;
        currentProducts = products;

        displayProducts(products);
    } catch (error) {
        console.error(error);
    }
}

async function getCategories() {
    try {
        const response = await fetch(
            "https://fakestoreapi.com/products/categories"
        );

        const categories = await response.json();

        categories.forEach((category) => {
            const option = document.createElement("option");

            option.value = category;
            option.textContent = category;

            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = currentProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    filterProducts();
});

categorySelect.addEventListener("change", async () => {
    const selectedCategory = categorySelect.value;

    try {
        if (selectedCategory === "all") {
            currentProducts = allProducts;
        } else {
            const response = await fetch(
                `https://fakestoreapi.com/products/category/${selectedCategory}`
            );

            currentProducts = await response.json();
        }

        filterProducts();
    } catch (error) {
        console.error(error);
    }
});

getProducts();
getCategories();