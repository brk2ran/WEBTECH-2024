const express = require('express');
const { getAllItems, addItem, getItemsByCategory, searchItems } = require('../controllers/itemsController');

const router = express.Router();

// Routen definieren
router.get('/', getAllItems); // Alle Items
router.get('/category/:categoryId', getItemsByCategory); // Items nach Kategorie
router.post('/', addItem); // Neues Item hinzufügen
router.get('/search', searchItems); // Suche und Filter


module.exports = router;
