function deletecategory(category_id) {
  fetch("http://localhost/API_2/API/server/delete_category.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category_id: category_id }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("123");
      console.log("User deleted:", data);
      // Remove the deleted row from the table
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}