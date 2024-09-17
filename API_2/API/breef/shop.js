// const fetchProducts = async () => {
//     try {
//         const response = await fetch('http://localhost/API_2/API/server/read_product.php');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };

// const displayProduct = async () => {
//     const input = document.querySelector("#searchInput");
//     const query = input.value.toLowerCase();
//     const data = await fetchProducts();

//     const filteredData = data.filter((product) => {
//         const nameMatches = query === "" || product.name.toLowerCase().includes(query);
//         const categoryMatches = query === "" || product.category_id.toString() === query;

//         return nameMatches || categoryMatches;
//     });

//     let productContainer = document.getElementById('pro-container');
//     productContainer.innerHTML = '';

//     filteredData.forEach(product => {
//         let productCard = document.createElement('div');
//         productCard.className = "pro";
//         productCard.innerHTML = `
//             <img src="images/${product.image}" alt="">
//             <div class="des">
//                 <span>${product.name}</span>
//                 <h5> ${product.description} </h5>
//                 <div class="star">
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                 </div>
//                 <h4>$${product.price}</h4>
//                 <a href="sproduct.html#${product.product_id}"><i class="fa-solid fa-shopping-cart"></i></a>
//             </div>`;

//         productContainer.appendChild(productCard);
//     });
// };

// document.querySelector("#searchInput").addEventListener("input", displayProduct);

// // Initial fetch and display
// fetchProducts().then(displayProduct);

const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost/API_2/API/server/read_product.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayProduct = async () => {
    const input = document.querySelector("#searchInput");
    const query = input.value.toLowerCase();
    const priceRange = parseFloat(document.querySelector("#price-range").value);

    const data = await fetchProducts();

    const filteredData = data.filter((product) => {
        const nameMatches = product.name.toLowerCase().includes(query);
        const categoryMatches = product.category_id.toString() === query;

        // Parse product price as a float
        const productPrice = parseFloat(product.price);

        // Check if the product price is within the selected price range
        const priceMatches = isNaN(priceRange) || (productPrice <= priceRange);

        return (nameMatches || categoryMatches) && priceMatches;
    });

    let productContainer = document.getElementById('pro-container');
    productContainer.innerHTML = '';

    filteredData.forEach(product => {
        let productCard = document.createElement('div');
        productCard.className = "pro";
        productCard.innerHTML = `
            <img src="images/${product.image}" alt="">
            <div class="des">
                <span>${product.name}</span>
                <h5> ${product.description} </h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>$${product.price}</h4>
                <a href="sproduct.html#${product.product_id}"> <button class="viewBtn">View</button> </a>
            </div>`;

        productContainer.appendChild(productCard);
    });
};

document.querySelector("#searchInput").addEventListener("input", displayProduct);
document.querySelector("#price-range").addEventListener("input", displayProduct);

// Initial fetch and display
fetchProducts().then(displayProduct);


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


    
    let signupButtonNav = document.getElementById('signupButtonNav');

    let loginButtonNav = document.getElementById('loginButtonNav');

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
            window.location.href = 'UserProfile.html';
        });
    } else {
        carticon.style.display="none";

        // Logic for non-logged-in users
    }
  


    // 



    