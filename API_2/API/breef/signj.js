document.getElementById('login-button').addEventListener('click', function(event) {
    event.preventDefault();
    createUser();
});

function createUser() {
    var username = document.getElementById('name').value;
    var email = document.getElementById('E-mail').value;
    var password = document.getElementById('password').value;
    var cpass = document.getElementById('C-password').value;
    
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var namePattern = /^[A-Za-z\s]*$/;

    var emailError = "";
    var nameError = "";
    var passwordError = "";
    var cpassError = "";

    if (username.trim() === "") {
        nameError = "Name is required";
    } else if (!namePattern.test(username)) {
        nameError = "Name should contain only letters and spaces";
    }

    if (email.trim() === "") {
        emailError = "Email is required";
    } else if (!emailPattern.test(email)) {
        emailError = "Please enter a valid email address";
    }

    if (password.trim() === "") {
        passwordError = "Password is required";
    } else if (password.length < 6 || password.length > 18) {
        passwordError = "Password should be between 6-18 characters";
    }

    if (cpass.trim() === "") {
        cpassError = "Confirm Password is required";
    } else if (password !== cpass) {
        cpassError = "Passwords do not match";
    }

    document.getElementById('namecheck').innerHTML = nameError;
    document.getElementById('email-check').innerHTML = emailError;
    document.getElementById('pass-check').innerHTML = passwordError;
    document.getElementById('con-check').innerHTML = cpassError;

    if (emailError !== "" || nameError !== "" || passwordError !== "" || cpassError !== "") {
        return;
    }

// localhost\API\server\signup_oop.php

    var user = {
        username: username,
        email: email,
        password: password
    };
      console.log(JSON.stringify(user));
    // Make a POST request using Fetch API
    fetch('http://localhost/API_2/API/server/signup_oop.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        // Handle the response from the server, if needed
        if (response.ok) {
            window.location.href = "login.html"; // Redirect upon successful submission
        } else {
            // Handle error scenarios
            throw new Error('Network response was not ok.');
        }
    })
    .catch(error => {
        // Handle and display errors
        console.error('There was a problem with the fetch operation:', error);
        // You can display an error message on the page if needed
    });
}



