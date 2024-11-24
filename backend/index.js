// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const crudRoutes = require('./crudRoutes');
app.use('/api', crudRoutes);

app.post('/register', async (req, res) => {
    console.log('Registering user:', req.body);
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
    const values = [username, hashedPassword];

    try {
        await db.query(query, values);
        res.status(201).send("User registered.");
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send("Error registering user.");
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];

    try {
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).send("User not found.");
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid password.");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send("Error logging in.");
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
