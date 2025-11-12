import ItemModel from "../model/ItemModel.js";

export const ItemCartOffcanvas = () => {
  return `
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">
          Item Cart
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="order-header mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="text-muted fs-sm">Invoice No: 123454</span>
              <span class="text-muted fs-sm">23/01/2024 | 14:00:23</span>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div>
              <h5 class="fw-bold mb-0">Table 04</h5>
              <span class="text-muted">Order: #0029</span>
            </div>
          </div>
        </div>

        <div id="cart-items" class="mb-3" id="cart-items">
        </div>

        <div class="order-total">
          <div class="d-flex justify-content-between">
            <span class="text-muted">Total Items:</span>
            <span class="fw-bold" id="total-items">
              1
            </span>
          </div>
          <div class="d-flex justify-content-between">
            <span class="text-muted">Total Quantity:</span>
            <span class="fw-bold" id="total-quantity">
              1
            </span>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="fw-bold mb-0">Total:</h4>
            <h4 class="fw-bold mb-0" id="total-price">
              $8.50
            </h4>
          </div>
        </div>

        <div class="d-grid gap-2 mt-4">
          <button id="print-invoice" class="btn btn-outline-secondary">Print Invoice</button>
          <button class="btn btn-success btn-lg">Payments</button>
        </div>
      </div>
    </div>`;
};

export const loadCartItems = (cartData) => {
  const cartDetails = cartData?.map((item) => {
    const itemData = ItemModel.getItemById(item?.id);
    return itemData ? { ...itemData, quantity: item?.quantity } : null;
  });

  const total = cartDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItem = cartDetails.length;
  const totalQuantity = cartDetails.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  $("#total-items").text(totalItem);
  $("#total-quantity").text(totalQuantity);

  let cartItems = cartDetails
    ?.map((item) => {
      return item ? cartItemContent(item, item.quantity) : null;
    })
    .filter(Boolean);

  if (!cartItems || cartDetails.length <= 0) {
    cartItems = `
      <div class="cart-item d-flex align-items-center mb-3">
        <div class="ms-3 flex-grow-1">
          <h6 class="fw-bold mb-0 text-secondary">No items in cart</h6>
        </div>
      </div>`;
  }

  $("#cart-items").html(cartItems);

  $("#total-price").text(`Rs : ${total.toFixed(2)}`);
};

export const cartItemContent = (item, quantity) => {
  return `
     <div class="cart-item d-flex align-items-center mb-3">
            <img
              src="${item.image}"
              width="50"
              height="50"
              alt="Item"
            />
            <div class="ms-3 flex-grow-1">
              <h6 class="fw-bold mb-0">${item.name}</h6>
            </div>
            <div class="quantity-controls d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary btn-minus" data-item-id="${
                item.id
              }">-</button>
              <input
                id="quantity-input"
                type="text"
                class="form-control form-control-sm text-center  mx-1"
                value="${quantity}"
                style="width: 40px"
              />
              <button class="btn btn-sm btn-outline-secondary btn-plus" data-item-id="${
                item.id
              }">+</button>
            </div>
            <div class="ms-3 fw-bold">$${(item.price * quantity).toFixed(
              2
            )}</div>
            <button class="btn btn-sm btn-link text-danger ms-2" id="remove-item" data-item-id="${
              item.id
            }">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
    `;
};
