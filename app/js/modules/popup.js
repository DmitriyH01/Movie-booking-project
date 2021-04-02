const popup = document.querySelector(".popup");

popup.addEventListener("click", function ({ target }) {
  const menu = document.querySelector(".navigation_items");
  if (target.checked) {
    menu.style.display = "grid";
  } else if (!target.checked) {
    menu.style.display = "none";
  }
});
