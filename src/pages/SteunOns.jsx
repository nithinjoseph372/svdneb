import React from 'react';
import { Heart, Gift, CreditCard } from 'lucide-react';
import './Subpage.css';

const SteunOns = () => {
    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-over-ons-v2">
                <div className="container">
                    <h1 className="animate-fade-in">STEUN <span className="text-teal">ONS</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">Uw bijdrage maakt ons missiewerk mogelijk</p>
                </div>
            </div>

            <div className="container subpage-content-v2">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h2>HELP ONS DE WERELD<br /> EEN BEETJE MOOIER TE <span className="text-teal">MAKEN</span><span className="heading-dot"></span></h2>
                    <p>Dankzij de steun van weldoeners kunnen wij ons wereldwijd inzetten voor de allerarmsten, onderwijs, gezondheidszorg en de verspreiding van het Evangelie.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', marginTop: '5rem', marginBottom: '4rem' }}>

                    <div className="info-card-v2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div className="icon-box-v2" style={{ marginBottom: '2rem' }}><Heart size={50} /></div>
                        <h3>EENMALIGE<br /> DONATIE<span className="heading-dot-gold"></span></h3>
                        <p style={{ marginBottom: '3rem', marginTop: '1rem' }}>Steun ons direct met een eenmalige gift of draag bij aan een specifiek project.</p>
                        <button className="btn btn-dark" style={{ marginTop: 'auto', width: '100%' }}>Doneer Nu</button>
                    </div>

                    <div className="info-card-v2 bg-dark" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div className="icon-box-v2" style={{ color: 'var(--gold)', marginBottom: '2rem' }}><CreditCard size={50} /></div>
                        <h3>PERIODIEK<br /> SCHENKEN<span className="heading-dot"></span></h3>
                        <p style={{ marginBottom: '3rem', marginTop: '1rem' }}>Met een periodiekschenking geeft u ons zekerheid en profiteert u van belastingvoordeel.</p>
                        <button className="btn btn-primary" style={{ marginTop: 'auto', width: '100%' }}>Meer Info</button>
                    </div>

                    <div className="info-card-v2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div className="icon-box-v2" style={{ marginBottom: '2rem' }}><Gift size={50} /></div>
                        <h3>NALATEN<span className="heading-dot-gold"></span></h3>
                        <p style={{ marginBottom: '3rem', marginTop: '1rem' }}>Door de SVD in uw testament op te nemen, steunt u toekomstige generaties.</p>
                        <button className="btn btn-dark" style={{ marginTop: 'auto', width: '100%' }}>Brochure Aanvragen</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SteunOns;
