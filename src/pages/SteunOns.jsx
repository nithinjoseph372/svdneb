import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heart, Gift, CreditCard, DollarSign } from 'lucide-react';
import { API_URL } from '../store/dataStore';
import './Subpage.css';

const SteunOns = () => {
    const [searchParams] = useSearchParams();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchParams.get('success') === 'true') {
            setSuccess(true);
        }
    }, [searchParams]);

    const handleDonate = async (amountInCents) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/donate/checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amountInCents })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Er is een fout opgetreden bij het verwerken van uw donatie.");
                setLoading(false);
            }
        } catch (e) {
            alert("Er is een fout opgetreden bij het verwerken van uw donatie.");
            setLoading(false);
        }
    };

    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-over-ons-v2">
                <div className="container">
                    <h1 className="animate-fade-in">STEUN <span className="text-teal">ONS</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">Uw bijdrage maakt ons missiewerk mogelijk</p>
                </div>
            </div>

            <div className="container subpage-content-v2">
                {success && (
                    <div style={{ background: '#dcfce7', color: '#166534', padding: '1.5rem', borderRadius: '8px', marginBottom: '3rem', textAlign: 'center', fontWeight: 600, fontSize: '1.2rem' }}>
                        🎉 Hartelijk dank voor uw gulle donatie! Uw steun maakt een wereld van verschil.
                    </div>
                )}

                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h2>HELP ONS DE WERELD<br /> EEN BEETJE MOOIER TE <span className="text-teal">MAKEN</span><span className="heading-dot"></span></h2>
                    <p>Dankzij de steun van weldoeners kunnen wij ons wereldwijd inzetten voor de allerarmsten, onderwijs, gezondheidszorg en de verspreiding van het Evangelie.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', marginTop: '5rem', marginBottom: '4rem' }}>

                    <div className="info-card-v2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div className="icon-box-v2" style={{ marginBottom: '2rem' }}><Heart size={50} /></div>
                        <h3>EENMALIGE<br /> DONATIE<span className="heading-dot-gold"></span></h3>
                        <p style={{ marginBottom: '2rem', marginTop: '1rem' }}>Steun ons direct met een eenmalige digitale gift (Stripe/iDEAL via API test).</p>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
                            <button onClick={() => handleDonate(1000)} disabled={loading} className="btn btn-dark" style={{ padding: '0.5rem 1rem' }}>€10</button>
                            <button onClick={() => handleDonate(2500)} disabled={loading} className="btn btn-dark" style={{ padding: '0.5rem 1rem' }}>€25</button>
                            <button onClick={() => handleDonate(5000)} disabled={loading} className="btn btn-teal" style={{ padding: '0.5rem 1rem' }}>€50</button>
                            <button onClick={() => handleDonate(10000)} disabled={loading} className="btn btn-dark" style={{ padding: '0.5rem 1rem' }}>€100</button>
                        </div>
                        {loading && <p style={{ marginTop: '1rem', color: 'var(--teal)', fontWeight: 600 }}>Even geduld A.U.B...</p>}
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
                        <p style={{ marginBottom: '3rem', marginTop: '1rem' }}>Neem SVDNEB op in uw testament en laat een blijvende erfenis achter voor missiewerk wereldwijd.</p>
                        <button className="btn btn-dark" style={{ marginTop: 'auto', width: '100%' }}>Lees Meer</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SteunOns;
