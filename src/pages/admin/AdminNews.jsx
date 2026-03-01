import React, { useState, useEffect } from 'react';
import { getNews, addNewsItem, updateNewsItem, deleteNewsItem } from '../../store/dataStore';
import { Edit2, Trash2, Plus } from 'lucide-react';

const AdminNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState({ id: null, title: '', tag: '', date: '', desc: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        setLoading(true);
        const data = await getNews();
        setNews(data);
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateNewsItem(formState.id, formState);
        } else {
            await addNewsItem(formState);
        }
        setFormState({ id: null, title: '', tag: '', date: '', desc: '' });
        setIsEditing(false);
        loadNews();
    };

    const handleEdit = (item) => {
        setFormState(item);
        setIsEditing(true);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Weet u zeker dat u dit artikel wilt verwijderen?')) {
            await deleteNewsItem(id);
            loadNews();
        }
    };

    if (loading) return <div>Laden...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Nieuws <span className="text-teal">Beheer</span><span className="heading-dot-gold"></span></h2>
                {!isEditing && (
                    <button onClick={() => { setIsEditing(false); setFormState({ id: null, title: '', tag: '', date: '', desc: '' }); }} className="btn btn-dark" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Plus size={18} /> Nieuw Artikel
                    </button>
                )}
            </div>

            <div className="admin-form-container" style={{ marginBottom: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Artikel Bewerken' : 'Nieuw Artikel Toevoegen'}<span className="heading-dot"></span></h3>
                <form onSubmit={handleSubmit}>
                    <div className="admin-form-group">
                        <label>Titel</label>
                        <input type="text" name="title" value={formState.title} onChange={handleInputChange} required />
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div className="admin-form-group" style={{ flex: 1 }}>
                            <label>Categorie / Tag</label>
                            <input type="text" name="tag" value={formState.tag} onChange={handleInputChange} required />
                        </div>
                        <div className="admin-form-group" style={{ flex: 1 }}>
                            <label>Datum (bijv. Dec 15, 2025)</label>
                            <input type="text" name="date" value={formState.date} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="admin-form-group">
                        <label>Inhoud / Beschrijving</label>
                        <textarea name="desc" value={formState.desc} onChange={handleInputChange} rows="5" required></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="btn btn-teal">{isEditing ? 'Opslaan' : 'Toevoegen'}</button>
                        {isEditing && (
                            <button type="button" className="btn btn-dark" onClick={() => { setIsEditing(false); setFormState({ id: null, title: '', tag: '', date: '', desc: '' }); }}>Annuleren</button>
                        )}
                    </div>
                </form>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Tag</th>
                            <th>Titel</th>
                            <th style={{ textAlign: 'right' }}>Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map(item => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td><span style={{ backgroundColor: 'var(--light-grey)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--teal)' }}>{item.tag}</span></td>
                                <td style={{ fontWeight: 600 }}>{item.title}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dark-grey)', marginRight: '1rem' }} title="Bewerken"><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }} title="Verwijderen"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {news.length === 0 && (
                            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>Geen artikelen gevonden.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminNews;
