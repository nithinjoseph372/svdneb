const API_URL = 'http://localhost:3000/api';

export const getNews = async () => {
    try {
        const res = await fetch(`${API_URL}/news`);
        if (!res.ok) throw new Error('Failed to fetch news');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const addNewsItem = async (item) => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/news`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to add news');
    return await res.json();
};

export const updateNewsItem = async (id, updatedItem) => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/news/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedItem),
    });
    if (!res.ok) throw new Error('Failed to update news');
    return await res.json();
};

export const deleteNewsItem = async (id) => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/news/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to delete news');
    return true;
};

// --- AUTHENTICATION --- //
export const loginAdmin = async (username, password) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            const data = await res.json();
            sessionStorage.setItem('svd_admin_token', data.token);
            sessionStorage.setItem('svd_admin_auth', 'true');
            return true;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const logoutAdmin = () => {
    sessionStorage.removeItem('svd_admin_token');
    sessionStorage.removeItem('svd_admin_auth');
};

export const isAuthenticated = () => {
    return sessionStorage.getItem('svd_admin_auth') === 'true' && sessionStorage.getItem('svd_admin_token') !== null;
};
