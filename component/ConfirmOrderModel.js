import { CustomerModel } from "../model/CustomerModel.js";
import ItemModel from "../model/ItemModel.js";
import { tost } from "../util/tostUtil.js";

export const ConfirmOrderModel = {
  render: () => {
    return `
    <div class="modal fade" id="confirmOrderModel" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg p-3">
                
                <div class="modal-header border-0 flex-column align-items-center pb-0">
                    <h4 class="modal-title fw-bold">Order confirmation</h4>
                    <p class="text-muted small">Please confirm the order below to completed payment</p>
                </div>

                <div class="modal-body pt-4">
                    
                    <div class="row g-3 mb-4">
                        <div class="col-md-4">
                            <label class="form-label text-uppercase text-muted small fw-bold mb-1">Select Customer</label>
                            <select id="customer-select" class="form-select bg-light border-0 shadow-sm">
                                
                            </select>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label text-uppercase text-muted small fw-bold mb-1">Order Type</label>
                            <select id="order-type-select" class="form-select bg-light border-0 shadow-sm">
                                <option selected>Dine-in</option>
                                <option value="1">Takeaway</option>
                                <option value="2">Delivery</option>
                            </select>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label text-uppercase text-muted small fw-bold mb-1">Payment Type</label>
                            <select id="payment-type-select" class="form-select bg-light border-0 shadow-sm">
                                <option selected>Credit Card</option>
                                <option value="1">Cash</option>
                                <option value="2">Wallet</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-responsive mb-4">
                        <table class="table table-borderless align-middle">
                            <thead class="border-bottom">
                                <tr>
                                    <th scope="col" class="text-uppercase text-muted small fw-bold ps-0">Item Name</th>
                                    <th scope="col" class="text-uppercase text-muted small fw-bold text-center">Qty</th>
                                    <th scope="col" class="text-uppercase text-muted small fw-bold text-end">Price</th>
                                    <th scope="col" class="text-uppercase text-muted small fw-bold text-end pe-0">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-bottom border-light">
                                    <td class="fw-medium ps-0 py-3">Poached Egg</td>
                                    <td class="text-center py-3">2</td>
                                    <td class="text-end py-3">$ 40.50</td>
                                    <td class="text-end py-3">$ 0.33</td>
                                    <td class="text-end fw-medium pe-0 py-3">$ 40.83</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="row justify-content-end">
                        <div class="col-md-5">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted small">Subtotal</span>
                                <span class="fw-bold" id="subTotal">Rs : 0.00</span>
                            </div>
                            <div class="d-flex justify-content-between mb-3">
                                <span class="text-muted small">Tax</span>
                                <span class="fw-bold"  id="tax">Rs : 0.00</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold">Total</span>
                                <span id="total" class="fs-4 fw-bold text-warning">Rs : 0.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer border-0 d-flex justify-content-between pt-4">
                
                    <div class="ms-auto">
                        <button type="button" class="btn btn-outline-secondary me-2 px-4 py-2 fw-medium text-warning" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" id="confirmOrderBtn" class="btn btn-warning px-4 py-2 fw-medium">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
      `;
  },
  init() {
    $("#confirmOrderModel").modal();
    this.loadOrderData();
    this.loadCustomers();
  },
  loadOrderData: (orderData) => {
    const cartItems = ItemModel.getCart();
    const tbody = $("#confirmOrderModel tbody");
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
    $("#confirmOrderModel #subTotal").text(`Rs: ${subtotal.toFixed(2)}`);
    $("#confirmOrderModel #tax").text(`Rs: ${tax.toFixed(2)}`);
    $("#confirmOrderModel #total").text(`Rs: ${total.toFixed(2)}`);
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
    $("#confirmOrderModel").modal("hide");
  },
  open() {
    $("#confirmOrderModel").modal("show");
  },
  onConfirm(callback) {
    $("#confirmOrderModel #confirmOrderBtn")
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
