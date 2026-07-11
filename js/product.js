const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function getProduct() {
    const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
    );

    const product = await response.json();

    displayProduct(product);
}

getProduct();

const detailsContainer = document.getElementById("product-details");

function displayProduct(product) {
    detailsContainer.innerHTML = `
    <button class="back-btn">← Back to Products</button>
        <div class="product-detail-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>

            <div class="product-info">
                <h1>${product.title}</h1>

                <p class="category">${product.category}</p>

                <p class="price">$${product.price}</p>
                <button class="wishlist-btn">
                    ❤️ Add to Wishlist
                </button>

                <p class="description">
                    ${product.description}
                </p>
            </div>
        </div>
    `;
    document.querySelector(".back-btn").addEventListener("click", () => {
        history.back();
    });
    document.querySelector(".wishlist-btn").addEventListener("click", () => {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some(
        item => item.id === product.id
    );

    if (!exists) {
        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert("Added to Wishlist ❤️");
    } else {
        alert("Already in Wishlist");
    }
});
}