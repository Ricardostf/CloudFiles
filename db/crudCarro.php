<?php
include 'db/config.php';

// echo '<pre>';
// print_r($_POST);
// echo '<pre>';
// print_r($_SERVER);
// die();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = $_POST;

    $data = $conn->real_escape_string($data);

    
  
    $sql = "INSERT INTO carro VALUES ('$data')";

    if ($conn->query($sql) === TRUE) {
        echo "Data saved successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
