import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Globe } from 'lucide-react';
import { getPageContent } from '../store/dataStore';
import './Subpage.css';

const OverOns = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        getPageContent('over-ons').then(data => setContent(data));
    }, []);

    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-over-ons-v2">
                <div className="container">
                    <h1 className="animate-fade-in">OVER <span className="text-teal">ONS</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">Ontdek onze geschiedenis en missie in de Benelux</p>
                </div>
            </div>

            <div className="container subpage-content-v2">
                <div className="content-grid-v2">

                    {/* Main Timeline/Text Section */}
                    <div className="main-content">
                        <h2>WIE ZIJN <span className="text-teal">WIJ?</span><span className="heading-dot"></span></h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            {content?.history || "De naam SVD is een afkorting van het Latijnse Societas Verbi Divini, wat betekent 'Gezelschap van het Goddelijk Woord'. De SVD is een missiecongregatie, die in 1875 werd gesticht door Arnold Janssen te Steyl, bij Venlo (L)."}
                        </p>

                        <div style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                            <img src="https://images.unsplash.com/photo-1548625361-ec853f7c3c54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Missie" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                        </div>

                        <h2>DE PROVINCIE <span className="text-teal">NU</span><span className="heading-dot-gold"></span></h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            {content?.community || "De Nederlands-Belgische provincie van de SVD is daar een onderdeel van. Hoewel de meerderheid van de medebroeders hier ouder is, wonen er sinds de jaren 90 ook jonge mensen uit Indonesië, India, de Filippijnen, China, Congo, Polen en Ghana."}
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            We laten zien, dat een multiculturele samenleving niet een hopeloze zaak hoeft te zijn. Het kost moeite en overleg, ook bij ons, maar de rijkdom van de andere mens vergoedt veel.
                        </p>
                    </div>

                    {/* Sidebar Callouts */}
                    <div className="sidebar-v2">
                        <div className="info-card-v2 bg-dark text-white shadow-hover">
                            <div className="icon-box-v2 text-gold"><Globe size={40} /></div>
                            <h3>WERELDWIJD<span className="heading-dot"></span></h3>
                            <p>Momenteel telt de congregatie ongeveer 6.000 leden wereldwijd, met medebroeders afkomstig uit maar liefst 70 verschillende nationaliteiten.</p>
                        </div>

                        <div className="info-card-v2 shadow-hover mt-4">
                            <div className="icon-box-v2 text-teal"><Users size={40} /></div>
                            <h3>MEER DAN PRIESTERS<span className="heading-dot-gold"></span></h3>
                            <p>Naast priesters behoren ook veel broeders tot de congregatie. Leken kunnen zich naadloos verbinden met de spiritualiteit van de SVD.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OverOns;
