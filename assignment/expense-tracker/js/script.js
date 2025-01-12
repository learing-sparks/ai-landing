document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.querySelector('form');
    const expenseList = document.querySelector('.expense-list');
    const summary = document.querySelector('.summary h2');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.innerHTML = `
                <span>${expense.description} - $${expense.amount} - ${expense.date}</span>
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
        });
        updateSummary();
    }

    function updateSummary() {
        const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        summary.textContent = `Total Expenses: $${total.toFixed(2)}`;
    }

    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const description = e.target.description.value;
        const amount = e.target.amount.value;
        const date = e.target.date.value;

        if (description && amount && date) {
            expenses.push({ description, amount, date });
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            e.target.reset();
        }
    });

    window.deleteExpense = function(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    renderExpenses();
});