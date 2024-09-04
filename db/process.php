<?php
include 'db/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userInput = $_POST['input'];

    // Sanitize input
    $userInput = $conn->real_escape_string($userInput);

    // Example SQL query
    $sql = "INSERT INTO my_table (user_input) VALUES ('$userInput')";

    if ($conn->query($sql) === TRUE) {
        echo "Data saved successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
