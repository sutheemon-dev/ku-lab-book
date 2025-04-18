require('dotenv').config({ path: './server/.env' });
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const axios = require('axios');



const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// สร้าง Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10
});

// ทดสอบการเชื่อมต่อเมื่อเซิร์ฟเวอร์เริ่ม
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL connected successfully!');
    conn.release();
  } catch (err) {
    console.error('❌ MySQL connection error:', err.message);
    process.exit(1);
  }
})();

// Routes สำหรับ CRUD Reservations
app.get('/api/reservations', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM reservations ORDER BY time');
  res.json(rows);
});

app.post('/api/reservations', async (req, res) => {
  const { name, time } = req.body;
  const [result] = await pool.query(
    'INSERT INTO reservations (name, time) VALUES (?, ?)',
    [name, time]
  );
  const [[newRes]] = await pool.query('SELECT * FROM reservations WHERE id = ?', [result.insertId]);
  res.status(201).json(newRes);
});

app.delete('/api/reservations/:id', async (req, res) => {
  await pool.query('DELETE FROM reservations WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
});

// ==== KU OAuth2 Login ====
const AUTH_URL = 'https://sso.ku.ac.th/nidp/oauth/nam/authz';
const TOKEN_URL = 'https://sso.ku.ac.th/nidp/oauth/nam/token';
const USER_INFO_URL = 'https://sso.ku.ac.th/nidp/oauth/nam/userinfo';
const SCOPE = 'profile openid';

app.get('/auth/login', (req, res) => {
  const redirect = `${AUTH_URL}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPE}`;
  res.redirect(redirect);
});

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  const role = req.query.state; // รับ role ที่ส่งมากับ state

  try {
    // ... ขอ token, ดึง user info

    // เปลี่ยนเส้นทางตาม role
    if (role === 'admin') {
      res.redirect('/admin.html');
    } else if (role === 'student') {
      res.redirect('/index.html');
    } else {
      res.redirect('/'); // fallback
    }
  } catch (err) {
    console.error('KU OAuth Error:', err.message);
    res.status(500).send('😢 KU Login Failed');
  }
});

// login 
app.get('/auth/login', (req, res) => {
  const role = req.query.role || 'guest'; // รับ role จาก query
  const redirect = `${AUTH_URL}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPE}&state=${role}`;
  res.redirect(redirect);
});



// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
