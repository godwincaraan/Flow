//fuction to show the instructions popup
const popup = document.querySelector('.instructionOverlay');

function instructionOpen() {
    popup.classList.add('open');
}

//function to close instruction popup using exit button

function instructionClose() {
    popup.classList.remove('open');
}

//Close instruction popup using escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        popup.classList.remove('open');
    }
});