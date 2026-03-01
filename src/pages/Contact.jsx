import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { submitContactForm } from '../store/dataStore';
import './Subpage.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await submitContactForm(formData);
        setLoading(false);

        if (success) {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-contact-v2">
                <div className="container">
                    <h1 className="animate-fade-in">NEEM CONTACT <span className="text-teal">OP</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">We horen graag van u.</p>
                </div>
            </div>

            <div className="container subpage-content-v2">
                <div className="contact-grid-v2">

                    <div className="contact-info">
                        <h2>INFORMATIE<span className="heading-dot"></span></h2>

                        <div className="info-item-v2" style={{ marginTop: '3rem' }}>
                            <div className="icon-box-v2"><MapPin size={32} /></div>
                            <div>
                                <h4>BEZOEKADRES<span className="heading-dot-gold"></span></h4>
                                <p>Laan der Continenten 8<br />4847 DG Teteringen<br />Nederland</p>
                            </div>
                        </div>

                        <div className="info-item-v2">
                            <div className="icon-box-v2"><Phone size={32} /></div>
                            <div>
                                <h4>TELEFOON<span className="heading-dot-gold"></span></h4>
                                <p>+31 (0)76 573 34 33</p>
                            </div>
                        </div>

                        <div className="info-item-v2">
                            <div className="icon-box-v2"><Mail size={32} /></div>
                            <div>
                                <h4>E-MAILADRES<span className="heading-dot-gold"></span></h4>
                                <p>info@svdneb.nl</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container" style={{ background: 'var(--white)', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <h2 style={{ marginTop: 0 }}>Stuur een <span className="text-teal">Bericht</span><span className="heading-dot"></span></h2>
                        <p style={{ color: 'var(--dark-grey)', marginBottom: '2rem' }}>Vul het onderstaande formulier in en wij reageren zo spoedig mogelijk.</p>

                        {status === 'success' && <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontWeight: 600 }}>Uw bericht is succesvol verzonden! Wij nemen spoedig contact met u op.</div>}
                        {status === 'error' && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontWeight: 600 }}>Er is iets misgegaan. Probeer het later opnieuw.</div>}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label>Naam</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>E-mailadres</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Onderwerp</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Bericht</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows="6" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-teal" disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
                                {loading ? 'Verzenden...' : 'Bericht Verzenden'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
