export const API_URL = 'http://localhost:3000/api';

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

// --- ADVANCED API WRAPPERS --- //

export const getLoginActivities = async () => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/activities`, { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) return [];
    return await res.json();
};

export const getUsers = async () => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/users`, { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) return [];
    return await res.json();
};

export const addUser = async (username, password) => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ username, password })
    });
    return res.ok;
};

export const deleteUser = async (id) => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error('Cannot delete self or failed');
    return true;
};

export const getPageContent = async (pageId) => {
    try {
        const res = await fetch(`${API_URL}/content/${pageId}`);
        if (!res.ok) return {};
        return await res.json();
    } catch (e) { return {}; }
};

export const savePageContent = async (pageId, contentObj) => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/content/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(contentObj)
    });
    return res.ok;
};

export const submitContactForm = async (data) => {
    const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.ok;
};

export const getContacts = async () => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/contacts`, { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) return [];
    return await res.json();
};

export const getDonations = async () => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/donations`, { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) return [];
    return await res.json();
};

// --- GALLERY --- //
export const getGallery = async () => {
    const res = await fetch(`${API_URL}/gallery`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
};

export const uploadGalleryImage = async (formData) => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData // Note: no Content-Type header so the browser sets the boundary automatically
    });
    return res.ok;
};

export const deleteGalleryImage = async (id) => {
    const token = sessionStorage.getItem('svd_admin_token');
    const res = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.ok;
};
