<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        // Assuming the data structure includes user_id, product_id, quantity, and footsize
        $user_id = $data['user_id'];
        $product_id = $data['product_id'];
        
        $quantity = $data['quantity'];
        $footsize = $data['footsize']; // Added this line

        // Check if the product already exists in the cart for the specified user
        $existingProductQuery = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
        $stmtExistingProduct = $pdo->prepare($existingProductQuery);
        $stmtExistingProduct->execute([$user_id, $product_id]);
        $existingProduct = $stmtExistingProduct->fetch(PDO::FETCH_ASSOC);
        
        
            if ($existingProduct) {
                // If the product already exists, update the quantity
                $updateQuery = "UPDATE cart SET quantity = quantity + ? ,footsize = ? WHERE user_id = ? AND product_id = ?";
                $stmtUpdate = $pdo->prepare($updateQuery);
                $stmtUpdate->execute([$quantity,$footsize, $user_id, $product_id ]);
                echo json_encode(['message' => 'Product quantity updated in the cart.']);
            } else {
                // If the product doesn't exist, insert a new record
                $insertQuery = "INSERT INTO cart (user_id, product_id, quantity ,footsize) VALUES (?, ?, ?,?)";
                $stmtInsert = $pdo->prepare($insertQuery);
                $stmtInsert->execute([$user_id, $product_id, $quantity, $footsize]);
                echo json_encode(['message' => 'Product added to the cart successfully.']);
            }

            // Now, insert footsize information into the footsize table
            // $insertFootsizeQuery = "INSERT INTO footsize (product_id, footsize) VALUES (?, ?)";
            // $stmtInsertFootsize = $pdo->prepare($insertFootsizeQuery);
            // $stmtInsertFootsize->execute([$product_id, $footsize]);
       

    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
}
?>
