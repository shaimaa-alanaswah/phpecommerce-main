<?php
////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/////////////////use the next json to insert the user /////////////////////////////////
//////////////////but change the values////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
    // {
    //     "image": "path/to/userimage1.jpg",
    //     "username": "johndoe",
    //     "password": "password123",
    //     "role_id": 2,
    //     "email": "johndoe@example.com",
    //     "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    // }
//////////////////////////////////////////////////////////////////////
include 'include.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data)) {
   
    $requiredFields = ['username', 'password', 'email'];
    $allFieldsPresent = true;

    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $allFieldsPresent = false;
            break;
        }
    }

    if ($allFieldsPresent) {
        
        $sql = "INSERT INTO users (username, password, role_id, email, created_at) VALUES (
            
            '{$data['username']}',
            '{$data['password']}',
             2,
            '{$data['email']}',
             NOW()
        )";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("message" => "User record created successfully."));
        } else {
            echo json_encode(array("error" => "Error: " . $conn->error));
        }
    } else {
        echo json_encode(array("error" => "Please provide all required fields."));
    }
} else {
    echo json_encode(array("error" => "No data received."));
}

$conn->close();
?>
