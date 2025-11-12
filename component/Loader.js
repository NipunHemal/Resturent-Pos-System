export function loader(type = "default") {
  // 🔹 Create loader element dynamically
  const $loadingEl = $(`
    <div class="page-loader vh-100 vw-100 position-fixed top-0 start-0 d-flex flex-column justify-content-center align-items-center bg-white" style="z-index: 1050;">
      <span class="spinner-border text-primary" role="status"></span>
      <span class="text-muted fs-6 fw-semibold mt-3">Loading...</span>
    </div>
  `);

  const $loadingEl2 = $(`
    <div class="page-loader vh-100 vw-100 position-fixed top-0 start-0 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-25" style="z-index: 1050;">
      <span class="spinner-border text-primary" role="status"></span>
      <span class="text-muted fs-6 fw-semibold mt-3">Loading...</span>
    </div>
  `);

  if (type === "dark") {
    $("body").prepend($loadingEl2);

    setTimeout(() => {
      $loadingEl2.fadeOut(500, function () {
        $(this).remove();
      });
    }, 500);
  } else {
    $("body").prepend($loadingEl);

    setTimeout(() => {
      $loadingEl.fadeOut(500, function () {
        $(this).remove();
      });
    }, 500);
  }
}
