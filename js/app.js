const menu = document.querySelector("nav");
const menuItems = menu.querySelectorAll("a");

menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menuItems.forEach((element) => element.classList.remove("active"));
    menu.querySelector(`#${e.target.id}`).classList.toggle("active");
  }
});
