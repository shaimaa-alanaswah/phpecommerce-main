<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'include.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jsonData = file_get_contents("php://input");
    $requestData = json_decode($jsonData, true);

    $gender = isset($requestData['gender']) ? $conn->real_escape_string($requestData['gender']) : '';

    $sql = "SELECT * FROM products WHERE gender = '$gender'";

    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            $products = array();
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }

            $jsonResponse = json_encode($products);

            header('Content-Type: application/json');
            echo $jsonResponse;
        } else {
            echo json_encode(array('message' => 'No products found for the specified gender.'));
        }
    } else {
        echo json_encode(array('message' => 'Error executing the query.'));
    }
} else {
    echo json_encode(['message' => 'Incorrect request method']);
}

$conn->close();
?>
