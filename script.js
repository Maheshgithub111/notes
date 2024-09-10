const createBtn = document.getElementById("add-btn");
const containerMain = document.querySelector(".container-main");
const noteContainer = document.getElementById("jsNoteAll");
const form = document.getElementById("input-form");
const inputTitle = document.getElementById("js-input-title");
const titleNote = document.getElementById("title-note");
const bodyNote = document.getElementById("js-input-note");
const closeBtnElement = document.getElementById("close-btn");
const myUUID = uuidv4();
const rewriteBtn = document.querySelector(".rewrite-icon");
const focusedContainerMain = document.querySelector(".focusedcontainermain");

const data = [];

function inputNoteClicked() {
  document.getElementById("js-input-title").classList.remove("title-input");
  document.getElementById("close-btn").classList.remove("btn-display");
  document.getElementById("add-btn").classList.remove("btn-display");
}

function buttonfun() {
  document.getElementById("js-input-title").classList.add("title-input");
  document.getElementById("close-btn").classList.add("btn-display");
  document.getElementById("add-btn").classList.add("btn-display");
}

// an eventlistener for close-btn
closeBtnElement.addEventListener("click", (e) => {
  buttonfun();
  e.preventDefault();
  inputTitle.value = "";
  bodyNote.value = "";
});

//addnote, savenote,

const createNoteTemplate = (note) => {
  noteContainer.innerHTML += `
        <div class="note-container">
             <div class="title-note">${note.title}</div>
                  <div class="note-text">${note.note}</div>
                      <img class="rewrite-icon" onclick = "editClicked('${note.id}')" width="20" height="20" src="https://img.icons8.com/pastel-glyph/128/FFFFFF/edit--v1.png" alt="edit--v1"/>
                  <img class="trash-bin" onclick= "deleteNote('${note.id}')" width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/filled-trash.png" alt="filled-trash"/>
        </div>`;

  inputTitle.value = "";
  bodyNote.value = "";
};

const acceptData = () => {
  const note = {
    title: inputTitle.value,
    note: bodyNote.value,
    id: uuidv4(),
  };
  data.push(note);
  console.log(data);
  createNoteTemplate(note);
};

//an eventlistener for add-btn
createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formValidation(); //to validate the input(note) and accept data;
  buttonfun(); //to close the top section
});

// just a arrow function
const formValidation = () => {
  if (inputTitle.value === "") {
    console.log("empty");
  } else {
    acceptData();
    localStorage.setItem("data", JSON.stringify(data));
  }
};

//fix deletefun

function deleteNote(id) {
  let data = JSON.parse(localStorage.getItem("data"));
  data = data.filter((note) => note.id !== id);
  localStorage.setItem("data", JSON.stringify(data));
  renderNote();
  console.log(data);
}

function editClicked(id) {
     // Get the data from localStorage
     const data = JSON.parse(localStorage.getItem("data")) || [];
     const noteToEdit = data.find((note) => note.id === id);
   
     if (!noteToEdit) {
       console.error("Note not found");
       return;
     }
   
     // Get the focused container
     const focusedContainerMain = document.getElementById("focusedcontainermain");
     
     // Create and display the focused container
     focusedContainerMain.innerHTML = `
       <div class="focusedContainer">
         <div class="title" contenteditable="true">${noteToEdit.title}</div>
         <div class="note" contenteditable="true">${noteToEdit.note}</div>
         <div class="buttonFocusedContainer">    
           <button class="savebtnOnFocused" onclick="saveEditedNote('${id}')">Save</button>
           <button class="closebtnOnFocused" onclick="closeFocusedContainer()">Close</button>
         </div>
       </div>
     `;
   
     // Show the focused container
     focusedContainerMain.style.display = "flex";
     focusedContainerMain.style.zIndex = "10";
   }
   
   function closeFocusedContainer() {
     const focusedContainerMain = document.getElementById("focusedcontainermain");
     focusedContainerMain.style.display = "none";
     focusedContainerMain.style.zIndex = "-1";
   }
   
   function saveEditedNote(id) {
     const focusedContainer = document.querySelector(".focusedContainer");
     const editedTitle = focusedContainer.querySelector(".title").textContent;
     const editedNote = focusedContainer.querySelector(".note").textContent;
   
     let data = JSON.parse(localStorage.getItem("data")) || [];
     const noteIndex = data.findIndex(note => note.id === id);
   
     if (noteIndex !== -1) {
       data[noteIndex].title = editedTitle;
       data[noteIndex].note = editedNote;
       localStorage.setItem("data", JSON.stringify(data));
       renderNote();
       closeFocusedContainer();
     } else {
       console.error("Note not found");
     }
   }

function renderNote() {
  const data = JSON.parse(localStorage.getItem("data")) || [];
  noteContainer.innerHTML = "";
  data.forEach(createNoteTemplate);
}

// id for each
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

renderNote();
