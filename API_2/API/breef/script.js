// function fetchProducts() {
//     fetch('http://localhost/API_2/API/server/read_product.php') // Replace with your actual API endpoint
//         .then(response => response.json())
//         .then(data => {
//             const productContainer = document.getElementById('pro-container');

//             data.forEach(product => {

//                 const card = document.createElement('div');
//                 card.className = 'pro';
//                 card.innerHTML =`
//                 <img src="images/${product.image}" alt="">
//                 <div class="des">
//                     <span>${product.name}</span>
//                     <h5> ${product.description} </h5>
//                     <div class="star">
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                     </div>
//                     <h4><del>${product.price}</del></h4>
//                     <h4>${product.price_after_discount}</h4>
//                     <a id="tocartHome" href="sproduct.html#${product.product_id}"><i class="fa-solid fa-shopping-cart"></i></a>

//                 </div>
      
//                 `;productContainer.appendChild(card);
//             });
            
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// fetchProducts();


    // {
    //     "product_id": 3,
    //     "image": "image3.jpg",
    //     "name": "Updated Product Name",
    //     "description": "laith Product Name",
    //     "price": "60.00",
    //     "price_after_discount": "55.00",
    //     "category_id": 3,
    //     "gender": "Male",
    //     "created_at": "2023-11-08 18:37:52"
    // },

    function fetchProducts() {
        fetch('http://localhost/API_2/API/server/read_product.php') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                const productContainer = document.getElementById('pro-container');
    
                // Display only the first four products
                for (let i = 0; i < Math.min(4, data.length); i++) {
                    const product = data[i];
                    const card = document.createElement('div');
                    card.className = 'pro';
                    card.innerHTML =`
                        <img src="images/${product.image}" alt="">
                        <div class="des">
                            <span>${product.name}</span>
                            <h5>${product.description}</h5>
                            <div class="star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <h4><del>$${product.price}</del></h4>
                            <h4>$${product.price_after_discount}</h4>
                            <a id="tocartHome" href="sproduct.html#${product.product_id}"><button class="viewBtn">View</button></a>
                        </div>
                    `;
                    productContainer.appendChild(card);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    
    fetchProducts();

    function fetchProducts1() {
        fetch('http://localhost/API_2/API/server/read_product.php') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                const productContainer = document.getElementById('pro-container1');
    
                // Display only the first four products
                for (let i = 0; i < Math.min(8, data.length); i++) {
                    const product = data[i];
                    const card = document.createElement('div');
                    card.className = 'pro';
                    card.innerHTML =`
                        <img src="images/${product.image}" alt="">
                        <div class="des">
                            <span>${product.name}</span>
                            <h5>${product.description}</h5>
                            <div class="star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <h4>$${product.price}</h4>
                            <a id="tocartHome" href="sproduct.html#${product.product_id}"><button class="viewBtn" > View</button></a>
                        </div>
                    `;
                    productContainer.appendChild(card);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    
    fetchProducts1();
    
    let signupButtonNav = document.getElementById('signupButtonNav');

    let loginButtonNav = document.getElementById('loginButtonNav');

    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedin');
    let carticon = document.getElementById("carticon");
    
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
            window.location.href = 'UserProfile.html';
        });
    } else { 
        carticon.style.display="none";
        signupButtonNav.addEventListener('click', (e) => {
    
    window.location.href ="signup.html"
    });
      
    loginButtonNav.addEventListener('click', (e) => {
        window.location.href ="login.html"
        });  // Logic for non-logged-in users
    }
   
    
    