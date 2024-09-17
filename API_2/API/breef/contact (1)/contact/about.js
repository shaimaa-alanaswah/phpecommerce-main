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
        window.location.href = '/API/breef/index.html';
        sessionStorage.setItem("isLoggedin","false");
    });
    
    loginButtonNav.addEventListener('click', (e) => {
        // Log out logic
        window.location.href = '/API/breef/UserProfile.html';
    });
} else { 
    carticon.style.display="none";
    signupButtonNav.addEventListener('click', (e) => {
window.location.href ="/API/breef/signup.html"
});
  
loginButtonNav.addEventListener('click', (e) => {
    window.location.href ="/API/breef/login.html"
    });  // Logic for non-logged-in users
}


