import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Magische Items</h1>
            <nav>
                <Link to="/">Home</Link> | <Link to="/categories">Kategorien</Link>
            </nav>
        </header>
    );
}

export default Header;
