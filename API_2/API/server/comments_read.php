<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
                
include "connect.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        $query = "SELECT c.comment,c.time, u.username
        FROM comment c
        LEFT JOIN users u ON c.user_id = u.id
        WHERE c.product_id = ? 
        ;";

        $stmt = $pdo->prepare($query);
        $stmt->execute([$data['product_id']]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode($result);
        } else {
            echo json_encode(['message' => 'No comments found in the cart for the specified user.']);
        }

    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
}