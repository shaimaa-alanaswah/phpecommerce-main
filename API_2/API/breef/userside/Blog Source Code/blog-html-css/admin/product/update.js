//   {
//     "product_id": 3,  
//     "name": "Updated Product Name",
//     "price": 60.00,
//     "price_after_discount": 55.00
//   }
// Function to handle form submission
document.getElementById('updateProductForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission
  window.location.href = 'index.html';

  // Get the values from the input fields
  let updatedName = document.getElementById("name").value;
  let updatedDesc = document.getElementById("desc").value;
  let updatedPrice = document.getElementById("price").value;
  let updatedPriceAfter = document.getElementById("price_after").value;
  let updatedGender = document.getElementById("gender").value;
  let updatedImage = document.getElementById("img").value; // Note: This will only get the filename, not the actual file content

  // Assuming you want to pass the product_id from the URL as in your previous code
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get('product_id');

  // Call the updateProduct function with the provided values
  updateProduct({
      product_id: id,
      name: updatedName,
      description: updatedDesc,
      price: updatedPrice,
      price_after_discount: updatedPriceAfter,
      gender: updatedGender,
      image: updatedImage // Note: This will only pass the filename, not the actual file content
  });
});

function updateProduct(product) {
  // API endpoint URL
  const apiUrl = 'http://localhost/API_2/API/server/update_product.php';

  // Sending a PUT request to the API
  fetch(apiUrl, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
  })
      .then(response => response.json())
      .then(result => {
          // Handle the API response here
          console.log(result); // Log the response for now, but you can customize
          window.location.href = 'index.html';
      })
      .catch(error => {
          // Handle errors
          console.error('Error:', error);
      }); 
}



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