import { CustomerView } from "../view/CustomerView.js";
import { CustomerModel } from "../model/CustomerModel.js";
import OrderModel from "../model/OrderModel.js";
import { tost } from "../util/tostUtil.js";


export const render = () => {
    $("#main-content").html(CustomerView());
    loadCustomers();
}

const loadCustomers = (query = null) => {
    let customer_table_body = "";
    const customers = !query ? CustomerModel.getAll() : CustomerModel.getAllByQuery(query);
    customers.forEach(customer => {
        const orderCount = OrderModel.getOrdersByCustomerId(customer.id).length;
        customer_table_body += `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.mobile}</td>
                <td>${customer.address}</td>
                <td>${orderCount}</td>
                <td>
                    <button class="btn btn-light btn-sm edit-customer-btn text-secondary rounded-circle" data-bs-toggle="modal" data-bs-target="#customer-modal" data-customer-id="${customer.id}"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger btn-sm delete-customer-btn rounded-circle" data-customer-id="${customer.id}"><i class="bi bi-trash3"></i></button>
                </td>
            </tr>
        `
    });
    $("#customer-table-body").html(customer_table_body);
}

$(document).on("keyup", "#search_customer", function () {
    let searchText = $(this).val().toLowerCase();
    console.log(searchText)
    loadCustomers(searchText);
})

// Add new customer
$("body").on("click", "#add-customer-btn", () => {
    $("#customer-modal-label").text("Add New Customer");
    $("#customer-form")[0].reset();
    $("#customer-id").val("");
});



$("body").on("click", "#save-customer-btn", () => {
    let customerId = $("#customer-id").val();
    let customerName = $("#customer-name").val();
    let customerMobile = $("#customer-mobile").val();
    let customerAddress = $("#customer-address").val();

    const customerData = {
        name: customerName,
        mobile: customerMobile,
        address: customerAddress
    };

    if (customerId) {
        const response = CustomerModel.update(customerId, customerData);
        if (response) {
            tost("Customer Updated Successfully", "success")
        } else {
            tost("Customer Updated Failed", "error")
        }
    } else {
        // Add new customer
        const response = CustomerModel.add(customerData);
        if (response) {
            tost("Customer Added Successfully", "success")
        } else {
            tost("Customer Added Failed", "error")
        }
    }

    console.log(CustomerModel.getAll())

    loadCustomers();
    $("#customer-modal").modal("hide");
});


// edit customer
$("body").on("click", ".edit-customer-btn", function () {
    $("#customer-modal-label").text("Edit Customer");
    let customerId = $(this).data("customer-id");
    let customer = CustomerModel.getById(customerId);
    $("#customer-id").val(customer.id);
    $("#customer-name").val(customer.name);
    $("#customer-mobile").val(customer.mobile);
    $("#customer-address").val(customer.address);
});

// delete customer
$("body").on("click", ".delete-customer-btn", function () {
    let customerId = $(this).data("customer-id");
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            CustomerModel.remove(customerId);
            loadCustomers();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
});


export default render;
