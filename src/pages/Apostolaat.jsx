import React from 'react';
import { BookOpen, Leaf, Radio, Globe } from 'lucide-react';
import './Subpage.css';

const apostolaatData = [
    { icon: <BookOpen size={40} />, title: 'BIJBEL APOSTOLAAT', desc: 'Het Woord van God centraal stellen in ons leven en werk, en het toegankelijk maken voor anderen via studie en gebedsbijeenkomsten.' },
    { icon: <Leaf size={40} />, title: 'JPIC', desc: 'Gerechtigheid, Vrede en Heelheid van de Schepping. Inzet voor een eerlijkere wereld en zorg voor de natuur.' },
    { icon: <Radio size={40} />, title: 'SOCIALE COMMUNICATIE', desc: 'Gebruik van moderne en traditionele media ter verkondiging van het Evangelie en om mensen wereldwijd met elkaar te verbinden.' },
    { icon: <Globe size={40} />, title: 'MISSIEANIMATIE', desc: 'Bewustwording creëren over de wereldwijde missie van de Kerk en het stimuleren van betrokkenheid en solidariteit.' },
];

const Apostolaat = () => {
    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-over-ons-v2">
                <div className="container">
                    <h1 className="animate-fade-in">SVD <span className="text-teal">APOSTOLAAT</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">Onze vier karakteristieke dimensies</p>
                </div>
            </div>

            <div className="container subpage-content-v2">
                <div className="content-grid-v2">
                    <div className="main-content">
                        <h2>KARAKTERISTIEKE <span className="text-teal">DIMENSIES</span><span className="heading-dot"></span></h2>
                        <p>
                            Als SVD hebben wij vier "karakteristieke dimensies" benoemd die in al ons werk, waar ook ter wereld, aanwezig moeten zijn.
                            Ze vormen de lens waardoor wij naar onze missie kijken.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '4rem' }}>
                            {apostolaatData.map((item, index) => (
                                <div key={index} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                                    <div className="icon-box-v2" style={{ flexShrink: 0 }}>{item.icon}</div>
                                    <div>
                                        <h3 style={{ margin: '0 0 1rem 0' }}>{item.title}<span className="heading-dot-gold"></span></h3>
                                        <p style={{ margin: 0 }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-v2">
                        <div className="info-card-v2 bg-dark">
                            <h3>DOE <span className="text-teal">MEE</span><span className="heading-dot-gold"></span></h3>
                            <p>Wilt u zich inzetten voor een van onze apostolaten? Bekijk de mogelijkheden om vrijwilliger te worden.</p>
                            <button className="btn btn-teal" style={{ marginTop: '1.5rem', width: '100%' }}>Contact Opnemen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Apostolaat;
