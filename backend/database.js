require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

pool.connect()
    .then(() => console.log('Datenbankverbindung erfolgreich'))
    .catch((err) => console.error('Datenbankverbindung fehlgeschlagen:', err.message));

module.exports = pool;
