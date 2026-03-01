const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');

        // Create Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`, (err) => {
            if (!err) {
                // Seed default admin
                db.get("SELECT * FROM users WHERE username = 'admin'", (error, row) => {
                    if (!row) {
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync('admin123', salt);
                        db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['admin', hash]);
                        console.log("Created default admin user.");
                    }
                });
            }
        });

        // Create News Table
        db.run(`CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      tag TEXT,
      date TEXT,
      desc TEXT
    )`, (err) => {
            if (!err) {
                db.get("SELECT count(*) as count FROM news", (error, row) => {
                    if (row.count === 0) {
                        const stmt = db.prepare("INSERT INTO news (title, tag, date, desc) VALUES (?, ?, ?, ?)");
                        stmt.run('SVD ROND DECEMBER 2025', 'Rond Contactblad', 'Dec 15, 2025', 'De nieuwste editie van ons contactblad met verhalen uit de missie.');
                        stmt.run('WOORD VAN DE PROVINCIALE OVERSTE', 'Provincial Notes', 'Sep 10, 2025', '150 Jaar SVD missie : Geroepen en Gezonden. Dit jaar vieren wij met dankbaarheid het 150-jarig jubileum...');
                        stmt.run('NIEUWE MISSIONARISSEN IN NEDERLAND', 'SVD Nieuws', 'Aug 22, 2025', 'Welkom aan onze nieuwe medebroeders uit Indonesië en India die ons team in de Binelux komen versterken.');
                        stmt.run('SVD ROND APRIL 2025', 'Rond Contactblad', 'Apr 05, 2025', 'Voorjaarseditie met focus op JPIC projecten wereldwijd.');
                        stmt.run('DICHTER BIJ SVD: VERHALEN UIT HET VELD', 'SVD Wereld', 'Jan 12, 2025', 'Een persoonlijke getuigenis van pater Jan over zijn tijd in Ghana.');
                        stmt.finalize();
                        console.log("Seeded default news posts.");
                    }
                });
            }
        });
    }
});

module.exports = db;
