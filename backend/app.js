// Importiere notwendige Pakete
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Umgebungsvariablen einbinden
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Initialisiere die App
const app = express();

// Middleware
app.use(cors()); // Erlaubt Cross-Origin-Anfragen
app.use(bodyParser.json()); // Verarbeitet JSON-Daten
app.use(bodyParser.urlencoded({ extended: true })); // Verarbeitet URL-encoded Daten
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ein unerwarteter Fehler ist aufgetreten.' });
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpunkt nicht gefunden.' });
    });    
});


// API-Routen
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);


// Einfacher Test-Endpunkt
app.get('/', (req, res) => {
  res.send('Backend läuft!');
});

const pool = require('./database');

pool.connect()
    .then(() => console.log('Datenbankverbindung erfolgreich'))
    .catch((err) => console.error('Datenbankverbindung fehlgeschlagen:', err.message));


// Starte den Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
