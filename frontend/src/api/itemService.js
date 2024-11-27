import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/items';

export const fetchItems = async () => {
    const response = await axios.get(API_BASE);
    return response.data;
};

export const fetchItemById = async (id) => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
};
