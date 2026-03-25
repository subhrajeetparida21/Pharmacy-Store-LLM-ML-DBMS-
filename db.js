import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const {
  MYSQL_HOST = "localhost",
  MYSQL_PORT = "3306",
  MYSQL_USER = "root",
  MYSQL_PASSWORD = "", //enter your mysql password here
  MYSQL_DATABASE = "pharmacy_app",
} = process.env;

async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await connection.end();
}

await ensureDatabaseExists();

export const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
      name VARCHAR(120) NOT NULL,
      email VARCHAR(191) NOT NULL UNIQUE,
      phone VARCHAR(20) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      business_name VARCHAR(160) NULL,
      business_address VARCHAR(255) NULL,
      verification_document VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS auth_otps (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      purpose ENUM('login', 'password_reset') NOT NULL,
      otp_code VARCHAR(6) NOT NULL,
      expires_at DATETIME NOT NULL,
      used_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_auth_otps_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS medicines (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(160) NOT NULL,
      category VARCHAR(120) NOT NULL,
      description TEXT NULL,
      image_url VARCHAR(255) NULL,
      price DECIMAL(10,2) NOT NULL,
      discount_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
      stock INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS delivery_partners (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      phone VARCHAR(20) NOT NULL UNIQUE,
      active_order_count INT NOT NULL DEFAULT 0,
      completed_order_count INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      delivery_partner_id INT NULL,
      status ENUM('Processing', 'Out for Delivery', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Processing',
      payment_method ENUM('cod', 'upi', 'card') NOT NULL,
      payment_status ENUM('pending', 'paid', 'failed') NOT NULL DEFAULT 'pending',
      subtotal DECIMAL(10,2) NOT NULL,
      discount_total DECIMAL(10,2) NOT NULL DEFAULT 0,
      delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
      total DECIMAL(10,2) NOT NULL,
      address_label VARCHAR(80) NOT NULL,
      address_details VARCHAR(255) NOT NULL,
      notes VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_orders_delivery_partner
        FOREIGN KEY (delivery_partner_id) REFERENCES delivery_partners(id)
        ON DELETE SET NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INT PRIMARY KEY AUTO_INCREMENT,
      order_id INT NOT NULL,
      medicine_id INT NOT NULL,
      medicine_name VARCHAR(160) NOT NULL,
      unit_price DECIMAL(10,2) NOT NULL,
      discount_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
      quantity INT NOT NULL,
      total_price DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_order_items_medicine
        FOREIGN KEY (medicine_id) REFERENCES medicines(id)
        ON DELETE RESTRICT
    )
  `);

  const [medicineCountRows] = await pool.query("SELECT COUNT(*) AS count FROM medicines");
  if ((medicineCountRows[0]?.count || 0) === 0) {
    await pool.query(
      `INSERT INTO medicines (name, category, description, image_url, price, discount_percent, stock)
       VALUES
       ('Paracetamol 500mg', 'Pain Relief', 'Fast relief for fever and mild pain.', 'https://via.placeholder.com/150?text=Paracetamol', 25, 10, 120),
       ('Amoxicillin 250mg', 'Antibiotics', 'Prescription antibiotic for bacterial infections.', 'https://via.placeholder.com/150?text=Amoxicillin', 45, 5, 90),
       ('Vitamin C Tablets', 'Vitamins', 'Daily immunity support tablets.', 'https://via.placeholder.com/150?text=Vitamin+C', 120, 15, 160),
       ('Cough Syrup', 'Cough & Cold', 'Syrup for dry and wet cough relief.', 'https://via.placeholder.com/150?text=Cough+Syrup', 85, 8, 75),
       ('Ibuprofen 400mg', 'Pain Relief', 'Anti-inflammatory tablets for pain relief.', 'https://via.placeholder.com/150?text=Ibuprofen', 35, 0, 140),
       ('Insulin Pen', 'Diabetes Care', 'Insulin delivery pen for diabetes management.', 'https://via.placeholder.com/150?text=Insulin', 450, 12, 35)
      `
    );
  }

  const [partnerCountRows] = await pool.query("SELECT COUNT(*) AS count FROM delivery_partners");
  if ((partnerCountRows[0]?.count || 0) === 0) {
    await pool.query(
      `INSERT INTO delivery_partners (name, phone, active_order_count, completed_order_count)
       VALUES
       ('Ravi Kumar', '9876543210', 0, 5),
       ('Priya Sharma', '9876543211', 0, 3),
       ('Amit Patel', '9876543212', 0, 7)
      `
    );
  }
}
