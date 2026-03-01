import React, { useState, useEffect } from 'react';
import { getDonations } from '../../store/dataStore';
import { CreditCard, DollarSign } from 'lucide-react';

const AdminDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDonations().then(data => {
            setDonations(data);
            setLoading(false);
        });
    }, []);

    const totalAmount = donations.reduce((sum, d) => sum + (d.amount / 100), 0);

    if (loading) return <div>Laden...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2>Donatie <span className="text-teal">Historie</span><span className="heading-dot-gold"></span></h2>
                    <p style={{ color: 'var(--dark-grey)' }}>Overzicht van ontvangen giften via Stripe/PayPal integratie.</p>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--gold)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(185, 151, 91, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                        <DollarSign size={24} color="var(--gold)" />
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--dark-grey)', fontWeight: 600, textTransform: 'uppercase' }}>Totaal Ontvangen</p>
                        <h3 style={{ margin: 0, fontSize: '1.8rem' }}>€{totalAmount.toFixed(2)}</h3>
                    </div>
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Datum & Tijd</th>
                            <th>Transactie ID</th>
                            <th>Bedrag</th>
                            <th>Valuta</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map(don => (
                            <tr key={don.id}>
                                <td style={{ color: 'var(--dark-grey)', fontSize: '0.9rem' }}>{new Date(don.timestamp).toLocaleString()}</td>
                                <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{don.stripe_session_id}</td>
                                <td style={{ fontWeight: 700 }}>€{(don.amount / 100).toFixed(2)}</td>
                                <td style={{ textTransform: 'uppercase' }}>{don.currency}</td>
                                <td>
                                    <span style={{
                                        backgroundColor: don.status === 'success' ? '#dcfce7' : don.status === 'pending' ? '#fef9c3' : '#fee2e2',
                                        color: don.status === 'success' ? '#166534' : don.status === 'pending' ? '#854d0e' : '#991b1b',
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, textTransform: 'capitalize'
                                    }}>
                                        {don.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {donations.length === 0 && <tr><td colSpan="5">Nog geen donaties ontvangen.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDonations;
