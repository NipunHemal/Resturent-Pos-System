export const CustomerView = () => {
    return `
    <div id="customer_view" class="container-fluid p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="input-group" style="width: 350px;">
                <span class="input-group-text bg-white border-end-0"><i class="fa fa-search"></i></span>
                <input id="search_customer" type="text" class="form-control border-start-0" placeholder="Search customers...">
            </div>
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#customer-modal" id="add-customer-btn">Add New Customer</button>
        </div>

        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th scope="col" class="text-muted fw-normal">Customer Name</th>
                                <th scope="col" class="text-muted fw-normal">Mobile Number</th>
                                <th scope="col" class="text-muted fw-normal">Address</th>
                                <th scope="col" class="text-muted fw-normal">Orders</th>
                                <th scope="col" class="text-muted fw-normal">Action</th>
                            </tr>
                        </thead>
                        <tbody id="customer-table-body">
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Customer Modal -->
    <div class="modal fade" id="customer-modal" tabindex="-1" aria-labelledby="customer-modal-label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="customer-modal-label">Add New Customer</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="customer-form">
                <input type="hidden" id="customer-id">
                <div class="mb-3">
                    <label for="customer-name" class="form-label">Customer Name</label>
                    <input type="text" class="form-control" id="customer-name" required>
                </div>
                <div class="mb-3">
                    <label for="customer-mobile" class="form-label">Mobile Number</label>
                    <input type="text" class="form-control" id="customer-mobile" required>
                </div>
                <div class="mb-3">
                    <label for="customer-address" class="form-label">Address</label>
                    <textarea class="form-control" id="customer-address" rows="3" required></textarea>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light text-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-orange" id="save-customer-btn">Save Customer</button>
          </div>
        </div>
      </div>
    </div>
    `
}