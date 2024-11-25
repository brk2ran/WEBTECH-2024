const { Pool } = require('pg');
require('dotenv').config();

// Verbindungspool für PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // SSL aktivieren (erforderlich für Neon)
});

module.exports = pool;
