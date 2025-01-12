let taskList = document.getElementById('task-list');
let newTaskInput = document.getElementById('new-task');

function addTask() {
    let taskText = newTaskInput.value.trim();
    if (taskText === '') return;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    newTaskInput.value = '';
    displayTasks();
}

function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        let taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.onclick = () => toggleComplete(index);

        let buttons = document.createElement('div');
        buttons.className = 'task-buttons';

        let editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(index);

        let deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(buttons);
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let newTaskText = prompt('Edit task:', tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Display tasks on page load
window.onload = displayTasks;