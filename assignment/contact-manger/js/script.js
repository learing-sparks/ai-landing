document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    const contactsList = document.querySelector('.contacts-list');

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    function renderContacts() {
        contactsList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const contactItem = document.createElement('div');
            contactItem.classList.add('contact-item');
            contactItem.innerHTML = `
                <div>
                    <h3>${contact.name}</h3>
                    <p>Email: ${contact.email}</p>
                    <p>Phone: ${contact.phone}</p>
                </div>
                <div>
                    <button onclick="editContact(${index})">Edit</button>
                    <button onclick="deleteContact(${index})">Delete</button>
                </div>
            `;
            contactsList.appendChild(contactItem);
        });
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;

        if (name && email && phone) {
            contacts.push({ name, email, phone });
            localStorage.setItem('contacts', JSON.stringify(contacts));
            renderContacts();
            e.target.reset();
        }
    });

    window.editContact = function(index) {
        const contact = contacts[index];
        const name = prompt('Edit name:', contact.name);
        const email = prompt('Edit email:', contact.email);
        const phone = prompt('Edit phone:', contact.phone);

        if (name !== null && email !== null && phone !== null) {
            contacts[index] = { name, email, phone };
            localStorage.setItem('contacts', JSON.stringify(contacts));
            renderContacts();
        }
    };

    window.deleteContact = function(index) {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
    };

    renderContacts();
});