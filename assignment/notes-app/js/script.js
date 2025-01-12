document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.querySelector('form');
    const notesList = document.querySelector('.notes-list');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');
            noteItem.innerHTML = `
                <div>
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>
                </div>
                <div>
                    <button onclick="editNote(${index})">Edit</button>
                    <button onclick="deleteNote(${index})">Delete</button>
                </div>
            `;
            notesList.appendChild(noteItem);
        });
    }

    noteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;

        if (title && content) {
            notes.push({ title, content });
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
            e.target.reset();
        }
    });

    window.editNote = function(index) {
        const note = notes[index];
        const title = prompt('Edit title:', note.title);
        const content = prompt('Edit content:', note.content);

        if (title !== null && content !== null) {
            notes[index] = { title, content };
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        }
    };

    window.deleteNote = function(index) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    renderNotes();
});