require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Debug-Log für den Start des Servers
console.log('Server läuft auf http://localhost:' + PORT);

// Routen registrieren
app.use('/api/items', (req, res, next) => {
  console.log('Route /api/items registriert');
  next();
});
app.use('/api/items', itemRoutes);

app.use('/api/categories', (req, res, next) => {
    console.log('Route /api/categories erreicht');
    next();
});
app.use('/api/categories', categoryRoutes);

// Fehlerbehandlung
app.use((req, res) => {
    res.status(404).json({ error: 'Endpunkt nicht gefunden.' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ein unerwarteter Fehler ist aufgetreten.' });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
