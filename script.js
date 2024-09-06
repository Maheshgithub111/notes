const createBtn = document.getElementById("add-btn");
const containerMain = document.querySelector(".container-main");
const noteContainer = document.getElementById("jsNoteAll");
const form = document.getElementById("input-form");
const inputTitle = document.getElementById("js-input-title");
const titleNote = document.getElementById("title-note");
const bodyNote = document.getElementById("js-input-note");
const closeBtnElement = document.getElementById("close-btn");

const data = [];

const createNoteTemplate = (note) => {
  noteContainer.innerHTML += `
        <div class="note-container">
             <div class="title-note">${note.title}</div>
                  <div class="note-text">${note.note}</div>
                      <img class="rewrite-icon" width="20" height="20" src="https://img.icons8.com/pastel-glyph/128/FFFFFF/edit--v1.png" alt="edit--v1"/>
                  <img class="trash-bin" width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/filled-trash.png" alt="filled-trash"/>
        </div>`;

  inputTitle.value = "";
  bodyNote.value = "";
};

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

//an eventlistener for add-btn
createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formValidation();
  buttonfun();
});

function renderData() {
  const data = JSON.parse(localStorage.getItem("data")) || [];
  data.forEach(createNoteTemplate);
}

// just a arrow function
const formValidation = () => {
  if (inputTitle.value === "") {
    console.log("empty");
  } else {
    acceptData();
    localStorage.setItem("data", JSON.stringify(data));
  }
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

renderData();

function uuidv4() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0,
           v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
     });
   }
   
const myUUID = uuidv4();
console.log(myUUID);