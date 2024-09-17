<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include "connect.php";
if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    try {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data,true);

    $query="SELECT MAX(`order_date`) AS order_date  ,total_price FROM `orders` WHERE user_id =? ;";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$data['user_id']]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if($result){
    echo json_encode($result);
    }

} catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    } 
}
else{
    echo json_encode(['message' => 'incorrect request method']);
}

