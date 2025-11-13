import { CustomerModel } from "../model/CustomerModel.js";
import ItemModel from "../model/ItemModel.js";
import OrderModel from "../model/OrderModel.js";
import { tost } from "../util/tostUtil.js";

export const ItemActionModel = {
  render: () => {
    return `
    <div class="modal fade" id="itemActionModel" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4 border-0 p-3">
                
                <div class="modal-header border-0 justify-content-center">
                    <h4 class="modal-title fw-bold" style="color: #FFA500;">Add New Item</h4>
                </div>

                <div class="modal-body pt-0">
                    <form>
                        <div class="mb-3">
                            <label class="form-label text-secondary small">Item name</label>
                            <input id="item_name" type="text" class="form-control" placeholder="item name" style="border-color: #a855f7;">
                        </div>

                        <div class="row mb-3">
                            <div class="col-6">
                                <label class="form-label text-secondary small">Item Category</label>
                                <select id="item_category" class="form-select text-secondary" style="border-color: #a855f7;">
                                    <option selected>Desert</option>
                                    <option value="1">Main Dish</option>
                                    <option value="2">Drinks</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <label class="form-label text-secondary small">Item Price</label>
                                <input id="item_price" type="text" class="form-control" placeholder="item price" style="border-color: #a855f7;">
                            </div>

                            <div class="col-6 mx-auto my-3">
                                <img src-"" width="200" height="200" id="item_image" class="img-fluid" style="border-color: #a855f7;">
                            </div>

                            <div class="col-12">
                                <label class="form-label text-secondary small">Item Price</label>
                                <input id="item_image_file" type="file" class="form-control" placeholder="item image" style="border-color: #a855f7;">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-6">
                                <label class="form-label text-secondary small">Item Qty</label>
                                <input id="item_qty" type="number" class="form-control" placeholder="item quantity" style="border-color: #a855f7;">
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn fw-bold" data-bs-dismiss="modal"
                            style="color: #FFA500; border-color: #FFA500; background: transparent; padding: 6px 20px;">
                        Cancel
                    </button>
                    <button id="submit" type="button" class="btn text-white fw-bold" 
                            style="background-color: #ffc107; border-color: #ffc107; padding: 6px 30px;">
                        Save
                    </button>
                </div>

            </div>
        </div>
    </div>
      `;
  },
  init() {
    $("#itemActionModel").modal();
    ItemActionModel.open();
  },
  loadOrderData: (orderData) => {
    const cartItems = ItemModel.getCart();
    const tbody = $("#itemActionModel tbody");
    tbody.empty();
    let subtotal = 0;
    cartItems.forEach((cartItem) => {
      const item = ItemModel.getItemById(cartItem.id);
      const tr = `<tr class="border-bottom border-light">
                        <td class="fw-medium ps-0 py-3">${item.name}</td>
                        <td class="text-center py-3">${cartItem.quantity}</td>
                        <td class="text-end py-3">RS :  ${item.price.toFixed(
        2
      )}</td>
                        <td class="text-end fw-medium pe-0 py-3">RS :  ${(
          cartItem.quantity * item.price
        ).toFixed(2)}</td>
                    </tr>`;
      tbody.append(tr);
      subtotal += cartItem.quantity * item.price;
    });
    const tax = 0;
    const total = subtotal + tax;
    $("#itemActionModel #subTotal").text(`Rs: ${subtotal.toFixed(2)}`);
    $("#itemActionModel #tax").text(`Rs: ${tax.toFixed(2)}`);
    $("#itemActionModel #total").text(`Rs: ${total.toFixed(2)}`);
  },
  loadCustomers: () => {
    const customers = CustomerModel.getAll();
    const customerSelect = $("#customer-select");
    customerSelect.empty();
    customers.forEach((customer) => {
      const option = `<option value="${customer.id}">${customer.name}</option>`;
      customerSelect.append(option);
    });
  },
  close() {
    $("#itemActionModel").modal("hide");
  },
  open() {
    $("#itemActionModel").modal("show");
  },
  onConfirm(callback) {
    $("#itemActionModel #confirmOrderBtn")
      .off("click")
      .on("click", () => {
        this.close();

        const selectedCustomer = $("#customer-select").val();
        const selectedType = $("#order-type-select").val();
        const selectedPaymentType = $("#payment-type-select").val();

        console.log(selectedCustomer, selectedType, selectedPaymentType);

        if (!selectedCustomer || !selectedType || !selectedPaymentType) {
          tost("Please select customer, order type and payment type", "error");
          return;
        }

        const orderData = {
          customerId: selectedCustomer,
          type: selectedType,
          paymentType: selectedPaymentType,
          items: ItemModel.getCart(),
          total: OrderModel.calculateTotal(),
          date: new Date().toISOString().split("T")[0],
        };

        OrderModel.add(orderData);

        Swal.fire({
          text: "Here's a basic example of SweetAlert!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        callback();
      });
  },
};