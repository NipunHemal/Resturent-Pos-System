export const ItemCard = (item) => {
  return `
    <div class="card product-card shadow-sm " style="width: 200px; min-width: 200px;">
      <img src="${item.image}" class="card-img-top product-img" alt="${item.name}">
      <div class="card-body">
        <h5 class="card-title d-flex justify-content-between align-items-center fs-6">
          <span>${item.name}</span>
          <span class="text-success fs-6">$${item.price}</span>
        </h5>
        <div class="d-flex justify-content-center align-items-center mt-3">
          <button class="btn btn-warning btn-sm" data-item-id="${item.id}" id="add-product-to-cart">+ Add Product</button>
        </div>
      </div>
    </div>  
    `;
};
