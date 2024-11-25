const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// Basisroute
app.get('/', (req, res) => {
    res.send('Backend läuft!');
});

// DB Anbindung
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Datenbank verbunden!'))
    .catch(err => console.error(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));


