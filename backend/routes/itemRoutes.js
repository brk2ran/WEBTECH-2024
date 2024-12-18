const express = require('express');
const { getAllItems, addItem, deleteItem, updateItem, searchItems, getItemWithCategories } = require('../controllers/itemsController');

const router = express.Router();

// Debug-Log
console.log('ItemRoutes geladen');

// Routen definieren
router.get('/', getAllItems); // Alle Items abrufen
router.post('/', addItem); // Neues Item hinzufügen
router.delete('/:id', deleteItem); // Item löschen
router.put('/:id', updateItem); // Item aktualisieren
router.get('/search', searchItems); //Item suchen
router.get('/:id', getItemWithCategories); // Kategorie eines Items abrufen


module.exports = router;
