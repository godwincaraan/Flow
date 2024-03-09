//Initialization of the document object

const todo = document.getElementById("todo");
const addTodo = todo.querySelector(".addButton");
const targetDiv = todo.querySelector("#todoGroup")

//For each loop to iterate through notes in the array, creating an HTML elements for each
getShortNotes().forEach(note => {
    const noteElement = createShortNote(note.id, note.content, note.fontWeight, note.fontStyle, note.backgroundColor);

    targetDiv.appendChild(noteElement);
    // const reference = targetDiv.firstChild;

    // targetDiv.insertBefore(noteElement, reference);
})

//Event Listener to call addNote() function when addnote button is clicked.
addTodo.addEventListener("click", () => addNote());

//function that parses notes retrieved from the local storage
function getShortNotes() {
    return JSON.parse(localStorage.getItem("shortnote") || "[]");
}

//function that automatically saves short notesto local storage
function saveShortNotes(notes) {
    localStorage.setItem("shortnote", JSON.stringify(notes));
}

//Function that creates short note AND its HTML component to the front-end
function createShortNote(id, content, fontWeight, fontStyle, backgroundColor) {
    const divElement = document.createElement("div");
    divElement.className = "noteInstance";
    divElement.draggable = "true";
    divElement.setAttribute("data-note-id", id);

    const dragElement = document.createElement("label");
    dragElement.className = "dragHandle";
    dragElement.textContent = "..."

    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Write your task here...";
    element.style.fontWeight = fontWeight;
    element.style.fontStyle = fontStyle;
    element.style.backgroundColor = backgroundColor;

    divElement.appendChild(dragElement);
    divElement.appendChild(element);

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    })


    const body = document.body;
    const updateTheme = () => {
        if (body.classList.contains('dark-theme')) {
            divElement.classList.add('dark-theme4');
        } else {
            divElement.classList.remove('dark-theme4');
        }
    };

    // Call the updateTheme function initially to set the class based on the current theme
    updateTheme();

    // Use a MutationObserver to detect changes in the body class (theme change)
    const observer = new MutationObserver(updateTheme);
    observer.observe(body, { attributes: true });
    
    //event listeners for right click menu
    element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        
        let topPosition = e.clientY;
        let leftPosition = e.clientX;
        customContextMenu.classList.add("active");
      
        customContextMenu.style.left = leftPosition + "px";
        customContextMenu.style.top = topPosition + "px";

        const menu = document.getElementById("menu");
        divElement.style.borderColor = "#0f67aacc";
        divElement.style.borderWidth = "2px";
        divElement.setAttribute("data-note-id", id);
        
        //event listener for right click menu. 
        menu.addEventListener("click", (event) => {
            
            const clickedElement = event.target;
            
            if (clickedElement.id === "bold"){
                boldText(id, element)
                divElement.style.borderColor = "#d4d4d4";
                divElement.style.borderWidth = "1px";
            }

            if (clickedElement.id === "del"){
                deleteNote(id, divElement);
            }
            if (clickedElement.id == "highlight"){
                highlightText(id, element);
                divElement.style.borderColor = "#d4d4d4";
                divElement.style.borderWidth = "1px";
            }
            if (clickedElement.id === "ital"){
                italicText(id, element);
                divElement.style.borderColor = "#d4d4d4";
                divElement.style.borderWidth = "1px";
            }
        }, {once:true});
    });


    window.addEventListener("click", () => {
        customContextMenu.classList.remove("active");
        divElement.style.borderColor = "#d4d4d4";
        divElement.style.borderWidth = "1px";
    });

    return divElement;

}

//Function that creates short note by giving it a specific ID and its corressponding content
function addNote() {
    const notes = getShortNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
        fontWeight: "",
        fontStyle: ""
    };

    const noteElement = createShortNote(noteObject.id, noteObject.content, noteObject.fontWeight, noteObject.fontStyle, noteObject.backgroundColor)
    // todo.insertBefore(noteElement, addButton.nextSibling);

    targetDiv.appendChild(noteElement);

    notes.push(noteObject);
    saveShortNotes(notes);
}

//function that checks the new update on the current note html
function updateNote(id, newContent) {
    const notes = getShortNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;

    saveShortNotes(notes);
}

//function that handles deletion of notes 
function deleteNote(id, element) {
    const notes = getShortNotes().filter(note => note.id != id);

    saveShortNotes(notes);
    element.remove(); 
}

//function that make text bold
function boldText(id, element) {
    const notes = getShortNotes();
    const targetNote = notes.find(note => note.id === id);
    console.log(targetNote);
    if (targetNote.fontWeight != 'bold') {
        targetNote.fontWeight = 'bold';
        console.log("converted to bold")
        } else if (targetNote.fontWeight == 'bold'){
            targetNote.fontWeight = '600';
        console.log("it was bold, back to normal")
    }
    element.style.fontWeight = targetNote.fontWeight;
    saveShortNotes(notes);
    return targetNote.fontWeight;
  }

  function italicText(id, element) {
    const notes = getShortNotes();
    const targetNote = notes.find(note => note.id === id);
  
    if (targetNote.fontStyle != 'italic') {
        targetNote.fontStyle = 'italic';
        console.log("converted to italic")
        } else if (targetNote.fontStyle == 'italic'){
        targetNote.fontStyle = 'normal';
        console.log("it was italic, back to normal")
    }
  
    saveShortNotes(notes);
  
    // Update the corresponding HTML element
    element.style.fontStyle = targetNote.fontStyle;

    return targetNote.fontStyle;
  }
  
    //function in highlighting the text
    function highlightText(id, element) {
        const notes = getShortNotes();
        const targetNote = notes.find(note => note.id === id);
       
        if (targetNote.backgroundColor != '#ccebf5d2') {
            targetNote.backgroundColor = '#ccebf5d2';
            console.log("converted to italic")
        } else if (targetNote.backgroundColor == '#ccebf5d2'){
            targetNote.backgroundColor = 'transparent';
            console.log("it was #CCEBF5, back to normal")
        }
    
        saveShortNotes(notes);
    
        element.style.backgroundColor = targetNote.backgroundColor;
      }
      
  
  
//Dragabble JS
(function () {
    var dragged, listener;

    console.clear();

    dragged = null;

    listener = document.getElementById("kanbanBoard");

    listener.addEventListener("dragstart", (event) => {
        console.log("start !");
        dragged = event.target;
        console.log(dragged);

        if (dragged.className == "note" || dragged.className == "note"){
            dragged = event.target.parentNode; 
        } 
        
        else if (dragged.classList.contains("class")){
            dragged = null;
            event.preventDefault()
        }

        console.log(event.target);
        console.log(dragged.className);

    });

    listener.addEventListener("dragend", (event) => {
        dragged = null;
        console.log("end !");
    });

    listener.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    listener.addEventListener("drop", (event) => {
        //troubleshooting only
        /*console.log("drop !");
        console.log(event.target);
        console.log(dragged);*/
        
        //execute if target of drop IS over an existing note
        if (event.target.className == "note" || event.target.className == "dragHandle") {
            /*gets grandparent node of dragged element and inserts it before the
            parent node of hovered over element*/
            event.target.parentNode.parentNode.insertBefore(dragged, event.target.parentNode);
            
            // Save the drop position
            const position = {
                left: event.clientX + "px",
                top: event.clientY + "px"
            };
            console.log(dragged)
            const noteId = dragged.getAttribute("data-note-id");
            saveNotePosition(noteId, position);

            //resets dragged to null for next drag execution 
            dragged = null;
        }
        
        //execute if target of drop is NOT over an existing note
        else if (event.target.className == "todoScroll" || event.target.className == "todoScroll dark-theme6"){
            event.target.appendChild(dragged);
            dragged = null;
        }  

        //do nothing if dragged over element does not have any class
        else if (!(dragged.classList.contains("class"))){
            dragged = null;
        }   

        //??
        else {
            event.preventDefault();
        }  
        
        dragged = null;
    });
    
    dragged = null;

}).call(this);

// Function that saves the note position in the local storage
function saveNotePosition(noteId, position) {
    const positions = getNotePositions();
    positions[noteId] = position;
    saveNotePositions(positions);
}

// Function that retrieves the note positions from the local storage
function getNotePositions() {
    return JSON.parse(localStorage.getItem("notePositions") || "{}");
}

// Function that saves the note positions to the local storage
function saveNotePositions(positions) {
    localStorage.setItem("notePositions", JSON.stringify(positions));
}

window.addEventListener('load', function () {
    setTimeout(function () {
        var loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
    }, 1500); // 1.5 seconds
});

function signOut() {
    var loadingScreen2 = document.getElementById("loading-screen2");
    loadingScreen2.style.display = "block";
    
    setTimeout(function() {
      window.location.href = "loginPage.html";
      setTimeout(function() {
        loadingScreen2.classList.add('fade-out');
      }, 100); 
    }, 1500); 
  }
  



