import '../styles.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemById } from '../api/items';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchItemById(id);
        setItem(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadItem();
  }, [id]);

  if (error) return <p>Fehler: {error}</p>;
  if (!item) return <p>Lade Daten...</p>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2>{item.name}</h2>
      <p><strong>Preis:</strong> {item.price} Gold</p>
      <p><strong>Mana:</strong> {item.mana}</p>
      <p><strong>Erstellt am:</strong> {new Date(item.created_at).toLocaleString()}</p>
    </div>
  );
};

export default ItemDetails;
