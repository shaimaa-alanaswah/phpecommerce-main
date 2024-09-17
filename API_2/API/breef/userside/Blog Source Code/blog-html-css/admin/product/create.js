
// {
//     "image": "product3.jpg",
//     "name": "Product hiiii",
//     "description": "hellooo inserrttt testt 1",
//     "price": 19.99,
//     "price_after_discount": 16.49,
//     "category_id": 2,
//     "gender": "Men"
// }

function addProduct() {
  let name = document.getElementById("name").value;
  let desc = document.getElementById("desc").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("img").value;
  let price_after = document.getElementById("price_after").value;
  let categorey = document.getElementById("categorey").value;
  let gender = document.getElementById("gender").value;

  var product = { name: name, description: desc, price: price ,
   price_after_discount:price_after ,category_id: categorey,  image: image ,gender:gender
   };
  console.log(product)

  fetch("http://localhost/API_2/API/server/create_product.php", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" }
  })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Network response was not ok');
          }
      })
      .then(data => {
          fetchProducts();

      })
      .catch(error => {
          console.error('Fetch error:', error);
      }); window.location.href = 'index.html';

}

// Fetch and display existing products
fetchProducts();

// Add event listener for adding a new product
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