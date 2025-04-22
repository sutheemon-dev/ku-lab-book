// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',                  // โฟลเดอร์ที่เก็บไฟล์ dev
  publicDir: '../public',       // รูป/ไฟล์ static
  build: {
    outDir: '../docs',          // ส่งออกไปที่ docs/
    emptyOutDir: true           // เคลียร์ docs/ ก่อน build
  }
});
