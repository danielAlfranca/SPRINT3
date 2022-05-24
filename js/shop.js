// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [{
            id: 1,
            name: 'cooking oil',
            price: 10.5,
            type: 'grocery',
            offer: {
                number: 3,
                percent: 20
            }
        },
        {
            id: 2,
            name: 'Pasta',
            price: 6.25,
            type: 'grocery'
        },
        {
            id: 3,
            name: 'Instant cupcake mixture',
            price: 5,
            type: 'grocery',
            offer: {
                number: 10,
                percent: 30
            }
        },
        {
            id: 4,
            name: 'All-in-one',
            price: 260,
            type: 'beauty'
        },
        {
            id: 5,
            name: 'Zero Make-up Kit',
            price: 20.5,
            type: 'beauty'
        },
        {
            id: 6,
            name: 'Lip Tints',
            price: 12.75,
            type: 'beauty'
        },
        {
            id: 7,
            name: 'Lawn Dress',
            price: 15,
            type: 'clothes'
        },
        {
            id: 8,
            name: 'Lawn-Chiffon Combo',
            price: 19.99,
            type: 'clothes'
        },
        {
            id: 9,
            name: 'Toddler Frock',
            price: 9.99,
            type: 'clothes'
        }
    ]
    // Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array

    let product = products.find(item => item.id == id);

    product ? cartList.push({...product }) : null

}

// Exercise 2
function cleanCart() {

    cart = [];
    updateHTML();
    saveCart();
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array


    return cartList.reduce((num, item) => num + Number(item.price), 0)
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

    cart = cartList.filter((e, i) => cartList.findIndex(d => e.id == d.id) == i);

    cart = cart.map(e => ({...e, quantity: cartList.filter(item => item.id = e.id).length }));
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    cart = cart.map(e => {

        let withDiscount = e.offer && e.offer.number <= e.quantity;

        e.subtotal = (e.price * e.quantity);

        if (withDiscount) e.subtotalWithDiscount = (e.subtotal * ((100 - e.offer.percent) / 100)).toFixed(2)

        else delete e.subtotalWithDiscount

        return e;
    });
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom

    let modal = document.getElementById('cartModal'),
        productList = modal.querySelector('#cart_list'),
        row, name, td;

    productList.innerHTML = '';

    cart.forEach(item => {

        row = document.createElement('tr');
        name = document.createElement('th');
        name.innerHTML = item.name;
        row.append(name);

        ['price', 'quantity', 'subtotalWithDiscount', 'subtotal'].filter((e, i) => item[e]).filter((e, i) => i < 3).forEach(tag => {

            td = document.createElement('td');
            td.innerText = item[tag];
            row.append(td);
        });

        // AÑADIR ICONO PARA IMPLEMENTAR FUNCTION removeFromCart

        td = document.createElement('td');

        td.innerHTML = '<i class="fas fa-minus-circle pointer"></i>';

        td.addEventListener('click', () => removeFromCart(item.id));

        row.append(td);
        productList.append(row);
    })
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.

    let product = products.find(item => item.id == id);

    if (product) {

        product = {...product }
        product.quantity = ((cart.find(e => e.id == id) || {}).quantity || 0) + 1;
        cart = cart.filter(e => e.id != id).concat([product]);
        applyPromotionsCart();
        insertTotalInHtml();
        saveCart();
    }
}


// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array

    ((cart.find(e => e.id == id) || { quantity: 1 }).quantity) -= 1;

    cart = cart.filter(e => e.quantity > 0);
    applyPromotionsCart();
    updateHTML();
    saveCart();

}

function open_modal() {
    console.log("Open Modal");
    printCart();
}


// MIS FUNCIONES //

function updateTotalWithDiscounts() {

    return cart.reduce((sum, e) => sum + Number(e.subtotal || 0), 0);
}

function insertTotalInHtml() {

    let total = updateTotalWithDiscounts();

    (document.getElementById('count_product') || {}).innerText = '$' + total;
    (document.getElementById('total_price') || {}).innerText = total;

}

function updateHTML() {

    insertTotalInHtml();
    printCart();

}

function saveCart() {

    sessionStorage.setItem('cart', JSON.stringify(cart))
}

function initCart() {

    if (sessionStorage.cart) {

        cart = JSON.parse(sessionStorage.getItem("cart"));

        updateHTML();
    }
}

window.addEventListener("load", () => initCart());