import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { getNews } from '../store/dataStore';
import './Subpage.css';

const Nieuws = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNews().then(data => {
            setNewsItems(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-contact-v2">
                <div className="container">
                    <h1 className="animate-fade-in">NIEUWS & <span className="text-teal">BLOG</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">Blijf op de hoogte van de laatste ontwikkelingen</p>
                </div>
            </div>

            <div className="container subpage-content-v2">
                <div className="content-grid-v2">

                    <div className="main-content">
                        {loading ? (
                            <p>Berichten laden...</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {newsItems.map((news) => (
                                    <div key={news.id} className="info-card-v2" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                            <span style={{ color: 'var(--teal)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{news.tag}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--dark-grey)', fontSize: '0.9rem' }}>
                                                <Calendar size={16} className="text-teal" /> {news.date}
                                            </span>
                                        </div>
                                        <h3 style={{ marginBottom: '1rem' }}>{news.title}<span className="heading-dot"></span></h3>
                                        <p>{news.desc}</p>
                                        <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--teal)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '1rem', borderBottom: '2px solid var(--teal)', width: 'max-content' }}>
                                            Lees Artikel
                                        </a>
                                    </div>
                                ))}
                                {newsItems.length === 0 && <p>Geen nieuwsberichten gevonden.</p>}
                            </div>
                        )}

                        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                            <button className="btn btn-dark">Laad Meer Berichten</button>
                        </div>
                    </div>

                    <div className="sidebar-v2">
                        <div className="info-card-v2" style={{ borderLeftColor: 'var(--gold)' }}>
                            <h3>CATEGORIEËN<span className="heading-dot"></span></h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0' }}>
                                <li style={{ marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}><a href="#" style={{ fontWeight: 600 }}>SVD Wereld</a></li>
                                <li style={{ marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}><a href="#" style={{ fontWeight: 600 }}>NEB Provincie</a></li>
                                <li style={{ marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}><a href="#" style={{ fontWeight: 600 }}>Rond Contactblad</a></li>
                                <li style={{ marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}><a href="#" style={{ fontWeight: 600 }}>Provincial Notes</a></li>
                                <li style={{ marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}><a href="#" style={{ fontWeight: 600 }}>Video Galerij</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Nieuws;
