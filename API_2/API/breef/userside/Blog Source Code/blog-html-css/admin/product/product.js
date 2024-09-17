function fetchProducts() {
  fetch('http://localhost/API_2/API/server/read_product.php', {
      method: 'GET'
  })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          const productContainer = document.querySelector('tbody');
          data.forEach(product => {
              const card = document.createElement('tr');
              card.className = 'pro';
              card.innerHTML = `
                  <td>${product.product_id}</td>
                  <td>${product.name}</td>
                  <td>${product.description}</td>
                  <td>${product.price}</td>
                  <td>${product.price_after_discount}</td>
                  <td>${product.category_id}</td>
                  <td>${product.gender}</td>
                  <td><img src="/images/${product.image}" class="imageshoes"></td>
                  <td class="edit"><a href="edit2.html?product_id=${product.product_id}"><i class="fa-solid fa-pen"></i></a></td>
                  <td  class="delete"><i class="fa-solid fa-trash" onclick="Delete(${product.product_id})"></i></td>
              `;
              productContainer.appendChild(card);
          });
      })
      .catch(error => console.error('Error fetching data:', error));
}

function Delete(product_id) {
  const product = { "id": product_id };
  console.log(product)

  // Make a DELETE request to the server to delete the product
  fetch(`http://localhost/API_2/API/server/delete_product.php`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
  })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Product deleted successfully:', data);
          // You may want to update the UI or fetch the products again to refresh the table
          fetchProducts();
      })
      .catch(error => console.error('Error deleting product:', error));
      location.reload();

}

fetchProducts();

const isLoggedIn = sessionStorage.getItem('isLoggedin');
let signupButtonNav = document.getElementById('signupButtonNav');
if (isLoggedIn === 'true') {
  // Change text and behavior for logged-in users
  signupButtonNav.textContent = 'Log out';

  signupButtonNav.addEventListener('click', (e) => {
      // Log out logic
      window.location.href = '/API/breef/index.html';
      sessionStorage.setItem("isLoggedin","false");
  });
} else {
  // Logic for non-logged-in users
}


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

                    
                          //     <td>1</td>
                          //     <td>This is the first Product</td>
                          //     <td>Awa</td>
                          //     <td>Awa</td>
                          //    <td> <img  src="/images/menshoes1.jpg" class="imageshoes"></td> 

                          //     <td class="edit"><a href="edit2.html"><i class="fa-solid fa-pen"></a></td>
                          //     <td class="delete"><i class="fa-solid fa-trash"></i></i></td>
                       
                          
                  
