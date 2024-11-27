import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/categories';

export const fetchCategoriesWithCounts = async () => {
    const response = await axios.get(`${API_BASE}/with-counts`);
    return response.data;
};
