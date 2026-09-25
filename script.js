/* =========================
   FOODPREORDER JAVASCRIPT
   CAMPUS TECH HUB
========================= */


/* =========================
   CART DATA
========================= */

let cart = [];
let currentOrder = null;


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to cart! 🛒");
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <p>Add some food from the menu.</p>
            </div>
        `;

        cartTotal.innerHTML = "";

        cartCount.textContent = "0";

        return;
    }


    let total = 0;
    let totalQuantity = 0;


    cartItems.innerHTML = cart.map(
        (item, index) => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            totalQuantity += item.quantity;


            return `
                <div class="cart-item">

                    <div class="cart-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <div class="cart-price">
                            ₱${item.price}
                        </div>

                    </div>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>


                    <strong>
                        ₱${itemTotal}
                    </strong>


                    <button
                        class="remove-button"
                        onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>
            `;

        }
    ).join("");


    cartTotal.innerHTML = `

        <div class="cart-total">

            <h2>
                Total: ₱${total}
            </h2>

            <div class="cart-actions">

                <button
                    class="clear-button"
                    onclick="clearCart()">

                    Clear Cart

                </button>


                <button
                    class="checkout-button"
                    onclick="goToCheckout()">

                    Proceed to Checkout

                </button>

            </div>

        </div>

    `;


    cartCount.textContent =
        totalQuantity;
}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    updateCart();
}


/* =========================
   CLEAR CART
========================= */

function clearCart() {

    if (cart.length === 0) {
        return;
    }


    const confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (confirmClear) {

        cart = [];

        updateCart();

    }
}


/* =========================
   GO HOME
========================= */

function goHome() {

    hideExtraPages();

    document
        .getElementById("home")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   GO TO MENU
========================= */

function goToMenu() {

    hideExtraPages();

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   GO TO CART
========================= */

function goToCart() {

    hideExtraPages();

    document
        .getElementById("cartSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   GO TO CHECKOUT
========================= */

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add food first."
        );

        return;
    }


    renderCheckout();


    document
        .getElementById("checkout")
        .style.display = "block";


    document
        .getElementById("confirmation")
        .style.display = "none";


    document
        .getElementById("orderStatus")
        .style.display = "none";


    document
        .getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   RENDER CHECKOUT
========================= */

function renderCheckout() {

    const summary =
        document.getElementById(
            "checkoutSummary"
        );


    let total = 0;


    summary.innerHTML = cart.map(
        item => {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            return `
                <div class="checkout-item">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ₱${itemTotal}
                    </strong>

                </div>
            `;

        }
    ).join("");


    document
        .getElementById("checkoutTotal")
        .textContent =
        "₱" + total;
}


/* =========================
   PLACE ORDER
========================= */

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    const studentName =
        document
            .getElementById("studentName")
            .value
            .trim();


    const studentId =
        document
            .getElementById("studentId")
            .value
            .trim();


    const courseSection =
        document
            .getElementById("courseSection")
            .value
            .trim();


    const contactNumber =
        document
            .getElementById("contactNumber")
            .value
            .trim();


    const pickupTime =
        document
            .getElementById("pickupTime")
            .value;


    if (
        studentName === "" ||
        studentId === "" ||
        pickupTime === ""
    ) {

        alert(
            "Please complete all required fields."
        );

        return;
    }


    /* CALCULATE TOTAL */

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

    });


    /* CREATE ORDER NUMBER */

    const orderNumber =
        "FP-" +
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    /* SAVE ORDER */

    currentOrder = {

        orderNumber: orderNumber,

        studentName: studentName,

        studentId: studentId,

        courseSection: courseSection,

        contactNumber: contactNumber,

        pickupTime: pickupTime,

        items: cart.map(item => ({

            name: item.name,

            price: item.price,

            quantity: item.quantity

        })),

        total: total,

        status: "Order Received"

    };


    /* SHOW CONFIRMATION */

    showConfirmation();


    /* CLEAR CART */

    cart = [];

    updateCart();


    /* RESET FORM */

    document
        .getElementById("checkoutForm")
        .reset();
}


/* =========================
   SHOW CONFIRMATION
========================= */

function showConfirmation() {

    document
        .getElementById("checkout")
        .style.display = "none";


    document
        .getElementById("confirmation")
        .style.display = "block";


    document
        .getElementById("orderStatus")
        .style.display = "none";


    /* ORDER NUMBER */

    document
        .getElementById("orderNumber")
        .textContent =
        currentOrder.orderNumber;


    /* ORDER STATUS INFORMATION */

    document
        .getElementById("statusOrderNumber")
        .textContent =
        currentOrder.orderNumber;


    document
        .getElementById("statusPickupTime")
        .textContent =
        currentOrder.pickupTime;


    /* CONFIRMATION DETAILS */

    const details =
        document.getElementById(
            "confirmationDetails"
        );


    const itemList =
        currentOrder.items.map(
            item => `

                <p>
                    ${item.name}
                    × ${item.quantity}
                    -- ₱${item.price * item.quantity}
                </p>

            `
        ).join("");


    details.innerHTML = `

        <p>
            <strong>Name:</strong>
            ${currentOrder.studentName}
        </p>

        <p>
            <strong>Student ID:</strong>
            ${currentOrder.studentId}
        </p>

        <p>
            <strong>Course & Section:</strong>
            ${
                currentOrder.courseSection ||
                "Not provided"
            }
        </p>

        <p>
            <strong>Pickup Time:</strong>
            ${currentOrder.pickupTime}
        </p>

        <hr style="margin:15px 0;">

        <h3 style="margin-bottom:10px;">
            Order Items
        </h3>

        ${itemList}

        <p style="margin-top:15px;">
            <strong>Total:</strong>
            ₱${currentOrder.total}
        </p>

        <p style="margin-top:10px;">
            <strong>Status:</strong>
            ${currentOrder.status}
        </p>

    `;


    /* UPDATE TIMELINE */

    updateOrderStatus();


    /* SCROLL */

    document
        .getElementById("confirmation")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   UPDATE ORDER STATUS
========================= */

function updateOrderStatus() {

    if (!currentOrder) {
        return;
    }


    const received =
        document.getElementById(
            "statusReceived"
        );


    const preparing =
        document.getElementById(
            "statusPreparing"
        );


    const ready =
        document.getElementById(
            "statusReady"
        );


    const completed =
        document.getElementById(
            "statusCompleted"
        );


    const linePreparing =
        document.getElementById(
            "linePreparing"
        );


    const lineReady =
        document.getElementById(
            "lineReady"
        );


    const lineCompleted =
        document.getElementById(
            "lineCompleted"
        );


    const statusMessage =
        document.getElementById(
            "statusMessage"
        );


    /* RESET ALL */

    received.classList.remove("active");

    preparing.classList.remove("active");

    ready.classList.remove("active");

    completed.classList.remove("active");


    linePreparing.classList.remove("active");

    lineReady.classList.remove("active");

    lineCompleted.classList.remove("active");


    /* ORDER RECEIVED */

    received.classList.add("active");

    statusMessage.textContent =
        "Your order has been received.";


    /* PREPARING */

    if (
        currentOrder.status ===
        "Preparing"
    ) {

        preparing.classList.add("active");

        linePreparing.classList.add("active");

        statusMessage.textContent =
            "The canteen is preparing your food.";
    }


    /* READY FOR PICKUP */

    else if (
        currentOrder.status ===
        "Ready for Pickup"
    ) {

        preparing.classList.add("active");

        ready.classList.add("active");

        linePreparing.classList.add("active");

        lineReady.classList.add("active");

        statusMessage.textContent =
            "Your food is ready for pickup!";
    }


    /* COMPLETED */

    else if (
        currentOrder.status ===
        "Completed"
    ) {

        preparing.classList.add("active");

        ready.classList.add("active");

        completed.classList.add("active");

        linePreparing.classList.add("active");

        lineReady.classList.add("active");

        lineCompleted.classList.add("active");

        statusMessage.textContent =
            "Your order has been completed.";
    }
}


/* =========================
   VIEW ORDER STATUS
========================= */

function showOrderStatus() {

    if (!currentOrder) {

        alert(
            "No active order found. Please place an order first."
        );

        return;
    }


    document
        .getElementById("checkout")
        .style.display = "none";


    document
        .getElementById("confirmation")
        .style.display = "none";


    document
        .getElementById("orderStatus")
        .style.display = "block";


    document
        .getElementById("statusOrderNumber")
        .textContent =
        currentOrder.orderNumber;


    document
        .getElementById("statusPickupTime")
        .textContent =
        currentOrder.pickupTime;


    updateOrderStatus();


    document
        .getElementById("orderStatus")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   HIDE EXTRA PAGES
========================= */

function hideExtraPages() {

    document
        .getElementById("checkout")
        .style.display = "none";


    document
        .getElementById("confirmation")
        .style.display = "none";


    document
        .getElementById("orderStatus")
        .style.display = "none";
}


/* =========================
   CONNECT CHECKOUT FORM
========================= */

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        placeOrder
    );
}


/* =========================
   INITIALIZE
========================= */

updateCart();
