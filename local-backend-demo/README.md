# Local Backend Demo

## Cara jalankan
1. Install Node.js
2. Buka folder ini di terminal
3. Jalankan:
   ```bash
   npm init -y
   npm install express sqlite3
   node server.js
   ```
4. Buka browser ke: http://localhost:3000/index.html
5. Isi form → klik submit → data masuk database (data.db)

Cek data:
```
curl http://localhost:3000/api/submissions
```

