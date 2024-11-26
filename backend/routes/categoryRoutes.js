const express = require('express');
const { getAllCategories, addCategory, updateCategory, deleteCategory, getCategoriesWithCounts } = require('../controllers/categoriesController');

const router = express.Router();

// Debug-Log
console.log('CategoryRoutes geladen');

// Routen definieren
router.get('/', getAllCategories); // Alle Kategorien abrufen
router.post('/', addCategory); // Neue Kategorie hinzufügen
router.put('/:id', updateCategory); // Kategorie aktualisieren
router.delete('/:id', deleteCategory); // Kategorie löschen
router.get('/with-counts', getCategoriesWithCounts);


module.exports = router;
