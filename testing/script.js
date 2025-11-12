$(document).ready(function () {
  // This is our 'database' for the cart
  let cart = [];

  // --- Add item to cart ---
  // Listen for click on the 'Add to Cart' button
  $("#main-content").on("click", ".add-to-cart-btn", function () {
    // Get product info from data-attributes
    // .closest() finds the nearest parent '.product-card'
    let productCard = $(this).closest(".product-card");

    let item = {
      id: productCard.data("id"),
      name: productCard.data("name"),
      price: parseFloat(productCard.data("price")),
      img: productCard.data("img"), // We'll use the img src from the card for simplicity
      quantity: 1,
    };

    addToCart(item);
  });

  // --- Cart Quantity Controls ---
  // Use event delegation for buttons that will be added dynamically
  $("#cart-items").on("click", ".btn-plus", function () {
    let id = $(this).closest(".cart-item").data("id");
    changeQuantity(id, 1);
  });

  $("#cart-items").on("click", ".btn-minus", function () {
    let id = $(this).closest(".cart-item").data("id");
    changeQuantity(id, -1);
  });

  // --- Remove item from cart ---
  $("#cart-items").on("click", ".btn-remove", function () {
    let id = $(this).closest(".cart-item").data("id");
    removeItem(id);
  });

  // --- Core Functions ---

  function addToCart(itemToAdd) {
    // Check if item already in cart
    let found = cart.find((item) => item.id === itemToAdd.id);

    if (found) {
      // If found, just increase quantity
      found.quantity += 1;
    } else {
      // If not found, add to cart array
      cart.push(itemToAdd);
    }

    renderCart(); // Update the cart display
  }

  function changeQuantity(id, amount) {
    let item = cart.find((item) => item.id === id);
    if (item) {
      item.quantity += amount;
      if (item.quantity <= 0) {
        // If quantity reaches 0, remove item
        removeItem(id);
      } else {
        renderCart();
      }
    }
  }

  function removeItem(id) {
    // Filter out the item to be removed
    cart = cart.filter((item) => item.id !== id);
    renderCart();
  }

  function renderCart() {
    let cartItemsContainer = $("#cart-items");
    cartItemsContainer.empty(); // Clear the cart HTML

    let totalItems = 0;
    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
      cartItemsContainer.html(
        '<p class="text-muted text-center">Your cart is empty.</p>'
      );
    }

    cart.forEach((item) => {
      totalItems += 1;
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;

      // This is the HTML template for a cart item
      // We add the data-id to the main div for easy reference
      let itemHtml = `
                <div class="cart-item d-flex align-items-center mb-3" data-id="${
                  item.id
                }">
                    <img src="${
                      item.img || "https://i.imgur.com/L13a0rA.png"
                    }" width="50" height="50" alt="${item.name}">
                    <div class="ms-3 flex-grow-1">
                        <h6 class="fw-bold mb-0">${item.name}</h6>
                        <span class="text-muted fs-sm">Size: large</span>
                    </div>
                    <div class="quantity-controls d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary btn-minus">-</button>
                        <input type="text" class="form-control form-control-sm text-center mx-1" value="${
                          item.quantity
                        }" readonly style="width: 40px;">
                        <button class="btn btn-sm btn-outline-secondary btn-plus">+</button>
                    </div>
                    <div class="ms-3 fw-bold">$${(
                      item.price * item.quantity
                    ).toFixed(2)}</div>
                    <button class="btn btn-sm btn-link text-danger ms-2 btn-remove"><i class="bi bi-trash-fill"></i></button>
                </div>
            `;
      cartItemsContainer.append(itemHtml);
    });

    // Update totals
    $("#total-items").text(totalItems);
    $("#total-quantity").text(totalQuantity);
    $("#total-price").text(`$${totalPrice.toFixed(2)}`);
  }

  // Initial render in case cart is empty
  renderCart();
});
