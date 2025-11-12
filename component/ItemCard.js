export const ItemCard = (item) => {
  return `
    <div class="card product-card shadow-sm " style="width: 200px; min-width: 200px;">
      <img src="https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png" class="card-img-top product-img" alt="Grill Sandwich">
      <div class="card-body">
        <h5 class="card-title d-flex justify-content-between align-items-center fs-6">
          Grill Sandwich
          <span class="text-success fs-6">$30.00</span>
        </h5>
        <div class="d-flex justify-content-center align-items-center mt-3">
          <button class="btn btn-warning btn-sm">+ Add Product</button>
        </div>
      </div>
    </div>  
    `;
};
