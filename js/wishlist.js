const wishlistContainer =
    document.getElementById("wishlist-products");

const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

displayWishlist();

function displayWishlist() {

    wishlistContainer.innerHTML = "";

    wishlist.forEach((product) => {

        wishlistContainer.innerHTML += `
            <div class="card">
                <img src="${product.image}">
                <h3>${product.title}</h3>
                <p class="price">$${product.price}</p>

                <button
                    class="remove-btn"
                    data-id="${product.id}">
                    Remove
                </button>
            </div>
        `;
    });
}
document.querySelector(".back-btn").addEventListener("click", () => {
    history.back();
});
wishlistContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("remove-btn")) {

        const id = Number(e.target.dataset.id);

        const updatedWishlist =
            wishlist.filter(
                product => product.id !== id
            );

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatedWishlist)
        );

        location.reload();
    }
});