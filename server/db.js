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
            // Seed default news posts if empty
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
                    }
                });
            }
        });

        // Create Login Activities Table
        db.run(`CREATE TABLE IF NOT EXISTS login_activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      ip_address TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT
    )`);

        // Create Contacts Table
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

        // Create Donations Table (Webhook tracking)
        db.run(`CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stripe_session_id TEXT UNIQUE,
      amount INTEGER,
      currency TEXT,
      status TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

        // Create Gallery Table
        db.run(`CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        image_url TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

        // Create Page Content Table (Dynamic content)
        db.run(`CREATE TABLE IF NOT EXISTS page_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_identifier TEXT UNIQUE,
      content_json TEXT
    )`, (err) => {
            if (!err) {
                // Seed default content block for Over Ons
                db.get("SELECT count(*) as count FROM page_content WHERE page_identifier = 'over-ons'", (error, row) => {
                    if (row && row.count === 0) {
                        const defaultOverOns = {
                            history: "De naam SVD is een afkorting van het Latijnse Societas Verbi Divini, wat betekent 'Gezelschap van het Goddelijk Woord'. De SVD is een missiecongregatie, die in 1875 werd gesticht door Arnold Janssen te Steyl, bij Venlo (L).",
                            community: "De Nederlands-Belgische provincie van de SVD is daar een onderdeel van. Hoewel de meerderheid van de medebroeders hier ouder is, wonen er sinds de jaren 90 ook jonge mensen uit Indonesië, India, de Filippijnen, China, Congo, Polen en Ghana."
                        };
                        db.run("INSERT INTO page_content (page_identifier, content_json) VALUES (?, ?)", ['over-ons', JSON.stringify(defaultOverOns)]);
                    }
                });
            }
        });

    }
});

module.exports = db;
