import React from 'react';
import { MapPin } from 'lucide-react';
import './Subpage.css';

const communiteitenData = [
    { city: 'Amsterdam', desc: 'Onze gemeenschap in de hoofdstad, actief in diverse parochies en studentenpastoraat.' },
    { city: 'Teteringen', desc: 'Het Provincialaat en thuisbasis voor vele oudere medebroeders (Zuiderhout).' },
    { city: 'Den Haag', desc: 'Betrokken bij internationale en multiculturele parochies in de Hofstad.' },
    { city: 'Hoofddorp', desc: 'Actief in de lokale gemeenschap met focus op pastoraal werk.' },
    { city: 'Breda', desc: 'Een actieve religieuze gemeenschap midden in de samenleving.' },
    { city: 'Roosendaal', desc: 'Betrokken bij bezinning, onderwijs en lokaal apostolaat.' },
];

const Communiteiten = () => {
    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-contact-v2">
                <div className="container">
                    <h1 className="animate-fade-in">ONZE <span className="text-teal">COMMUNITEITEN</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">Onze aanwezigheid in Nederland en België</p>
                </div>
            </div>

            <div className="container subpage-content-v2">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h2>WAAR WIJ ACTIEF <span className="text-teal">ZIJN</span><span className="heading-dot"></span></h2>
                    <p>
                        De medebroeders van de Nederlands-Belgische provincie wonen en werken in verschillende communiteiten.
                        Elke gemeenschap heeft haar eigen specifiek apostolaat, passend bij de lokale behoeften.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', marginTop: '5rem' }}>
                    {communiteitenData.map((comm, index) => (
                        <div key={index} className="info-card-v2">
                            <div className="icon-box-v2" style={{ marginBottom: '1.5rem' }}>
                                <MapPin size={40} />
                            </div>
                            <h3>{comm.city}<span className="heading-dot-gold"></span></h3>
                            <p>{comm.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Communiteiten;
