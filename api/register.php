<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'config/Database.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    // Parse JSON input
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);

    // Validasi data
    if (!isset($data['email']) || !isset($data['password']) || !isset($data['full_name'])) {
        throw new Exception('Semua field harus diisi');
    }

    // Validasi email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Format email tidak valid');
    }

    // Validasi password
    if (strlen($data['password']) < 6) {
        throw new Exception('Password minimal 6 karakter');
    }

    // Connect to database
    $database = new Database();
    $db = $database->getConnection();

    // Check if email already exists
    $query = "SELECT id FROM users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data['email']);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        throw new Exception('Email sudah terdaftar');
    }

    // Hash password
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

    // Insert new user
    $query = "INSERT INTO users (email, password, full_name, type) VALUES (:email, :password, :full_name, :type)";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":email", $data['email']);
    $stmt->bindParam(":password", $hashedPassword);
    $stmt->bindParam(":full_name", $data['full_name']);
    $stmt->bindParam(":type", $data['type']);

    if ($stmt->execute()) {
        // Get the newly created user
        $userId = $db->lastInsertId();
        $query = "SELECT id, email, full_name, type FROM users WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $userId);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Start session
        session_start();
        $_SESSION['user'] = $user;

        echo json_encode([
            'success' => true,
            'message' => 'Registrasi berhasil',
            'user' => $user
        ]);
    } else {
        throw new Exception('Gagal melakukan registrasi');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} 