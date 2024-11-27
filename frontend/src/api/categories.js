const BASE_URL = 'http://localhost:5000/api/categories';

// Alle Kategorien abrufen
export const fetchCategories = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Fehler beim Abrufen der Kategorien');
  return response.json();
};

// Kategorie erstellen
export const createCategory = async (categoryData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) throw new Error('Fehler beim Erstellen der Kategorie');
  return response.json();
};

// Kategorie aktualisieren
export const updateCategory = async (id, categoryData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) throw new Error(`Fehler beim Aktualisieren der Kategorie mit ID ${id}`);
  return response.json();
};

// Kategorie löschen
export const deleteCategory = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Fehler beim Löschen der Kategorie mit ID ${id}`);
  return response.json();
};
