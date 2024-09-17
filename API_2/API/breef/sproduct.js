// document.addEventListener("DOMContentLoaded", async function () {
//     // Fetch product details using the product ID from the hash
//     const productId = window.location.hash.substring(1);

//     try {
//         const response = await fetch('http://localhost/API/server/read_product.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 id: productId
//             }),
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();

//         document.getElementById('Mainimg').src = `images/${data.image}`; // Update the image source
//         document.querySelector('#prodetails h4').innerText = data.name; // Update product name
//         document.querySelector('#prodetails h2').innerText = `$${data.price}`; // Update product price
//         document.querySelector('#prodetails #desc').innerText = data.description; // Update product description
//     } catch (error) {
//         console.error('Error fetching product details:', error);
//     }
// });




// function incrementQuantity() {
//     var quantityElement = document.getElementById('quantity');
//     var currentQuantity = parseInt(quantityElement.innerText, 10);
//     quantityElement.innerText = currentQuantity + 1;
// }

// function decrementQuantity() {
//     var quantityElement = document.getElementById('quantity');
//     var currentQuantity = parseInt(quantityElement.innerText, 10);
//     if (currentQuantity > 1) {
//         quantityElement.innerText = currentQuantity - 1;
//     }
// }

document.addEventListener("DOMContentLoaded", async function () {
    // Fetch product details using the product ID from the hash
    const productId = window.location.hash.substring(1);

    try {
        const response = await fetch('http://localhost/API_2/API/server/read_product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: productId
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        document.getElementById('Mainimg').src = `images/${data.image}`; // Update the image source
        document.querySelector('#prodetails h4').innerText = data.name; // Update product name
        document.querySelector('#prodetails h2').innerText = `$${data.price}`; // Update product price
        document.querySelector('#prodetails #desc').innerText = data.description; // Update product description
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
});

function incrementQuantity() {
    var quantityElement = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityElement.innerText, 10);
    quantityElement.innerText = currentQuantity + 1;
}

function decrementQuantity() {
    var quantityElement = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityElement.innerText, 10);
    if (currentQuantity > 1) {
        quantityElement.innerText = currentQuantity - 1;
    }
}

 async function addToCart () {
    // Get selected size
    const sizeSelect = document.getElementById("sizeSelect");
    const selectedSize = sizeSelect.options[sizeSelect.selectedIndex].value;

    // Check if a size is selected
    if (selectedSize === "Select size") {
        alert("Please select a size.");
        return;
    }

    // Retrieve user_id from the session 
    const user_id =sessionStorage.getItem('userid');


    // Retrieve product_id from the URL hash
    const productId = window.location.hash.substring(1);

    // Get selected quantity
    const selectedQuantity = parseInt(document.getElementById("quantity").innerText, 10);

    try {

        const response = await fetch('http://localhost/API_2/API/server/shop_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
                product_id: productId,
                quantity: selectedQuantity,
                footsize: selectedSize,
                
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Product added to cart:', data);
        alert('added to cart')
        // You can update the UI or show a success message here if needed

    } catch (error) {
        console.error('Error adding product to cart:', error);
        // Handle error as needed
    }
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
        window.location.href = 'profile.html';
    });
}











// comments part 

    document.addEventListener("DOMContentLoaded", function () {
        // Fetch comments from the API
        fetchComments();
    
        function fetchComments() {
            const productId = window.location.hash.substring(1);
        
            fetch('http://localhost/API_2/API/server/comments_read.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: productId,  // Use the variable, not the string 'productId'
                }),
            })
            .then(response => response.json())
            .then(data => {
                displayComments(data);
            })
            .catch(error => console.error('Error fetching comments:', error));
        }   
        
        function displayComments(comments) {
            const commentSection = document.getElementById('commentSection');
    
            // Check if there are no comments
            if (comments.message) {
                commentSection.innerHTML = `<p>${comments.message}</p>`;
                return;
            }
    
            // Loop through comments and create HTML elements
            comments.forEach(comment => {
                const commentHtml = `
                    <div class="d-flex flex-row align-items-center commented-user">
                        <h5 class="mr-2">${comment.username}</h5>
                        <span class="dot mb-1"></span>
                        <span class="mb-1 ml-2">${comment.time}</span>
                    </div>
                    <div class="comment-text-sm">
                        <span>${comment.comment}</span>
                    </div>
                    <div class="reply-section">
                        <!-- Add reply section if needed -->
                    </div>
                    <hr>
                `;
    
                
                commentSection.innerHTML += commentHtml;
            });
        }
    });




    // Assuming this is inside a function or an event handler
let inputcomment = document.getElementById("inputcomment");
let commentButton = document.getElementById("commentButton");

commentButton.addEventListener("click", () => {
    const user_id = sessionStorage.getItem("userid");
    const comment = inputcomment.value;
    const productId = window.location.hash.substring(1);



    // Check if the comment is not empty
    if (comment.trim() === "") {
        alert("Please enter a comment");
        return;
    }



    // Prepare the data for the POST request
    const postData = {
        user_id: user_id,
        product_id: productId,
        comment: comment,
    };


    // Send the POST request using the Fetch API
    fetch('http://localhost/API_2/API/server/comment_insert.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message === 'Product inserted successfully') {
            // Update the UI or show a success message
            console.log("Comment added successfully");
            location.reload()
        } else {
            // Show an error message
            console.error("Failed to add comment");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
