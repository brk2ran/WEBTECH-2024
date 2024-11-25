const express = require('express');
const {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoriesWithItems,
} = require('../controllers/categoriesController');

const router = express.Router();

// Endpunkte definieren
router.get('/', getAllCategories); // Alle Kategorien abrufen
router.post('/', addCategory); // Neue Kategorie hinzufügen
router.put('/:id', updateCategory); // Kategorie bearbeiten
router.delete('/:id', deleteCategory); // Kategorie löschen
router.get('/with-items', getCategoriesWithItems);


module.exports = router;
