<?php
class AuthController {
    private $conn;
    private $table_name;

    public function __construct($db){
        $this->conn = $db;
    }

    public function register($data) {
        $this->table_name = $this->getTableName($data['userType']);
        
        // Hash password
        $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
        
        try {
            // Buat query sesuai tipe user
            switch($data['userType']) {
                case 'user':
                    $query = "INSERT INTO " . $this->table_name . " 
                             (email, password, full_name, phone, address) 
                             VALUES (:email, :password, :full_name, :phone, :address)";
                    break;
                    
                case 'partner':
                    $query = "INSERT INTO " . $this->table_name . " 
                             (email, password, full_name, phone, partner_type, skills, experience_years) 
                             VALUES (:email, :password, :full_name, :phone, :partner_type, :skills, :experience_years)";
                    break;
                    
                case 'vendor':
                    $query = "INSERT INTO " . $this->table_name . " 
                             (email, password, company_name, owner_name, phone, business_license_number) 
                             VALUES (:email, :password, :company_name, :owner_name, :phone, :business_license_number)";
                    break;
            }

            $stmt = $this->conn->prepare($query);
            
            // Bind parameter sesuai tipe user
            $stmt->bindParam(":email", $data['email']);
            $stmt->bindParam(":password", $hashed_password);
            
            switch($data['userType']) {
                case 'user':
                    $stmt->bindParam(":full_name", $data['fullName']);
                    $stmt->bindParam(":phone", $data['phone']);
                    $stmt->bindParam(":address", $data['address']);
                    break;
                    
                case 'partner':
                    $stmt->bindParam(":full_name", $data['fullName']);
                    $stmt->bindParam(":phone", $data['phone']);
                    $stmt->bindParam(":partner_type", $data['partnerType']);
                    $stmt->bindParam(":skills", $data['skills']);
                    $stmt->bindParam(":experience_years", $data['experienceYears']);
                    break;
                    
                case 'vendor':
                    $stmt->bindParam(":company_name", $data['companyName']);
                    $stmt->bindParam(":owner_name", $data['ownerName']);
                    $stmt->bindParam(":phone", $data['phone']);
                    $stmt->bindParam(":business_license_number", $data['businessLicenseNumber']);
                    break;
            }

            if($stmt->execute()){
                return array("success" => true, "message" => "Registrasi berhasil");
            }
            return array("success" => false, "message" => "Registrasi gagal");

        } catch(PDOException $e) {
            return array("success" => false, "message" => $e->getMessage());
        }
    }

    public function login($data) {
        try {
            $table = $this->getTableName($data['userType']);
            $query = "SELECT * FROM " . $table . " WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":email", $data['email']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if (password_verify($data['password'], $user['password'])) {
                    // Hapus password dari response
                    unset($user['password']);
                    
                    // Set session
                    session_start();
                    $_SESSION['user'] = $user;
                    $_SESSION['user_type'] = $data['userType'];
                    
                    return array(
                        "success" => true,
                        "message" => "Login berhasil",
                        "user" => array(
                            "id" => $user['id'],
                            "email" => $user['email'],
                            "full_name" => $user['full_name'] ?? $user['company_name'],
                            "type" => $data['userType']
                        )
                    );
                }
            }
            
            return array(
                "success" => false,
                "message" => "Email atau password salah"
            );
        } catch(PDOException $e) {
            error_log("Login Error: " . $e->getMessage());
            return array(
                "success" => false,
                "message" => "Terjadi kesalahan saat login"
            );
        }
    }

    private function getTableName($userType) {
        switch($userType) {
            case 'user':
                return 'users';
            case 'partner':
                return 'partners';
            case 'vendor':
                return 'vendors';
            default:
                throw new Exception("Invalid user type");
        }
    }

    public function registerPartner($data) {
        try {
            $this->conn->beginTransaction();

            // Insert data partner
            $query = "INSERT INTO partners (
                email, password, full_name, phone, 
                partner_type, experience_years, hourly_rate
            ) VALUES (
                :email, :password, :full_name, :phone, 
                :partner_type, :experience_years, :hourly_rate
            )";
            
            $stmt = $this->conn->prepare($query);
            
            // Hash password
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
            
            // Bind parameter
            $stmt->bindParam(":email", $data['email']);
            $stmt->bindParam(":password", $hashedPassword);
            $stmt->bindParam(":full_name", $data['fullName']);
            $stmt->bindParam(":phone", $data['phone']);
            $stmt->bindParam(":partner_type", $data['partnerType']);
            $stmt->bindParam(":experience_years", $data['experienceYears']);
            $stmt->bindParam(":hourly_rate", $data['hourlyRate']);
            
            $stmt->execute();
            $partnerId = $this->conn->lastInsertId();

            // Insert keahlian partner
            if (!empty($data['skills'])) {
                $skillQuery = "INSERT INTO partner_skills (partner_id, skill_id) 
                              VALUES (:partner_id, :skill_id)";
                $skillStmt = $this->conn->prepare($skillQuery);
                
                foreach ($data['skills'] as $skillId) {
                    $skillStmt->bindParam(":partner_id", $partnerId);
                    $skillStmt->bindParam(":skill_id", $skillId);
                    $skillStmt->execute();
                }
            }

            $this->conn->commit();
            return array(
                "success" => true, 
                "message" => "Registrasi berhasil"
            );

        } catch(PDOException $e) {
            $this->conn->rollBack();
            return array(
                "success" => false, 
                "message" => "Error: " . $e->getMessage()
            );
        }
    }

    public function registerUser($data) {
        try {
            // Validasi email unik
            $checkEmail = "SELECT id FROM users WHERE email = :email";
            $stmt = $this->conn->prepare($checkEmail);
            $stmt->bindParam(":email", $data['email']);
            $stmt->execute();
            
            if($stmt->rowCount() > 0) {
                return array("success" => false, "message" => "Email sudah terdaftar");
            }

            // Insert user baru
            $query = "INSERT INTO users (
                email, 
                password, 
                full_name, 
                phone
            ) VALUES (
                :email, 
                :password, 
                :full_name, 
                :phone
            )";
            
            $stmt = $this->conn->prepare($query);
            
            // Hash password
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
            
            // Bind parameter
            $stmt->bindParam(":email", $data['email']);
            $stmt->bindParam(":password", $hashedPassword);
            $stmt->bindParam(":full_name", $data['fullName']);
            $stmt->bindParam(":phone", $data['phone']);
            
            if($stmt->execute()) {
                return array(
                    "success" => true,
                    "message" => "Registrasi berhasil"
                );
            }
            
            return array(
                "success" => false,
                "message" => "Registrasi gagal"
            );

        } catch(PDOException $e) {
            error_log("Registration Error: " . $e->getMessage());
            return array(
                "success" => false,
                "message" => "Terjadi kesalahan: " . $e->getMessage()
            );
        }
    }
} 