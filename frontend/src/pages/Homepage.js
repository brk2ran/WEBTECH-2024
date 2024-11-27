import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { fetchItems } from '../api/itemService';

function HomePage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems().then(setItems);
    }, []);

    return (
        <div>
            <h2>Magische Items</h2>
            <div className="item-list">
                {items.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
