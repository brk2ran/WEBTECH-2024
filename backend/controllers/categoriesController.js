const pool = require('../database');

// Alle Kategorien abrufen
const getAllCategories = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY name');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Neue Kategorie hinzufügen
const addCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name der Kategorie ist erforderlich.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Kategorie bearbeiten
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name der Kategorie ist erforderlich.' });
    }

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
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Kategorie löschen
const deleteCategory = async (req, res) => {
    const { id } = req.params;

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
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Alle Kategorien mit zugehörigen Items abrufen
const getCategoriesWithItems = async (req, res) => {
    try {
        const query = `
            SELECT c.id AS category_id, c.name AS category_name, 
                   json_agg(i.*) AS items
            FROM categories c
            LEFT JOIN items i ON i.category_id = c.id
            GROUP BY c.id
            ORDER BY c.name;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoriesWithItems,
};
