import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';
import ItemForm from './components/ItemForm';

function App() {
  return (
    <Router>
      <div>
        <h1>Magische Items</h1>
        <Routes>
          <Route path="/" element={<ItemList />} /> {/* Startseite: Item-Liste */}
          <Route path="/items/:id" element={<ItemDetails />} /> {/* Item-Details */}
          <Route path="/create" element={<ItemForm />} /> {/* Neues Item erstellen */}
          <Route path="/edit/:id" element={<ItemForm />} /> {/* Item bearbeiten */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
