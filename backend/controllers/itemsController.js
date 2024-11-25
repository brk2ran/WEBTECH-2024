const pool = require('../database');

// Alle Items abrufen
const getAllItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Ein neues Item hinzufügen
const addItem = async (req, res) => {
    const { name, price, mana, categoryId } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name ist erforderlich und darf nicht leer sein.' });
    }
    
    if (!price || isNaN(price) || price <= 0) {
        return res.status(400).json({ error: 'Preis muss eine positive Zahl sein.' });
    }
    
    if (!mana || isNaN(mana) || mana < 0) {
        return res.status(400).json({ error: 'Mana muss 0 oder größer sein.' });
    }
    
    if (!categoryId) {
        return res.status(400).json({ error: 'Eine gültige Kategorie-ID ist erforderlich.' });
    }
    
};


// Alle Items einer bestimmten Kategorie abrufen
const getItemsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM items WHERE category_id = $1 ORDER BY created_at DESC',
            [categoryId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};

// Volltextsuche und Filter
const searchItems = async (req, res) => {
    const { query, minPrice, maxPrice, minMana, maxMana } = req.query;

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

        // Preisbereich filtern
        if (minPrice) {
            sql += ` AND price >= $${values.length + 1}`;
            values.push(minPrice);
        }
        if (maxPrice) {
            sql += ` AND price <= $${values.length + 1}`;
            values.push(maxPrice);
        }

        // Manawert filtern
        if (minMana) {
            sql += ` AND mana >= $${values.length + 1}`;
            values.push(minMana);
        }
        if (maxMana) {
            sql += ` AND mana <= $${values.length + 1}`;
            values.push(maxMana);
        }

        sql += ` ORDER BY items.created_at DESC`;

        const result = await pool.query(sql, values);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Datenbankfehler', details: err.message });
    }
};



module.exports = {
    getAllItems,
    getItemsByCategory,
    addItem,
    searchItems,
};

