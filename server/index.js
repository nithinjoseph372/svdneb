const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_mock_key'); // Replace with real secret key in prod
const db = require('./db.js');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'svdneb-secret-key-123'; // In production, move to Environment Variable

// --- MIDDLEWARE --- //
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- AUTH & USERS (Advanced) --- //
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const ip_address = req.ip;

    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        let status = 'Failed';
        let token = null;

        if (user && bcrypt.compareSync(password, user.password)) {
            status = 'Success';
            token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '12h' });
        }

        // Log Activity
        db.run('INSERT INTO login_activities (username, ip_address, status) VALUES (?, ?, ?)', [username, ip_address, status]);

        if (status === 'Success') {
            res.json({ token, username: user.username });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

app.get('/api/activities', authenticateToken, (req, res) => {
    db.all('SELECT * FROM login_activities ORDER BY timestamp DESC LIMIT 50', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/users', authenticateToken, (req, res) => {
    db.all('SELECT id, username FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/users', authenticateToken, (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Required fields missing' });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, username });
    });
});

app.delete('/api/users/:id', authenticateToken, (req, res) => {
    // Prevent deleting self
    if (req.user.id == req.params.id) return res.status(400).json({ error: "Cannot delete yourself" });

    db.run('DELETE FROM users WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: true });
    });
});

// --- NEWS ROUTES --- //
app.get('/api/news', (req, res) => {
    db.all('SELECT * FROM news ORDER BY id DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/news', authenticateToken, (req, res) => {
    const { title, tag, date, desc } = req.body;
    db.run('INSERT INTO news (title, tag, date, desc) VALUES (?, ?, ?, ?)', [title, tag, date, desc], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, tag, date, desc });
    });
});

app.put('/api/news/:id', authenticateToken, (req, res) => {
    const { title, tag, date, desc } = req.body;
    db.run('UPDATE news SET title = ?, tag = ?, date = ?, desc = ? WHERE id = ?', [title, tag, date, desc, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: req.params.id, title, tag, date, desc });
    });
});

app.delete('/api/news/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM news WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: true });
    });
});

// --- CONTACT FORM ROUTES --- //
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

    db.run('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)', [name, email, subject, message], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

app.get('/api/contacts', authenticateToken, (req, res) => {
    db.all('SELECT * FROM contacts ORDER BY timestamp DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.delete('/api/contacts/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM contacts WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: true });
    });
});

// --- DYNAMIC PAGE CONTENT ROUTES --- //
app.get('/api/content/:pageId', (req, res) => {
    db.get('SELECT content_json FROM page_content WHERE page_identifier = ?', [req.params.pageId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.json({});
        try {
            res.json(JSON.parse(row.content_json));
        } catch (e) {
            res.json({});
        }
    });
});

app.put('/api/content/:pageId', authenticateToken, (req, res) => {
    const contentStr = JSON.stringify(req.body);
    db.get('SELECT id FROM page_content WHERE page_identifier = ?', [req.params.pageId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (row) {
            db.run('UPDATE page_content SET content_json = ? WHERE page_identifier = ?', [contentStr, req.params.pageId], function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true });
            });
        } else {
            db.run('INSERT INTO page_content (page_identifier, content_json) VALUES (?, ?)', [req.params.pageId, contentStr], function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true });
            });
        }
    });
});

// --- STRIPE DONATION ROUTES --- //
app.post('/api/donate/checkout-session', async (req, res) => {
    const { amount } = req.body; // Amount in EUR cents (e.g. 5000 = €50.00)

    try {
        // In a real app, you would use stripe.checkout.sessions.create
        // We mock the response here since we don't have real keys
        const mockSessionUrl = `http://localhost:5173/steun-ons?success=true&amount=${amount}`;

        // Log the intended donation attempt to SQLite
        db.run('INSERT INTO donations (stripe_session_id, amount, currency, status) VALUES (?, ?, ?, ?)',
            [`mock_sess_${Date.now()}`, amount, 'eur', 'pending']);

        res.json({ url: mockSessionUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/donations', authenticateToken, (req, res) => {
    db.all('SELECT * FROM donations ORDER BY timestamp DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express Advanced API Backend running on http://localhost:${PORT}`);
});
