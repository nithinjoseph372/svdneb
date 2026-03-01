const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db.js');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'svdneb-secret-key-123'; // In production, move to Environment Variable

// --- AUTH ROUTE --- //
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '12h' });
            res.json({ token, username: user.username });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Middleware for protected routes
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

// --- NEWS ROUTES --- //
app.get('/api/news', (req, res) => {
    db.all('SELECT * FROM news ORDER BY id DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/news', authenticateToken, (req, res) => {
    const { title, tag, date, desc } = req.body;
    if (!title || !desc) return res.status(400).json({ error: 'Title and description required' });

    db.run('INSERT INTO news (title, tag, date, desc) VALUES (?, ?, ?, ?)', [title, tag, date, desc], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, tag, date, desc });
    });
});

app.put('/api/news/:id', authenticateToken, (req, res) => {
    const { title, tag, date, desc } = req.body;
    const { id } = req.params;
    db.run('UPDATE news SET title = ?, tag = ?, date = ?, desc = ? WHERE id = ?', [title, tag, date, desc, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, title, tag, date, desc });
    });
});

app.delete('/api/news/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM news WHERE id = ?', id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: true });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express Backend running on http://localhost:${PORT}`);
});
