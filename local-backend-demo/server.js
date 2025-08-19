
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve static files (including index.html, css)

// Database
const db = new sqlite3.Database(path.join(__dirname, "data.db"));
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT,
    usia INTEGER,
    email TEXT,
    tujuan TEXT,
    created_at TEXT
  )`);
});

// Endpoint submit
app.post("/api/submit", (req, res) => {
  const { nama, usia, email, tujuan } = req.body;
  if (!nama) return res.status(400).json({ ok: false, error: "Nama wajib diisi" });

  const stmt = db.prepare("INSERT INTO submissions (nama, usia, email, tujuan, created_at) VALUES (?,?,?,?,?)");
  stmt.run(nama, usia || null, email || null, tujuan || null, new Date().toISOString(), function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ ok: false });
    }
    res.json({ ok: true, id: this.lastID });
  });
});

// Endpoint lihat semua data
app.get("/api/submissions", (req, res) => {
  db.all("SELECT * FROM submissions ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ ok: false });
    res.json({ ok: true, data: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
