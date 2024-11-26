const pool = require('../database');

// Alle Items abrufen
const getAllItems = async (req, res) => {
    console.log('getAllItems aufgerufen');
    try {
        const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
        console.log('GET-Ergebnis:', result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Items:', err.message);
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Neues Item hinzufügen
const addItem = async (req, res) => {
    const { name, price, mana, categoryId } = req.body;
    console.log('addItem aufgerufen:', { name, price, mana, categoryId });

    try {
        const result = await pool.query(
            'INSERT INTO items (name, price, mana, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, mana, categoryId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen eines Items:', err.message);
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Item löschen
const deleteItem = async (req, res) => {
    const { id } = req.params;
    console.log('deleteItem aufgerufen mit ID:', id);

    try {
        const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
        console.log('DELETE-Ergebnis:', result.rows);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item nicht gefunden.' });
        }

        res.json({ message: 'Item gelöscht.', deleted: result.rows[0] });
    } catch (err) {
        console.error('Fehler beim Löschen eines Items:', err.message);
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Item updaten
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, mana, categoryId } = req.body;

    console.log('updateItem aufgerufen mit ID:', id, 'und Daten:', req.body);

    try {
        const result = await pool.query(
            'UPDATE items SET name = $1, price = $2, mana = $3, category_id = $4 WHERE id = $5 RETURNING *',
            [name, price, mana, categoryId, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item nicht gefunden.' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Aktualisieren eines Items:', err.message);
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

const searchItems = async (req, res) => {
    const { query, minPrice, maxPrice, minMana, maxMana, categoryId } = req.query;

    try {
        let sql = `
            SELECT items.*, categories.name AS category_name
            FROM items
            LEFT JOIN categories ON items.category_id = categories.id
            WHERE 1=1
        `;
        const values = [];

        // Volltextsuche
        if (query) {
            sql += ` AND search_vector @@ plainto_tsquery($${values.length + 1})`;
            values.push(query);
        }

        // Preisbereich
        if (minPrice) {
            sql += ` AND price >= $${values.length + 1}`;
            values.push(minPrice);
        }
        if (maxPrice) {
            sql += ` AND price <= $${values.length + 1}`;
            values.push(maxPrice);
        }

        // Mana-Bereich
        if (minMana) {
            sql += ` AND mana >= $${values.length + 1}`;
            values.push(minMana);
        }
        if (maxMana) {
            sql += ` AND mana <= $${values.length + 1}`;
            values.push(maxMana);
        }

        // Kategorie filtern
        if (categoryId) {
            sql += ` AND category_id = $${values.length + 1}`;
            values.push(categoryId);
        }

        sql += ` ORDER BY created_at DESC`;

        const result = await pool.query(sql, values);
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler bei der Suche:', err.message);
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

module.exports = {
    getAllItems,
    addItem,
    deleteItem,
    updateItem,
    searchItems,
};