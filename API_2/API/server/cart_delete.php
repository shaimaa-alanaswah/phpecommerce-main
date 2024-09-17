<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';
// ----------------------------------------------------------------------------------
// ----------------------------DELETE METHOD TO REMOVE A PRODUCT FROM CART------------
// ------------------------------------FOR A SPECIFIC USER AND PRODUCT-----------------
// ----------------------------------------------------------------------------------

if ($_SERVER["REQUEST_METHOD"] == "DELETE" || $_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        
        $user_id = $data['user_id'];
        $product_id = $data['product_id'];

        $query = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$user_id, $product_id]);

        // Check if any rows were affected to determine if the deletion was successful
        $rowCount = $stmt->rowCount();

        if ($rowCount > 0) {
            echo json_encode(['message' => 'Product removed from the cart successfully.']);
        } else {
            echo json_encode(['message' => 'Product not found in the cart for the specified user.']);
        }

    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
}
