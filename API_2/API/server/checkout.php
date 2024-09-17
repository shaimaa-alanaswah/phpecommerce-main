<?php

include 'include.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);
        if ($data === null) {
            echo "Invalid JSON data.";
        }
        $u_id =$data['id'];





        $sql = "SELECT SUM(IF(products.price_after_discount>0, products.price_after_discount, products.price)* cart.quantity)as total FROM products 
                JOIN cart ON cart.product_id = products.product_id
                WHERE cart.user_id = $u_id
                ";       
        $result = $conn->query($sql);
        $total = 0;
        $cart = array();





        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $total = $row["total"];
            }

            $sql = "SELECT * FROM products 
            JOIN cart ON products.product_id = cart.product_id
            WHERE cart.user_id = $u_id";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $cart[] = $row;
                }
            }
            $sql = "DELETE FROM cart WHERE user_id = $u_id ";
            $result = $conn->query($sql);

        }else{
            die("Script terminated due to EMPTY CART.");
        }



        $orders = array();

            try {

                $sql = "INSERT INTO `orders`(`user_id`, `total_price`) VALUES (?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ii", $u_id, $total);
                
                // Execute the statement
                if ($stmt->execute()) {
                    // Success
                } else {
                    // Error handling
                    echo "Error: " . $stmt->error;
                }
                
                // Close the statement
                $stmt->close();
        } catch (Exception $e) {
            // Handle the exception here, for example, log the error, display an error message, or take appropriate action.
            echo "Error: " . $e->getMessage();
        }

















        }else {
        // // This is not a POST request
        echo "This endpoint only accepts POST requests.";
        }
?>