let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    displayCart();
});

function fetchProducts() {
    // Simulate fetching products from a database
    products = [
        { id: 1, name: 'Product 1', price: 10.00 },
        { id: 2, name: 'Product 2', price: 20.00 },
        { id: 3, name: 'Product 3', price: 30.00 }
    ];
    displayProducts();
}

function displayProducts() {
    let productContainer = document.getElementById('products');
    productContainer.innerHTML = '';
    products.forEach(product => {
        let li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        let addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.onclick = () => addToCart(product.id);
        li.appendChild(addButton);
        productContainer.appendChild(li);
    });
}

function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    let cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        let updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => updateCart(item.id);
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.id);
        li.appendChild(updateButton);
        li.appendChild(removeButton);
        cartContainer.appendChild(li);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

function updateCart(productId) {
    let newQuantity = prompt('Enter new quantity:');
    if (newQuantity !== null) {
        newQuantity = parseInt(newQuantity);
        if (newQuantity > 0) {
            let cartItem = cart.find(item => item.id === productId);
            cartItem.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function generateBill() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Total Bill: $${total.toFixed(2)}`);
}

function resetBill() {
    localStorage.setItem('cart', '[]');
    location.reload();
}
