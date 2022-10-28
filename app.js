const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const popupTitle = document.querySelector('.title input');
const popupDesc = document.querySelector('.desc textarea');
const closeIcon = document.querySelector('.closebtn');
const addbtn = document.querySelector('button');
const title = document.querySelector('input');
const desc = document.querySelector('textarea');
// const deletebtn = document.querySelector('.delete');

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const notes = JSON.parse(localStorage.getItem('notes') || '[]');

addBox.addEventListener('click', ()=>{
    popupBox.classList.add('show');
});

closeIcon.addEventListener('click', ()=>{
    popupBox.classList.remove('show');
});

const showNotes = ()=>{
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.desc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <span onclick='showMenu(this)' class="material-symbols-outlined"> more_horiz </span>
                                <div class="menu">
                                    <p onclick='updateNote(${index})'>edit</p>
                                    <p class='delete' onclick='deleteNote(${index})'>delete</p>
                                </div>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liTag);
    });
};

showNotes();

const showMenu = (e)=>{
    // console.log(e.parentElement);
    e.parentElement.classList.add('show');

    document.addEventListener('click', ele =>{
        if(ele.target.tagName != 'SPAN' || ele.target != e){
            e.parentElement.classList.remove('show');
        }
    });
};

const deleteNote = (e)=>{
    // console.log(e);
    notes.splice(e,1);
    localStorage.setItem('notes', JSON.stringify(notes));
    location.reload();
};

const updateNote = (index)=>{
    addBox.click();
    addbtn.innerHTML = 'Update Note';
    popupTitle.value = notes[index].title;
    popupDesc.value = notes[index].desc;
    notes.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notes));
};

addbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let noteTitle = title.value,
    noteDesc = desc.value;

    if(noteTitle || noteDesc){
        let date = new Date(),
        month = months[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear();

        let noteInfo = {
            title: noteTitle,
            desc: noteDesc,
            date: `${month} ${day}, ${year}`
        };

        // console.log(month, day, year);
        notes.push(noteInfo);
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        // showNotes();
        location.reload();
    }
});

// deletebtn.addEventListener('click', (e)=>{
//     console.log(e.target.classList);
// });