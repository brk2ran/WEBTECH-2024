import { useEffect, useState } from 'react';

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Kategorien.');
                }
                return response.json();
            })
            .then((data) => setCategories(data))
            .catch((err) => setError(err));
    }, []);

    if (error) {
        return <p>Fehler: {error.message}</p>;
    }

    return (
        <div>
            <h1>Kategorien</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name} - {category.item_count || 0} Items
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesPage;
