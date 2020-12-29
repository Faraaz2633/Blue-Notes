console.log("Welcome to BLUE NOTES");
let addbtn = document.getElementById('addbtn');
shownotes();
addbtn.addEventListener('click', function(e){
    let addtxt = document.getElementById('addtxt');
    let notes = localStorage.getItem('notes');
    let addtitle = document.getElementById('addtitle');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        title : addtitle.value,
        text : addtxt.value
    }
    notesObj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addtitle.value = "";
    addtxt.value = "";
    shownotes();
})
function shownotes(){
    let notes = localStorage.getItem('notes');
    
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element , index) {
       html += `
        <div class="card-body nc">
        <h5 class="card-title"> ${element.title}</h5>
        <p class="card-content">${element.text}</p>
        <button id ="${index}" onClick = "deleteNote(this.id)" class="btn">Delete Note</button>
    </div> `;


    });
    var nothingtxt =  `Nothing to Show! Use "Add a Note" section above to add notes.`;
    let notesElement = document.getElementById('notesElement');
    if(notesObj.length != 0){
        notesElement.innerHTML = html;
    }
    else{
        notesElement.innerText = nothingtxt;
    }
}

function deleteNote(index){
    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}


let search = document.getElementById("searchtxt");

search.addEventListener("input", function(){
    let inputval = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName("nc");

    Array.from(noteCard).forEach(function(element){
        let cardtxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardtxt.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });

});   