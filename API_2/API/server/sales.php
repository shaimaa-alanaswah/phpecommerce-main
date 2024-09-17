<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce2";

$conn = new mysqli($servername, $username, $password, $dbname);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT `order_date`, `total_price` FROM `orders`;";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = array(
            "order_date" => $row["order_date"],
            "total_price" => $row["total_price"]
        );
    }
}

$json_data = json_encode($data);

header('Content-Type: application/json');
echo $json_data;

$conn->close();
?>
