// function fetchProducts() {
//     fetch('http://localhost/API_2/API/server/men_or_wemon_products.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({ gender: 'Male' }) 
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         const productContainer = document.getElementById('pro-container');

//         data.forEach(product => {
//             const card = document.createElement('div');
//             card.className = 'pro';
//             card.innerHTML =`
//             <img src="images/${product.image}" alt="">
//             <div class="des">
//                 <span>${product.name}</span>
//                 <h5>${product.description}</h5>
//                 <div class="star">
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                 </div>
//                 <h4>$${product.price}</h4>
//                 <a id="tocartHome" href="sproduct.html#${product.product_id}"> <button class="viewBtn" > View</button></a>
//                 </div>`;
//             productContainer.appendChild(card);
//         });

//     })
//     .catch(error => console.error('Error fetching data:', error));
// }

// fetchProducts();
const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost/API_2/API/server/men_or_wemon_products.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ gender: 'Male' }) // Keep gender as 'Male'
        });

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

