<?php

class Auth {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function registerUser($data) {
        $sql = "INSERT INTO users (email, password, full_name, phone, address) 
                VALUES (:email, :password, :full_name, :phone, :address)";
        
        $stmt = $this->db->prepare($sql);
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        
        return $stmt->execute($data);
    }

    public function registerPartner($data) {
        $sql = "INSERT INTO partners (email, password, full_name, phone, partner_type, skills, experience_years) 
                VALUES (:email, :password, :full_name, :phone, :partner_type, :skills, :experience_years)";
        
        $stmt = $this->db->prepare($sql);
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        
        return $stmt->execute($data);
    }

    public function registerVendor($data) {
        $sql = "INSERT INTO vendors (email, password, company_name, owner_name, phone, business_license_number) 
                VALUES (:email, :password, :company_name, :owner_name, :phone, :business_license_number)";
        
        $stmt = $this->db->prepare($sql);
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        
        return $stmt->execute($data);
    }

    public function login($email, $password, $userType = 'users') {
        $sql = "SELECT * FROM {$userType} WHERE email = :email";
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']);
            $_SESSION['user'] = $user;
            $_SESSION['user_type'] = $userType;
            return true;
        }

        return false;
    }

    public function logout() {
        session_destroy();
    }
} 