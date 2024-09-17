<?php

//--------------------------------------------------------------------------------------
//-------------------API TO FETCH THE PRODUCTS DEPPENDING-------------------------------
//-----------------------------------ON-------------------------------------------------
//---------------THE ID OF THE PRODUCT AND THE FOOT SIZE FOR IT-------------------------
// --------------------------- {             -------------------------------------------
// ---------------------------    "id": 2    -------------------------------------------
// --------------------------- }             -------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

header("Access-Control-Allow-Origin: ");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'server/connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        $query = "SELECT * FROM products INNER JOIN footsize ON products.product_id = footsize.product_id WHERE products.product_id = ? AND footsize.footsize = ?";

        $stmt = $pdo->prepare($query);
        $stmt->execute([$data['id'], $data['footsize']]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode($result);
        } else {
            echo json_encode(['message' => 'No matching product found.']);
        }
    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
} else {
    echo json_encode(['message' => 'Incorrect request method']);
}
?>
