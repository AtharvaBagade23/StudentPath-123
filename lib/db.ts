import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'studentpath',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

export default pool;

// Database initialization function
export async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create colleges table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS colleges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        college_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        country VARCHAR(100) NOT NULL,
        state VARCHAR(100),
        city VARCHAR(100) NOT NULL,
        address TEXT,
        website VARCHAR(255),
        established_year INT,
        college_type VARCHAR(100),
        accreditation VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        college_token VARCHAR(50) UNIQUE NOT NULL,
        contact_person VARCHAR(255),
        contact_person_email VARCHAR(255),
        contact_person_phone VARCHAR(20),
        total_students INT,
        programs JSON,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create students table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        college_id INT,
        student_id VARCHAR(50),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        date_of_birth DATE,
        gender ENUM('male', 'female', 'non-binary', 'prefer-not-to-say'),
        password_hash VARCHAR(255) NOT NULL,
        college VARCHAR(255),
        program VARCHAR(255),
        current_year INT,
        current_semester INT,
        enrollment_year INT,
        current_gpa DECIMAL(3,2),
        academic_interests JSON,
        career_quiz_answers JSON,
        technical_skills JSON,
        soft_skills JSON,
        language_skills JSON,
        primary_goal VARCHAR(255),
        secondary_goal VARCHAR(255),
        timeline VARCHAR(100),
        location_preference VARCHAR(100),
        industry_focus JSON,
        intensity_level ENUM('light', 'moderate', 'intensive') DEFAULT 'moderate',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE SET NULL
      )
    `);

    // Create professionals table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS professionals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(255),
        designation VARCHAR(255),
        industry VARCHAR(100),
        experience VARCHAR(50),
        current_salary VARCHAR(50),
        expected_salary VARCHAR(50),
        linkedin VARCHAR(255),
        github VARCHAR(255),
        portfolio VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        skills JSON,
        certifications TEXT,
        career_goals TEXT,
        preferred_learning_style VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create college_tokens table for tracking token usage
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS college_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        college_id INT NOT NULL,
        token VARCHAR(50) UNIQUE NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        usage_count INT DEFAULT 0,
        max_usage INT DEFAULT 1000,
        expires_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
      )
    `);

    connection.release();
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
