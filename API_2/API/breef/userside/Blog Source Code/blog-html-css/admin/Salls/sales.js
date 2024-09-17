fetch('http://localhost/API_2/API/server/sales.php')
            .then(response => response.json())
            .then(data => {
                // Extract order dates and total prices from the fetched data
                const orderDates = data.map(item => item.order_date);
                const totalPrices = data.map(item => item.total_price);

                // Update Chart.js code with the retrieved data
                const ctx = document.getElementById('myChart');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: orderDates, // Use order dates as labels
                        datasets: [{
                            label: 'Total Price',
                            data: totalPrices,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));


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