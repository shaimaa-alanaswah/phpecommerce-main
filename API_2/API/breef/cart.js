// function fetchProducts() {
//     const userId = sessionStorage.getItem('userid');

//     if (!userId) {
//         console.error('User ID not found in sessionStorage');
//         return;
//     }

//     const apiUrl = 'http://localhost/API_2/API/server/cart_read_products.php';

//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json', // Add this line if you expect JSON response
//         },
//         body: JSON.stringify({ id: userId })
//     })
//     .then(response => response.json())
//     .then(data => {
//         const productContainer = document.getElementById('products-cards');
        

//         data.forEach(product => {
//             const card = document.createElement('tr');
//             card.className = 'pro';
//             card.innerHTML =
//             `
//             <td> <button class="deleteFromCart" data-product-id="${product.product_id}"><i class="fa-solid fa-trash"></i></button> </td>
//             <td> <img src="./images/${product.image}" alt=""> </td>
//             <td> ${product.name} </td>
//             <td> ${product.footsize}  </td>
//             <td> ${product.price}</td>
//             <td class="quantity-container">
//                 <button data-product-id="${product.product_id}" class="quantity-button decrement-button">-</button>
//                 <span id="quantity">${product.quantity}</span>
//                 <button data-product-id="${product.product_id}" class="quantity-button increment-button">+</button>
//             </td>
//             `;
//             productContainer.appendChild(card);
//         });

//         const deleteButtons = document.querySelectorAll('.deleteFromCart');
//         deleteButtons.forEach(button => {
//             button.addEventListener('click', () => {
//                 const productId = button.dataset.productId;
//                 deleteProduct(userId, productId);
                
//             });
            
//         });

//         // Add event listeners to increment and decrement buttons
//         const incrementButtons = document.querySelectorAll('.increment-button');
//         incrementButtons.forEach(button => {
//             button.addEventListener('click', () => {
//                 const productId = button.dataset.productId;
//                 incrementQuantity(productId);
//             });
//         });

//         const decrementButtons = document.querySelectorAll('.decrement-button');
//         decrementButtons.forEach(button => {
//             button.addEventListener('click', () => {
//                 const productId = button.dataset.productId;
//                 decrementQuantity(productId);
//             });
//         });
//     })
//     .catch(error => console.error('Error fetching data:', error));
// }

// fetchProducts();

function fetchProducts() {
    const userId = sessionStorage.getItem('userid');

    if (!userId) {
        console.error('User ID not found in sessionStorage');
        return;
    }

    const apiUrl = 'http://localhost/API_2/API/server/cart_read_products.php';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', // Add this line if you expect JSON response
        },
        body: JSON.stringify({ id: userId })
    })
    .then(response => response.json())
    .then(data => {
        const productContainer = document.getElementById('products-cards');

        // Initialize total to 0
        let total = 0;

        data.forEach(product => {
            const card = document.createElement('tr');
            card.className = 'pro';
            card.innerHTML =
            `
            <td> <button class="deleteFromCart" data-product-id="${product.product_id}"><i class="fa-solid fa-trash"></i></button> </td>
            <td> <img src="./images/${product.image}" alt=""> </td>
            <td> ${product.name} </td>
            <td> ${product.footsize}  </td>
            <td> ${product.price}</td>
            <td class="quantity-container">
                <button data-product-id="${product.product_id}" class="quantity-button decrement-button">-</button>
                <span id="quantity">${product.quantity}</span>
                <button data-product-id="${product.product_id}" class="quantity-button increment-button">+</button>
            </td>
            `;

            // Update total for each product
            total += parseFloat(product.price) * parseInt(product.quantity, 10);

            productContainer.appendChild(card);
        });

        // Update the total in your HTML
        const totalCartElement = document.getElementById('totalCart');
        const totalCartElement1 = document.getElementById('totalCart1');
        totalCartElement.textContent = `${total.toFixed(2)} JD`;
        totalCartElement1.textContent = `${total.toFixed(2)} JD`;

        const checkoutButton = document.getElementById('checkoutButton');

checkoutButton.addEventListener('click', () => {
    checkout(userId);
    loCreload();
});


        const deleteButtons = document.querySelectorAll('.deleteFromCart');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                deleteProduct(userId, productId);
            });
        });

        // Add event listeners to increment and decrement buttons
        const incrementButtons = document.querySelectorAll('.increment-button');
        incrementButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                incrementQuantity(productId);
            });
        });

        const decrementButtons = document.querySelectorAll('.decrement-button');
        decrementButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                decrementQuantity(productId);
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

fetchProducts();










///////////////////////////////////////////////////////








//////////////////////////////////////////////////////










function incrementQuantity(productId) {
    const userId = sessionStorage.getItem('userid');
    if (!userId) {
        console.error('User ID not found in sessionStorage');
        return;
    }

    const apiUrl = 'http://localhost/API_2/API/server/cart_add.php';
    const requestData = {
        user_id: userId,
        product_id: productId,
        AddorSub: 'add'
    };

    fetch(apiUrl, {
        method: 'POST', // Assuming you are using POST method for increment
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // After incrementing, you may want to refresh the product list or update the quantity display
        location.reload()
    })
    .catch(error => console.error('Error incrementing quantity:', error));
}

function decrementQuantity(productId) {
    const userId = sessionStorage.getItem('userid');
    if (!userId) {
        console.error('User ID not found in sessionStorage');
        return;
    }

    const apiUrl = 'http://localhost/API_2/API/server/cart_add.php';
    const requestData = {
        user_id: userId,
        product_id: productId,
        AddorSub: 'Sub'
    };

    fetch(apiUrl, {
        method: 'POST', // Assuming you are using POST method for decrement
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // After decrementing, you may want to refresh the product list or update the quantity display
        location.reload()
    })
    .catch(error => console.error('Error decrementing quantity:', error));
}


function deleteProduct(userId, productId) {
    const apiUrl = 'http://localhost/API_2/API/server/cart_delete.php';

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, product_id: productId })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // You may want to refresh the product list after deletion
        location.reload();
    })
    .catch(error => console.error('Error deleting product:', error));
}
 




let signupButtonNav = document.getElementById('signupButtonNav');
signupButtonNav.addEventListener('click', function () {
    window.location.href = 'signup.html';
});

let loginButtonNav = document.getElementById('loginButtonNav');
loginButtonNav.addEventListener('click', function () {
    window.location.href = 'login.html';
});




// Check if the user is logged in
const isLoggedIn = sessionStorage.getItem('isLoggedin');

if (isLoggedIn === 'true') {
    // Change text and behavior for logged-in users
    loginButtonNav.textContent = 'Profile';
    signupButtonNav.textContent = 'Log out';

    signupButtonNav.addEventListener('click', (e) => {
        // Log out logic
        window.location.href = 'index.html';
        sessionStorage.setItem("isLoggedin","false");
    });
    
    loginButtonNav.addEventListener('click', (e) => {
        // Log out logic
        window.location.href = '/API/breef/UserProfile.html';
    });
} else {
    // Logic for non-logged-in users
}




function checkout(userId) {
    const apiUrl = 'http://localhost/API_2/API/server/checkout.php';

    const requestData = {
        id: userId,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Order placed successfully.');
            // Optionally, you may want to redirect the user to a confirmation page or display a success message.
        } else if (data.error) {
            console.error('Error during checkout:', data.error);
            // Optionally, you may want to display an error message to the user.
        }
        // You may want to refresh the product list after 
        location.reload();
    })
    .catch(error => console.error('Error during checkout:', error));
}




function loCreload(){
    location.reload();
}