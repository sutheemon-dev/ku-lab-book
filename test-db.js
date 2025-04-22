// test-db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    // สร้าง connection
    const conn = await mysql.createConnection({
      host:     process.env.DB_HOST,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port:     process.env.DB_PORT
    });

    console.log('✅ Database connected successfully!');
    
    // (ถ้าต้องการ) รัน query ทดสอบ
    const [rows] = await conn.query('SELECT NOW() AS now');
    console.log('Server time:', rows[0].now);

    await conn.end();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();
