const BASE_URL = 'http://localhost:5000/api/items';

// Alle Items abrufen
export const fetchItems = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Fehler beim Abrufen der Items');
  return response.json();
};

// Einzelnes Item abrufen
export const fetchItemById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Fehler beim Abrufen des Items mit ID ${id}`);
  return response.json();
};

// Neues Item erstellen
export const createItem = async (itemData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  if (!response.ok) throw new Error('Fehler beim Erstellen des Items');
  return response.json();
};

// Item aktualisieren
export const updateItem = async (id, itemData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  if (!response.ok) throw new Error(`Fehler beim Aktualisieren des Items mit ID ${id}`);
  return response.json();
};

// Item löschen
export const deleteItem = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Fehler beim Löschen des Items mit ID ${id}`);
  return response.json();
};
