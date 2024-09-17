document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in 
  if (sessionStorage.getItem("userid")) {
    const userId = sessionStorage.getItem("userid");

    fetch("http://localhost/API_2/API/server/userprofile.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display user data
        // document.getElementById("profileImage").src = data.image;
        document.getElementById("username").innerText =
          "Username: " + data.username;
          
        document.getElementById("email").innerText =
          "Email: " + data.email;

        document.getElementById("password").innerText =
        "Password: " + data.password;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
});
