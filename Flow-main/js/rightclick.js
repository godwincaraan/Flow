
const notes = document.querySelector(".noteInstance");
const customContextMenu = document.querySelector(".custom-context-menu");

// //context menu pop up after right click for every notes
// notes.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
//   let topPosition = e.clientY;
//   let leftPosition = e.clientX;
//   customContextMenu.classList.add("active");

//   customContextMenu.style.left = leftPosition + "px";
//   customContextMenu.style.top = topPosition + "px";
// });

// //context menu will disappear on left click
// window.addEventListener("click", () => {
//   customContextMenu.classList.remove("active");
// });
