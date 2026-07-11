const productsContainer = document.getElementById("products");

function displayProducts(products) {
    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("card");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h2>${product.title}</h2>
            <p>${product.description.slice(0, 60)}...</p>
            <p>Price: $${product.price}</p>
        `;
        productsContainer.appendChild(productElement);
    });
}

async function getProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    displayProducts(products)
}

getProducts();