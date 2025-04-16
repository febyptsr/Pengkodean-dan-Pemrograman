<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $product_name = $_POST['product_name'];
    $merk = $_POST['merk'];
    $category = $_POST['category'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];

    $stmt = $pdo->prepare("UPDATE products SET product_name = ?, merk = ?, category = ?, quantity = ?, price = ? WHERE id = ?");
    $stmt->execute([$product_name, $merk, $category, $quantity, $price, $id]);

    echo json_encode(['status' => 'success']);
}
?>