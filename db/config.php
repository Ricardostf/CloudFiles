<?php
$servername = "localhost";
$username = "ricardo";
$password = "@#mslAFD194";
$dbname = "crudGF";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>