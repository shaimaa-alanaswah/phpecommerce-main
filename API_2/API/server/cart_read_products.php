<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

// ----------------------------------------------------------------------------------
// ----------------------------GET METHOD TO SELECT ALL THE CART PRODUCTS------------
// ------------------------------------FOR EVERY USER--------------------------------
// ----------------------------------------------------------------------------------

if ($_SERVER["REQUEST_METHOD"] == "GET" || $_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        $query = "SELECT products.product_id , products.image, products.name, cart.footsize, products.price, cart.quantity
                  FROM cart
                  JOIN products ON cart.product_id = products.product_id
                  WHERE cart.user_id = ?
                  LIMIT 0, 25";

        $stmt = $pdo->prepare($query);
        $stmt->execute([$data['id']]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode($result);
        } else {
            echo json_encode(['message' => 'No products found in the cart for the specified user.']);
        }

    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
}
