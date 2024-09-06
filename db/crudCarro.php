<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "container_db";
$username = "sa";
$password = "YourStrongP@ssw0rd!";
$dbname = "crudGF";
$port = 1433;
 
$conn = new PDO("dblib:host={$servername}:{$port};dbname={$dbname}", $username, $password);

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // header('Content-Type: application/json');

    if ($_POST['action'] == "cadastro"){
        $data = $_POST;
        $placa = $conn->quote($data['placa']);
        $marca = $conn->quote($data['marca']);
        $modelo = $conn->quote($data['modelo']);

        $stmt = $conn->prepare("INSERT INTO carro (placa, marca, modelo) VALUES ({$placa}, {$marca}, {$modelo})");


        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Data saved successfully!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        }
    }
    else if ($_POST['action'] == "getAll"){
        try {
            $stmt = $conn->query("SELECT * FROM carro");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    else if ($_POST['action'] == "filtro"){
        try {
            // $filtro = $conn->quote($_POST['placa']);
            $filtro = $_POST['placa'];
            $filtro = '%' . $filtro . '%';
            $filtro = $conn->quote($filtro);
            $stmt = $conn->query("SELECT * FROM carro where (placa like {$filtro} or marca like {$filtro} or modelo like {$filtro})");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    else if ($_POST['action'] == "delete"){
        try {
            $filtro = $conn->quote($_POST['placa']);
            $stmt = $conn->query("DELETE FROM carro where placa = {$filtro}");
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    else if ($_POST['action'] == "update"){
        try {
            $placa = $conn->quote($_POST['placa']);
            $marca = $conn->quote($_POST['marca']);
            $modelo = $conn->quote($_POST['modelo']);

            $stmt = $conn->query("UPDATE carro set marca = {$marca}, modelo = {$modelo} WHERE placa = {$placa}");
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
?>