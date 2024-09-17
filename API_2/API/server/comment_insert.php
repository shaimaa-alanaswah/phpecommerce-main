<?php

// INSERT INTO `comment`(`user_id`, `product_id`, `comment`, `time`) VALUES (?, ?, ?, NOW());

header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

// {
//     "user_id": "user_id",
//     "product_id": "product_id",
//     "comment": "hellooo inserrttt testt 1"
// }

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
 
    if (!empty($data)) {
        $query = 'INSERT INTO `comment`(`user_id`, `product_id`, `comment`, `time`) VALUES (?, ?, ?, NOW());';

        $stmt = $pdo->prepare($query);

        $stmt->execute([$data['user_id'], $data['product_id'], $data['comment']]);

        if ($stmt) {
            echo json_encode(['message' => 'Product inserted successfully']);
        } else {
            echo json_encode(['message' => 'Failed to insert the product']);
        }
    } else {
        echo json_encode(['message' => 'No data provided for insertion']);
    }
} else {
    echo json_encode(['message' => 'Incorrect request method']);
}

