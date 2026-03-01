import React, { useState, useEffect } from 'react';
import { getUsers, addUser, deleteUser, getLoginActivities } from '../../store/dataStore';
import { Trash2, Shield, Activity, Plus } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [fetchedUsers, fetchedActivities] = await Promise.all([getUsers(), getLoginActivities()]);
        setUsers(fetchedUsers);
        setActivities(fetchedActivities);
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUser(formState.username, formState.password);
        setFormState({ username: '', password: '' });
        fetchData();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Weet u zeker dat u deze beheerder wilt verwijderen?')) {
            try {
                await deleteUser(id);
                fetchData();
            } catch (e) {
                alert("Kan de huidige ingelogde gebruiker niet verwijderen.");
            }
        }
    };

    if (loading) return <div>Laden...</div>;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2>Gebruikers <span className="text-teal">Beheer</span><span className="heading-dot-gold"></span></h2>
                <p style={{ color: 'var(--dark-grey)' }}>Beheer admins en bekijk inlogactiviteiten.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

                {/* Users Column */}
                <div>
                    <div className="admin-form-container" style={{ marginBottom: '2rem', padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={20} className="text-teal" /> Nieuwe Admin Toevoegen
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-group">
                                <label>Gebruikersnaam</label>
                                <input type="text" name="username" value={formState.username} onChange={handleInputChange} required />
                            </div>
                            <div className="admin-form-group">
                                <label>Wachtwoord</label>
                                <input type="password" name="password" value={formState.password} onChange={handleInputChange} required />
                            </div>
                            <button type="submit" className="btn btn-teal" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}><Plus size={18} /> Toevoegen</button>
                        </form>
                    </div>

                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Gebruikersnaam</th>
                                    <th style={{ textAlign: 'right' }}>Acties</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>#{user.id}</td>
                                        <td style={{ fontWeight: 600 }}>{user.username}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button onClick={() => handleDelete(user.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }} title="Verwijderen"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activities Column */}
                <div>
                    <div className="admin-table-container" style={{ marginTop: 0 }}>
                        <h3 style={{ padding: '1.5rem', margin: 0, borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fafafa' }}>
                            <Activity size={20} className="text-teal" /> Recente Inlogactiviteit
                        </h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Tijd & Datum</th>
                                    <th>Gebruiker</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map(act => (
                                    <tr key={act.id}>
                                        <td style={{ fontSize: '0.85rem', color: 'var(--dark-grey)' }}>{new Date(act.timestamp).toLocaleString()}</td>
                                        <td style={{ fontWeight: 600 }}>{act.username}</td>
                                        <td>
                                            <span style={{
                                                backgroundColor: act.status === 'Success' ? '#dcfce7' : '#fee2e2',
                                                color: act.status === 'Success' ? '#166534' : '#991b1b',
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600
                                            }}>
                                                {act.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {activities.length === 0 && <tr><td colSpan="3">Geen activiteit.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminUsers;
