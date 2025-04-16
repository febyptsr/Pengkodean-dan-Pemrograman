<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_name = $_POST['product_name'];
    $merk = $_POST['merk'];
    $category = $_POST['category'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];

    $stmt = $pdo->prepare("INSERT INTO products (product_name, merk, category, quantity, price) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$product_name, $merk, $category, $quantity, $price]);

    echo json_encode(['status' => 'success']);
}
?>