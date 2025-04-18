// server/routes/auth.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const AUTH_URL = 'https://sso.ku.ac.th/nidp/oauth/nam/authz';
const TOKEN_URL = 'https://sso.ku.ac.th/nidp/oauth/nam/token';
const USER_INFO_URL = 'https://sso.ku.ac.th/nidp/oauth/nam/userinfo';
const SCOPE = 'profile openid'; // ใส่ตามที่หน่วยงาน KU กำหนด

// Step 1: Redirect ไป KU SSO
router.get('/login', (req, res) => {
  const redirect = `${AUTH_URL}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPE}`;
  res.redirect(redirect);
});

// Step 2: Callback รับ code แล้วแลก token
router.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    // ขอ Access Token ด้วย code ที่ได้
    const tokenRes = await axios.post(TOKEN_URL, null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const accessToken = tokenRes.data.access_token;

    // ใช้ token ดึงข้อมูล user
    const userRes = await axios.get(USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const user = userRes.data;
    
    // TODO: จัดเก็บ session / cookie / redirect ไปหน้า dashboard
    res.send(`<h2>ยินดีต้อนรับ ${user.sub} 🎉</h2><pre>${JSON.stringify(user, null, 2)}</pre>`);

  } catch (error) {
    res.status(500).send('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
  }
});

module.exports = router;
