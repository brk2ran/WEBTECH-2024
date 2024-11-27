import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function ItemDetailsPage() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/items/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen des Items.');
                }
                return response.json();
            })
            .then((data) => setItem(data))
            .catch((err) => setError(err));
    }, [id]);

    if (error) {
        return <p>Fehler: {error.message}</p>;
    }

    if (!item) {
        return <p>Lädt...</p>;
    }

    return (
        <div>
            <h1>{item.name}</h1>
            <p>Preis: {item.price} Gold</p>
            <p>Mana: {item.mana}</p>
        </div>
    );
}

export default ItemDetailsPage;
