function deleteUser(userId) {
  console.log('568869::', userId);
  fetch('http://localhost/API_2/API/server/userdelete.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('User deleted:', data);
      // Remove the deleted row from the table
      location.reload()
  })
  .catch(error => {
      console.error('Error:', error);
  })
}