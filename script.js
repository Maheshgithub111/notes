const createBtn = document.querySelector(".add-btn");
const containerMain = document.querySelector(".container-main");
const noteContainer = document.getElementById("jsNoteAll");
const form = document.getElementById("input-form");
const inputTitle = document.getElementById("js-input-title");
const titleNote = document.getElementById("title-note");
const bodyNote = document.getElementById("js-input-note");


const data =[];


function inputNoteClicked(){
     document.getElementById('js-input-title').classList.remove('title-input');
     document.getElementById('close-btn').classList.remove('btn-display');
     document.getElementById('add-btn').classList.remove('btn-display');
};

function buttonfun(){
     document.getElementById('js-input-title').classList.add('title-input');
     document.getElementById('close-btn').classList.add('btn-display');
     document.getElementById('add-btn').classList.add('btn-display');
     }

console.log('working');

//an eventlistener for add-btn
form.addEventListener("submit", (e)=> {
     e.preventDefault();
     formValidation();
});

// just a arrow function
const formValidation = ()=>{
     if (inputTitle.value === "") {
          console.log("empty");
     }
     else{
          console.log("not empty");
          acceptData();
     }
};

const acceptData = () => {
     data["title"] = inputTitle.value;
     data["note"] = bodyNote.value;
     console.log(data);
     createNote();
};

const createNote = () =>{
noteContainer.innerHTML = data.map((note, index) => `
        <div class="note-container" id="note-${index}">
            <div class="title-note">${note.title}</div>
            <div class="note-text">${note.note}</div>
        </div>
    `);
     inputTitle.value = '';
     bodyNote.value = '';
}


