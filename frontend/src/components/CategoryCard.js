function CategoryCard({ category }) {
    return (
        <div className="category-card">
            <h3>{category.name}</h3>
            <p>Items: {category.item_count}</p>
        </div>
    );
}

export default CategoryCard;
