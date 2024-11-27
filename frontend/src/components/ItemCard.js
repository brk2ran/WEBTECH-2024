function ItemCard({ item }) {
    return (
        <div className="item-card">
            <h3>{item.name}</h3>
            <p>Preis: {item.price} Gold</p>
            <p>Mana: {item.mana}</p>
        </div>
    );
}

export default ItemCard;
