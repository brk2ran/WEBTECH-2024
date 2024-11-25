const express = require('express');
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categoriesController');

const router = express.Router();

// Debug-Log
console.log('CategoryRoutes geladen');

// Routen definieren
router.get('/', getAllCategories); // Alle Kategorien abrufen
router.post('/', addCategory); // Neue Kategorie hinzufügen
router.put('/:id', updateCategory); // Kategorie aktualisieren
router.delete('/:id', deleteCategory); // Kategorie löschen

module.exports = router;
