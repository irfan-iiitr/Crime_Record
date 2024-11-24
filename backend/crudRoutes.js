// backend/crudRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.post('/records', async (req, res) => {
    const { name, age, crime, arrest_date, release_date, description } = req.body;
    try {
        console.log('Adding record:', req.body);

        const query = "INSERT INTO criminal_records (name, age, crime, arrest_date, release_date, description) VALUES ($1, $2, $3, $4, $5, $6)";
        
        await new Promise((resolve, reject) => {
            db.query(query, [name, age, crime, arrest_date, release_date, description], (err, result) => {
                if (err) reject(err); 
                resolve(result);
            });
        });

        res.status(201).send("Record created.");
    } catch (err) {
        console.error("Error adding record:", err);
        res.status(500).send({ error: "Failed to create record", details: err.message }); 
    }
});


router.get('/records', async (req, res) => {
    const { age, crime } = req.query; 
    let query = "SELECT * FROM criminal_records WHERE 1=1";
    const queryParams = [];

    if (age) {
        queryParams.push(age);
        query += ` AND age = $${queryParams.length}`;
    }

    if (crime) {
        queryParams.push(crime);
        query += ` AND crime ILIKE $${queryParams.length}`;
    }

    try {
        const results = await db.query(query, queryParams);
        const records = results.rows || results;

        console.log('Filtered Records:', records);
        res.json(records);
    } catch (err) {
        console.error("Error fetching records:", err);
        res.status(500).json({ error: "Failed to retrieve records", details: err.message });
    }
});

router.put('/records/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, crime, arrest_date, release_date, description } = req.body;

    try {
        const query = `
            UPDATE criminal_records
            SET name = $1, age = $2, crime = $3, arrest_date = $4, release_date = $5, description = $6
            WHERE id = $7
            RETURNING *`;

        const result = await db.query(query, [name, age, crime, arrest_date, release_date, description, id]);

        if (result.rowCount === 0) {
            return res.status(404).send("Record not found.");
        }

        const updatedRecord = result.rows[0];
        res.json(updatedRecord); 
    } catch (err) {
        console.error("Error updating record:", err);
        res.status(500).json({ error: "Failed to update record", details: err.message });
    }
});

// DELETE route 
router.delete('/records/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = "DELETE FROM criminal_records WHERE id = $1 RETURNING *";

        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).send("Record not found.");
        }

        res.status(200).send("Record deleted successfully.");
    } catch (err) {
        console.error("Error deleting record:", err);
        res.status(500).json({ error: "Failed to delete record", details: err.message });
    }
});

module.exports = router;
