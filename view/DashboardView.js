export const DashboardView = () => {
  return `
  <div class="row vh-100">
        <div
          class="col-md-1 col-lg-1 bg-white vh-100 shadow-sm pt-4"
          id="left-nav"
        >
          <div
            id="sidebar-content"
            class="nav m-1 row row-cols-2 row-cols-md-1 nav-pills text-center"
          ></div>
        </div>

        <main class="col-md-11 col-lg-11 bg-light p-4" id="main-content">
          <div class="d-flex mb-3">
            <div>
              <button class="btn btn-outline-secondary active me-2">All</button>
              <button class="btn btn-outline-secondary me-2">Ice Coffee</button>
              <button class="btn btn-outline-secondary me-2">American</button>
              <button class="btn btn-outline-secondary me-2">Café Noir</button>
              <button class="btn btn-outline-secondary me-2">
                Brewed Coffee
              </button>
            </div>
            <div class="input-group ms-auto w-25">
              <input
                id="order_item_search_input"
                type="text"
                class="form-control rounded-end-circle rounded-pill"
                placeholder="Search items..."
                aria-label="Search items"
                aria-describedby="basic-addon2"
              />
              <span
                class="input-group-text rounded-pill rounded-start-circle"
                id="basic-addon2"
              >
                <i class="bi bi-search"></i>
              </span>
            </div>
          </div>

          <div
            class="row row-cols-auto gap-3 d-flex justify-content-center"
            id="order_item_container"
          ></div>
        </main>
      </div>
  `;
};
