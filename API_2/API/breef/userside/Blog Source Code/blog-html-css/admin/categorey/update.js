function updateCategory(categoryId, categoryName) {
    // API endpoint URL
    const apiUrl = 'http://localhost/API_2/API/server/update_category.php'; // Replace this with your PHP script URL

    // Data object for the PUT request
    const data = {
        category_name: categoryName,
        category_id: categoryId
    };

    // Sending a PUT request to the API
    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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

// Get the form and input field by their IDs
const updateCategoryForm = document.getElementById('updateCategoryForm');
const categoryNameInput = updateCategoryForm.querySelector('input[name="username"]');
const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get('category_id');
const name = searchParams.get('category_name');

// Function to handle form submission
updateCategoryForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the value from the input field
    const updatedCategoryName = categoryNameInput.value;

    // Call the updateCategory function with the provided category name
    updateCategory(id, updatedCategoryName);
});

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


