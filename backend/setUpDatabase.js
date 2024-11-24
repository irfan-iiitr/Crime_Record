const { Client } = require('pg');

// Connect to your database
const client = new Client({
    connectionString:  'postgresql://neondb_owner:rXpDQAP60htu@ep-ancient-hat-a5r5ramy.us-east-2.aws.neon.tech/neondb?sslmode=require'
});

client.connect()
    .then(() => console.log('Connected to the database!'))
    .catch(err => console.error('Connection error', err.stack));

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS criminal_records (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        age INT,
        crime VARCHAR(255),
        arrest_date DATE,
        release_date DATE,
        description TEXT
    );
`;

client.query(createTableQuery)
    .then(res => {
        console.log('Table created or already exists!');
        client.end(); 
    })
    .catch(err => {
        console.error('Error creating table:', err.stack);
        client.end();
    });
