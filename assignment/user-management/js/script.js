let userForm = document.getElementById('user-form');
let userList = document.getElementById('user-list');
let userIdInput = document.getElementById('user-id');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');

userForm.addEventListener('submit', saveUser);

function saveUser(event) {
    event.preventDefault();
    let userId = userIdInput.value;
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();

    if (name === '' || email === '' || phone === '') return;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (userId) {
        // Update existing user
        let userIndex = users.findIndex(user => user.id === userId);
        users[userIndex] = { id: userId, name, email, phone };
    } else {
        // Add new user
        let newUser = { id: Date.now().toString(), name, email, phone };
        users.push(newUser);
    }

    localStorage.setItem('users', JSON.stringify(users));
    userForm.reset();
    displayUsers();
}

function displayUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach(user => {
        let li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email} - ${user.phone}`;

        let buttons = document.createElement('div');
        buttons.className = 'user-buttons';

        let editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editUser(user.id);

        let deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteUser(user.id);

        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);

        li.appendChild(buttons);
        userList.appendChild(li);
    });
}

function editUser(userId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.id === userId);

    userIdInput.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    phoneInput.value = user.phone;
}

function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

// Display users on page load
window.onload = displayUsers;