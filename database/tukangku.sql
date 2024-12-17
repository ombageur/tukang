-- Create database
CREATE DATABASE IF NOT EXISTS tukangku;
USE tukangku;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    type ENUM('user', 'partner', 'vendor') NOT NULL DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Service categories
CREATE TABLE IF NOT EXISTS service_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) DEFAULT 'per day',
    icon VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES service_categories(id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    partner_id INT,
    status ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    schedule_date DATE NOT NULL,
    schedule_time ENUM('morning', 'afternoon', 'full_day') NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (partner_id) REFERENCES users(id),
    jenis_tukang TINYINT NOT NULL DEFAULT 0 
    COMMENT '0: Tukang Ahli, 1: Tukang Terampil, 2: Tukang Pemula'
);

-- Order details table
CREATE TABLE IF NOT EXISTS order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_type ENUM('service', 'material') NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Materials table
CREATE TABLE IF NOT EXISTS materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(255),
    vendor VARCHAR(255),
    status ENUM('available', 'out_of_stock') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    partner_id INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (partner_id) REFERENCES users(id)
);

-- Tabel Provinsi
CREATE TABLE provinces (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Kota/Kabupaten
CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    province_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type ENUM('Kota', 'Kabupaten') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (province_id) REFERENCES provinces(id)
);

-- Tabel Kecamatan
CREATE TABLE districts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- Tabel Kelurahan/Desa
CREATE TABLE villages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    district_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    postal_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id)
);

-- Tabel Area Layanan Tukang
CREATE TABLE partner_service_areas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partner_id INT NOT NULL,
    province_id INT,
    city_id INT,
    district_id INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (partner_id) REFERENCES users(id),
    FOREIGN KEY (province_id) REFERENCES provinces(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (district_id) REFERENCES districts(id)
);

-- Tabel Area Vendor
CREATE TABLE vendor_service_areas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NOT NULL,
    province_id INT,
    city_id INT,
    district_id INT,
    delivery_cost DECIMAL(10,2) DEFAULT 0,
    min_order DECIMAL(10,2) DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES users(id),
    FOREIGN KEY (province_id) REFERENCES provinces(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (district_id) REFERENCES districts(id)
);

-- Tabel untuk menyimpan alamat user
CREATE TABLE user_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    province_id INT NOT NULL,
    city_id INT NOT NULL,
    district_id INT NOT NULL,
    village_id INT NOT NULL,
    address_detail TEXT NOT NULL,
    postal_code VARCHAR(10),
    label VARCHAR(50), -- rumah, kantor, dll
    is_primary BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (province_id) REFERENCES provinces(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (village_id) REFERENCES villages(id)
);

-- Contoh data provinsi
INSERT INTO provinces (name) VALUES 
('DKI Jakarta'),
('Jawa Barat'),
('Jawa Tengah'),
('Jawa Timur'),
('Banten');

-- Contoh data kota untuk DKI Jakarta
INSERT INTO cities (province_id, name, type) VALUES 
(1, 'Jakarta Pusat', 'Kota'),
(1, 'Jakarta Utara', 'Kota'),
(1, 'Jakarta Barat', 'Kota'),
(1, 'Jakarta Selatan', 'Kota'),
(1, 'Jakarta Timur', 'Kota');

-- Index untuk optimasi query
CREATE INDEX idx_cities_province ON cities(province_id);
CREATE INDEX idx_districts_city ON districts(city_id);
CREATE INDEX idx_villages_district ON villages(district_id);
CREATE INDEX idx_partner_areas ON partner_service_areas(partner_id, province_id, city_id, district_id);
CREATE INDEX idx_vendor_areas ON vendor_service_areas(vendor_id, province_id, city_id, district_id);

-- Insert sample data
INSERT INTO users (email, password, full_name, type) VALUES 
('user@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test User', 'user'),
('partner@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test Partner', 'partner'),
('vendor@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test Vendor', 'vendor');
-- Note: Password for all users is 'password123'

-- Insert service categories
INSERT INTO service_categories (name, description, icon) VALUES
('Renovasi', 'Layanan renovasi rumah', 'FaHardHat'),
('Pengecatan', 'Layanan pengecatan rumah', 'FaPaintRoller'),
('Perbaikan', 'Layanan perbaikan umum', 'FaWrench'),
('Instalasi', 'Layanan pemasangan dan instalasi', 'FaTools');

-- Insert services
INSERT INTO services (category_id, name, description, base_price, unit) VALUES
(1, 'Renovasi Kamar Mandi', 'Renovasi kamar mandi lengkap', 5000000, 'per project'),
(2, 'Pengecatan Dinding', 'Pengecatan dinding rumah', 35000, 'per m2'),
(3, 'Perbaikan Atap', 'Perbaikan kebocoran atap', 500000, 'per hari'),
(4, 'Instalasi Listrik', 'Pemasangan instalasi listrik', 750000, 'per hari');

-- Insert materials
INSERT INTO materials (name, description, price, unit, category, vendor) VALUES
('Cat Dulux Weathershield', 'Cat eksterior premium tahan cuaca', 385000, '2.5L', 'Cat Tembok Eksterior', 'Toko Bangunan Jaya'),
('Cat Nippon Paint Vinilex', 'Cat interior berkualitas', 195000, '2.5L', 'Cat Tembok Interior', 'Material Center'),
('Keramik Granit 60x60', 'Keramik granit premium', 185000, 'per m2', 'Keramik', 'Material Center'),
('Semen Tiga Roda', 'Semen berkualitas', 65000, '40kg', 'Semen', 'Toko Bangunan Jaya');
  