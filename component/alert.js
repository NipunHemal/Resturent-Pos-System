function getAlert(type = "info", message = "", title = "") {
  const config = {
    success: {
      icon: "bi-check-circle-fill",
      alertClass: "alert-success",
    },
    error: {
      icon: "bi-x-circle-fill",
      alertClass: "alert-danger",
    },
    warn: {
      icon: "bi-exclamation-triangle-fill",
      alertClass: "alert-warning",
    },
    info: {
      icon: "bi-info-circle-fill",
      alertClass: "alert-primary",
    },
  };

  const { icon, alertClass } = config[type] || config.info;

  return `
    <div class="alert ${alertClass} d-flex align-items-center px-4 py-2" role="alert">
      <i class="bi ${icon} fs-2 me-3"></i>
      <div>
        <h5 class="mb-1 fw-semibold">${title}</h5>
        <div>${message}</div>
      </div>
    </div>
  `;
}

export default getAlert;
