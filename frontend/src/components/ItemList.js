import React, { useEffect, useState } from 'react';
import { fetchItems } from '../api/items';
import '../styles.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadItems();
  }, []);

  if (error) return <p>Fehler: {error}</p>;
  if (!items.length) return <p>Lade Items...</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} - {item.price} Gold
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
