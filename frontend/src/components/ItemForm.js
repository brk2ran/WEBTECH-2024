import React, { useState } from 'react';
import { createItem, updateItem } from '../api/items';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles.css';

const ItemForm = () => {
  const { id } = useParams(); // Wenn ID vorhanden ist, Bearbeitungsmodus
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [mana, setMana] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = { name, price, mana };

    try {
      if (id) {
        await updateItem(id, itemData); // Update-Logik
      } else {
        await createItem(itemData); // Create-Logik
      }
      navigate('/'); // Zurück zur Item-Liste
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>Fehler: {error}</p>}
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Preis:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mana:</label>
        <input
          type="number"
          value={mana}
          onChange={(e) => setMana(e.target.value)}
          required
        />
      </div>
      <button type="submit">{id ? 'Aktualisieren' : 'Erstellen'}</button>
    </form>
  );
};

export default ItemForm;
