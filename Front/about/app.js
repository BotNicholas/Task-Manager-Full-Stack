// General Section

const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
const layout = document.getElementById("app-layout");
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    window.location.href = menuItem.dataset.href;
  });
})

sidebarCloseBtn.addEventListener("click", () => {
  if (layout.classList.contains("sidebar-hidden")) {
    layout.classList.remove("sidebar-hidden");
  } else {
    layout.classList.add("sidebar-hidden");
  }
})
