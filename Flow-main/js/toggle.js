const toggleSwitch = document.querySelector("#toggle");
const kanbanGroup = document.querySelectorAll(".kanbanGroup");
const todoScroll = document.querySelectorAll(".todoScroll");
const noteInstance = document.querySelectorAll(".noteInstance");
const backDrop = document.querySelectorAll("#backDrop");
const note = document.querySelectorAll(".note");
const instructionPopup = document.querySelector('.instructionOverlay .instructionPopup');
const titleNight = document.querySelectorAll(".instructionTitle");
const textNight = document.querySelectorAll(".image-text");
const table = document.querySelectorAll(".image-table");
const blocker = document.querySelectorAll(".instructionBlocker");
const close = document.querySelectorAll("#close");
const menu = document.querySelectorAll(".menu");
const textMenu = document.querySelectorAll(".custom-context-menu li a");
const hoverMenu = document.querySelectorAll(".custom-context-menu ul li a");


function toggleMode() {
  kanbanGroup.forEach((kanbanGroup) => {
    kanbanGroup.classList.toggle("dark-theme3");
  });
  todoScroll.forEach((todoScroll) => {
    todoScroll.classList.toggle("dark-theme6");
  });
  backDrop.forEach((backDrop) => {
    backDrop.classList.toggle("nightmode");
  });
  instructionPopup.classList.toggle("nightMODE1");
  titleNight.forEach((titleNight) => {
    titleNight.classList.toggle("nightMODE2");
  });
  textNight.forEach((textNight) => {
    textNight.classList.toggle("nightMODE3");
  });
  table.forEach((table) => {
    table.classList.toggle("nightMODE4");
  });
  blocker.forEach((blocker) => {
    blocker.classList.toggle("nightMODE0");
  });
  close.forEach((close) => {
    close.classList.toggle("nightMODE5");
  });
  menu.forEach((menu) => {
    menu.classList.toggle("menuDarkMode");
  });
  textMenu.forEach((textMenu) => {
    textMenu.classList.toggle("menuTextDarkMode");
  });
  hoverMenu.forEach((hoverMenu) => {
    hoverMenu.classList.toggle("hoverMenuDarkMode");
  });
}

toggleSwitch.addEventListener("change", toggleMode);
