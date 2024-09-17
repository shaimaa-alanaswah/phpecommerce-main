<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

// ----------------------------------------------------------------------------------
// ----------------------------POST METHOD TO ADD A PRODUCT TO CART-------------------
// ------------------------------------FOR A SPECIFIC USER AND PRODUCT-----------------
// ----------------------------------------------------------------------------------
// localhost\API\server\cart_add.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        // Assuming the data structure includes both user_id and product_id
       
        $user_id = $data['user_id'];
        $product_id = $data['product_id'];
        $AddorSub = $data['AddorSub'];
        // Assuming quantity is provided in the request

        // Check if the product already exists in the cart for the specified user
        $existingProductQuery = "SELECT * FROM cart WHERE user_id = ? AND product_id = ? ";
        $stmtExistingProduct = $pdo->prepare($existingProductQuery);
        $stmtExistingProduct->execute([$user_id, $product_id]);
        $existingProduct = $stmtExistingProduct->fetch(PDO::FETCH_ASSOC);
        
        if ($AddorSub == "add") {
            if ($existingProduct) {
                // If the product already exists, update the quantity
                $updateQuery = "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?";
                $stmtUpdate = $pdo->prepare($updateQuery);
                $stmtUpdate->execute([$user_id, $product_id]);
                echo json_encode(['message' => 'Product quantity updated in the cart.']);
            } else {
                // If the product doesn't exist, insert a new record
                
                $insertQuery = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)";
                $stmtInsert = $pdo->prepare($insertQuery);
                $stmtInsert->execute([$user_id, $product_id]);
                echo json_encode(['message' => 'Product added to the cart successfully.']);
            }
        } else {
            // Subtraction logic
            $quantity = $existingProduct['quantity'];
            if ($existingProduct && $quantity > 1) {
                
                // If the product exists and quantity is greater than 1, update the quantity
                $updateQuery = "UPDATE cart SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?";
                $stmtUpdate = $pdo->prepare($updateQuery);
                $stmtUpdate->execute([$user_id, $product_id]);
                echo json_encode(['message' => 'Product quantity updated in the cart.']);
            } elseif ($existingProduct && $quantity == 1) {
                // If the product exists and quantity is 1, you may choose to remove the product or handle it as needed
                $deleteQuery = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
                $stmtDelete = $pdo->prepare($deleteQuery);
                $stmtDelete->execute([$user_id, $product_id]);
                echo json_encode(['message' => 'Product quantity is already 1. the product has been removed .']);
            } else {
                // If the product doesn't exist, you may handle it as needed
                echo json_encode(['message' => 'Product does not exist in the cart.']);
            }
        }
        

    } 
    catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
}

// Error: SQLSTATE[
//     23000
// ]: Integrity constraint violation: 1452 Cannot add or update a child row: a foreign key constraint fails (`ecommerce`.`cart`, CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE)


// {
//     "user_id": 1,
//     "product_id": 1,
//     "AddorSub": "Add"
//   }

// 1 904 330 601


