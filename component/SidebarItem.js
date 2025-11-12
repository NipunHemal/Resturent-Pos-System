export const SidebarContent = (item) => {
  return `
          <a class="nav-link" href="#" title="${item.name}" data-category="${item.name}">
            <i class="${item.icon} fs-3"></i>
            <div class="d-block d-md-none d-lg-block">${item.name}</div>
          </a>
        `;
};
