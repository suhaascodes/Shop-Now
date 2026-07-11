const productsContainer = document.getElementById("products");
const searchForm = document.getElementById("search-form");
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");
const paginationContainer = document.getElementById("pagination");

let allProducts = [];
let currentProducts = [];

const productsPerPage = 10;
let currentPage = 1;

function displayProducts(products) {

    productsContainer.innerHTML = "";

    const startIndex =
        (currentPage - 1) * productsPerPage;

    const endIndex =
        startIndex + productsPerPage;

    const paginatedProducts =
        products.slice(startIndex, endIndex);

    paginatedProducts.forEach((product) => {

        const productElement =
            document.createElement("div");

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

    renderPagination(products);
}

function renderPagination(products) {

    paginationContainer.innerHTML = "";

    const totalPages =
        Math.ceil(products.length / productsPerPage);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← Prev";

    prevBtn.disabled = currentPage === 1;

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(products);
        }
    });

    paginationContainer.appendChild(prevBtn);


    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        if (i === currentPage) {
            button.classList.add("active-page");
        }

        button.addEventListener("click", () => {
            currentPage = i;
            displayProducts(products);
        });

        paginationContainer.appendChild(button);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next →";

    nextBtn.disabled = currentPage === totalPages;

    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts(products);
        }
    });

    paginationContainer.appendChild(nextBtn);
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
    currentPage = 1;
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

productsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("details-btn")) {
        const productId = e.target.dataset.id;

        window.location.href = `product.html?id=${productId}`;
    }
});

getProducts();
getCategories();