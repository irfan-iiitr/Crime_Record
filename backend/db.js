const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:rXpDQAP60htu@ep-ancient-hat-a5r5ramy.us-east-2.aws.neon.tech/neondb?sslmode=require';

// Create a new client instance
const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect(err => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

module.exports = client; 
