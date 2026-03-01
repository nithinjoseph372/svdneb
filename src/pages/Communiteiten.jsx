import React, { useState, useEffect } from 'react';
import { MapPin, Users, Building, ArrowRight } from 'lucide-react';
import { getPageContent } from '../store/dataStore';
import './Subpage.css';

const Communiteiten = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        getPageContent('communiteiten').then(data => setContent(data));
    }, []);

    const communiteitenLijst = [
        { id: 1, name: "SVD Soesterberg", location: "Nederland", desc: "Een hechte gemeenschap met nadruk op pastoraat en ouderenzorg." },
        { id: 2, name: "SVD Teteringen", location: "Nederland", desc: "Hier bevindt zich het hoofdbestuur en een bloeiende missie-animatie." },
        { id: 3, name: "SVD Someren", location: "Nederland", desc: "Betrokken bij lokaal jongerenwerk en parochie assistentie." },
        { id: 4, name: "SVD Antwerpen", location: "België", desc: "Focus op interculturele dialoog en stedelijk apostolaat." }
    ];

    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-contact-v2">
                <div className="container">
                    <h1 className="animate-fade-in">ONZE <span className="text-teal">COMMUNITEITEN</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">Lokaal geworteld, wereldwijd verbonden</p>
                </div>
            </div>

            <div className="container subpage-content-v2">

                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                    <h2>GEMEENSCHAPPEN IN DE <span className="text-teal">BENELUX</span><span className="heading-dot"></span></h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--dark-grey)' }}>
                        {content?.intro || "Onze medebroeders zijn verspreid over verschillende huizen en gemeenschappen in Nederland en België. Ieder huis heeft zijn eigen specifieke taak of apostolaat, maar deelt dezelfde SVD spiritualiteit."}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {communiteitenLijst.map((com) => (
                        <div key={com.id} className="info-card-v2" style={{ borderTop: '4px solid var(--teal)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(0,174,181,0.1)', padding: '1rem', borderRadius: '12px' }}>
                                    <Building size={30} className="text-teal" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{com.name}</h3>
                                    <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--dark-grey)', fontSize: '0.9rem' }}>
                                        <MapPin size={16} /> {com.location}
                                    </p>
                                </div>
                            </div>
                            <p style={{ minHeight: '60px' }}>{com.desc}</p>
                            <button className="btn btn-dark" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                                Details <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Communiteiten;
