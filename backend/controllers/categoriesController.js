const pool = require('../database');

// Alle Kategorien abrufen
const getAllCategories = async (req, res) => {
    console.log('getAllCategories aufgerufen');
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY name');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Kategorien:', err.message);
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Neue Kategorie hinzufügen
const addCategory = async (req, res) => {
    const { name } = req.body;
    console.log('addCategory aufgerufen mit Name:', name);

    try {
        const result = await pool.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen einer Kategorie:', err.message);
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Kategorie aktualisieren
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    console.log('updateCategory aufgerufen mit ID:', id, 'Name:', name);

    try {
        const result = await pool.query(
            'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Kategorie nicht gefunden.' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Aktualisieren einer Kategorie:', err.message);
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Kategorie löschen
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    console.log('deleteCategory aufgerufen mit ID:', id);

    try {
        const result = await pool.query(
            'DELETE FROM categories WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Kategorie nicht gefunden.' });
        }

        res.json({ message: 'Kategorie gelöscht.', deleted: result.rows[0] });
    } catch (err) {
        console.error('Fehler beim Löschen einer Kategorie:', err.message);
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
};
