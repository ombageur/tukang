<?php
require_once '../config/Database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    $email = 'user@example.com';
    $password = password_hash('password123', PASSWORD_DEFAULT);
    $full_name = 'Test User';
    $type = 'user';

    $query = "INSERT INTO users (email, password, full_name, type) VALUES (:email, :password, :full_name, :type)";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $password);
    $stmt->bindParam(":full_name", $full_name);
    $stmt->bindParam(":type", $type);

    if ($stmt->execute()) {
        echo "Test user created successfully";
    } else {
        echo "Failed to create test user";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
} 