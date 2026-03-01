import React, { useState, useEffect } from 'react';
import { getContacts } from '../../store/dataStore';

const AdminContacts = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getContacts().then(data => {
            setMessages(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Laden...</div>;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2>Contact<span className="text-teal">berichten</span><span className="heading-dot-gold"></span></h2>
                <p style={{ color: 'var(--dark-grey)' }}>Bekijk alle berichten die via het contactformulier zijn binnengekomen.</p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--teal)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {msg.subject || 'Geen Onderwerp'}
                                </h3>
                                <p style={{ margin: 0, fontWeight: 600 }}>{msg.name} (<a href={`mailto:${msg.email}`} style={{ color: 'var(--teal)' }}>{msg.email}</a>)</p>
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--dark-grey)' }}>{new Date(msg.timestamp).toLocaleString()}</span>
                        </div>

                        <div style={{ background: 'var(--light-grey)', padding: '1rem', borderRadius: '8px', color: '#333', whiteSpace: 'pre-wrap' }}>
                            {msg.message}
                        </div>
                    </div>
                ))}

                {messages.length === 0 && (
                    <div style={{ padding: '3rem', background: 'white', borderRadius: '12px', textAlign: 'center', color: 'var(--dark-grey)' }}>
                        Er zijn nog geen contactberichten binnengekomen.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminContacts;
