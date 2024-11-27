import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



function App() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/items')
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((err) => setError(err));
    }, []);

    if (error) {
        return <p>Fehler: {error.message}</p>;
    }

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <h1>Magische Items</h1>
                                <ul>
                                    {items.map((item) => (
                                        <li key={item.id}>
                                            <Link to={`/items/${item.id}`}>
                                                {item.name} - {item.price} Gold
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    />
                    <Route path="/items/:id" element={<ItemDetailsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

// Detail-Seite
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
            <h2>{item.name}</h2>
            <p>Preis: {item.price} Gold</p>
            <p>Mana: {item.mana}</p>
        </div>
    );
}
