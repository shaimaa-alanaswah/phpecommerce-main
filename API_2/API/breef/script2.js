// document.addEventListener("DOMContentLoaded", function () {
//   const userId = sessionStorage.getItem("userid");

//   // Fetch user data using the API
//   fetch("http://localhost/API_2/API/server/edit_userprofile.php", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id: userId }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Display user data
//       document.getElementById("profileImage").src = data.image;
//       document.getElementById("username").innerText =
//         "Username: " + data.username;
//       document.getElementById("email").innerText = "Email: " + data.email;
//       document.getElementById("password").innerText = "Password: ***";

//       // Add an event listener for the Edit button
//       document
//         .getElementById("editButton")
//         .addEventListener("click", function () {
//           // Redirect to the user edit page or handle the edit logic here
//           window.location.href = "useredit.html";
//         });
//     })
//     .catch((error) => {
//       console.error("Error fetching user data:", error);
//     });
// });



// document.addEventListener("DOMContentLoaded", function () {
//   // ... (existing code)
// let  updateBtn = document.getElementById('updateBtn');
//   // Add an event listener to the "Save changes" button
//   updateBtn.addEventListener("click", function () {
//     // Get the updated user data from the input fields
//     const updatedData = {
//       image: document.querySelector("#userImage").src,
//       username: document.querySelector("#usernameContainer").value,
//       email: document.querySelector("#emailContainer").value,
//       password: document.querySelector("#currentPasswordInput").value,
//     };

//     // Send the updated data to the server for editing
//     fetch("http://localhost/API_2/API/server/edit_userprofile.php", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Profile updated successfully:", data);
//         // You can handle the success response here (e.g., show a success message)
//       })
//       .catch((error) => {
//         console.error("Error updating user profile:", error);
//         // Handle the error here (e.g., show an error message)
//       });
//   });
// });


// document.addEventListener("DOMContentLoaded", async () => {
//   // Check if user is logged in
//   if (sessionStorage.getItem("userid")) {
//       const userId = sessionStorage.getItem("userid");

//       // Fetch user data using the API
//       try {
//           const response = await fetch("http://localhost/API_2/API/server/userprofile.php", {
//               method: "POST",
//               headers: {
//                   "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ userId: userId }),
//           });

//           const data = await response.json();

//           // Display user data
//           document.getElementById("userImage").src = data.imageURL;
//           document.getElementById("usernameContainer").value = data.username;
//           document.getElementById("emailContainer").value = data.email;
//           document.getElementById("currentPasswordInput").value = data.currentPassword;

//       } catch (error) {
//           console.error("Error fetching user data:", error);
//       }
//   }

//   // Add an event listener to the "Save changes" button
//   const updateBtn = document.getElementById('updateBtn');
//   updateBtn.addEventListener("click", async () => {
//       // Get the updated user data from the input fields
//       const updatedData = {
//           userId: sessionStorage.getItem("userid"),
//           image: document.querySelector("#userImage").src,
//           username: document.querySelector("#usernameContainer").value,
//           email: document.querySelector("#emailContainer").value,
//           password: document.querySelector("#currentPasswordInput").value,
//       };

//       // Log the updated data to the console for debugging
//       console.log("Updated Data:", updatedData);

//       // Send the updated data to the server for editing
//       try {
//           const response = await fetch("http://localhost/API_2/API/server/edit_userprofile.php", {
//               method: "PUT",
//               headers: {
//                   "Content-Type": "application/json",
//               },
//               body: JSON.stringify(updatedData),
//           });

//           const data = await response.json();
//           console.log("Profile updated successfully:", data);

//           // Handle the success response here (e.g., show a success message)
//       } catch (error) {
//           console.error("Error updating user profile:", error);

//           // Handle the error here (e.g., show an error message)
//       }
//   });
// });


document.addEventListener("DOMContentLoaded", async () => {
  try {
      // Check if user is logged in
      if (sessionStorage.getItem("userid")) {
          const userId = sessionStorage.getItem("userid");

          // Fetch user data using the API
          const responseUserData = await fetch("http://localhost/API_2/API/server/userprofile.php", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: userId }),
          });

          if (!responseUserData.ok) {
              throw new Error(`Failed to fetch user data. Status: ${responseUserData.status}`);
          }

          const userData = await responseUserData.json();

          // Display user data
        //   document.getElementById("userImage").src = userData.imageURL;
          document.getElementById("usernameContainer").value = userData.username;
          document.getElementById("emailContainer").value = userData.email;
          document.getElementById("currentPasswordInput").value = userData.currentPassword;
      }

      // Add an event listener to the "Save changes" button
      const updateBtn = document.getElementById('updateBtn');
      updateBtn.addEventListener("click", async () => {
          // Get the updated user data from the input fields
          const updatedData = {
            id: sessionStorage.getItem("userid"),
            // image: document.querySelector("#userImage").src,
            username: document.querySelector("#usernameContainer").value,
              email: document.querySelector("#emailContainer").value,
              password: document.querySelector("#currentPasswordInput").value,
          };

          // Log the updated data to the console for debugging
          console.log("Updated Data:", updatedData);

          // Send the updated data to the server for editing
          const responseUpdate = await fetch("http://localhost/API_2/API/server/edit_userprofile.php", {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
          });

          if (!responseUpdate.ok) {
              throw new Error(`Failed to update user profile. Status: ${responseUpdate.status}`);
          }

          const updateData = await responseUpdate.json();
          console.log("Profile updated successfully:", updateData);

          // Handle the success response here (e.g., show a success message)
      });
  } catch (error) {
      console.error("Error:", error);
      // Handle the error here (e.g., show an error message to the user)
  }
});


