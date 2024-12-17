<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'config/Database.php';

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    }
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Length: 0");
    header("Content-Type: text/plain");
    exit(0);
}

// Set headers for actual request
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

try {
    // Parse JSON input
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);

    // Validasi data
    if (!isset($data['email']) || !isset($data['password'])) {
        throw new Exception('Email dan password harus diisi');
    }

    // Connect to database
    $database = new Database();
    $db = $database->getConnection();

    // Prepare query
    $query = "SELECT id, email, full_name, password, type FROM users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data['email']);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Verify password
        if (password_verify($data['password'], $user['password'])) {
            session_start();
            
            // Remove password from user data
            unset($user['password']);
            
            $_SESSION['user'] = $user;

            echo json_encode([
                'success' => true,
                'user' => $user
            ]);
        } else {
            throw new Exception('Password salah');
        }
    } else {
        throw new Exception('Email tidak ditemukan');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} 