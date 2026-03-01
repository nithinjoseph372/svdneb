import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getNews } from '../store/dataStore';
import './Home.css';

const Home = () => {
    const [recentNews, setRecentNews] = useState([]);

    useEffect(() => {
        getNews().then(data => setRecentNews(data.slice(0, 3)));
    }, []);

    return (
        <div className="home-page-v2">
            {/* High-Impact Hero Section */}
            <section className="hero-v2">
                <div className="hero-bg-image"></div>
                <div className="hero-overlay-dark"></div>
                <div className="container hero-content-v2">
                    <h1 className="hero-title-v2 animate-fade-in">
                        WITNESS TO <br />
                        <span className="text-teal">THE WORD</span><br />
                        IN THE WORLD<span className="heading-dot-gold"></span>
                    </h1>
                    <p className="hero-subtitle-v2 delay-100 animate-fade-in">
                        De Nederlands-Belgische provincie van het Gezelschap van het Goddelijk Woord.
                        Een internationale missiecongregatie van priesters en broeders.
                    </p>
                    <div className="hero-actions delay-200 animate-fade-in">
                        <Link to="/over-ons" className="btn btn-teal">Ontdek Onze Missie</Link>
                    </div>
                </div>
            </section>

            {/* Massive Statement Alternating Block - White/Teal emphasis */}
            <section className="statement-section">
                <div className="container">
                    <div className="statement-inner">
                        <h2 className="massive-heading text-center">
                            IN THE FACE OF NEED, <span className="text-teal">WE ACT</span><span className="heading-dot"></span>
                        </h2>
                        <p className="statement-desc text-center">
                            Gedreven door Gods liefde brengen we hoop en vreugde aan allen die we ontmoeten, met speciale aandacht voor de gemarginaliseerden. We delen het Evangelie door woord en daad wereldwijd.
                        </p>
                    </div>
                </div>
            </section>

            {/* 50/50 Split Sections (Signature svdmissions style) */}
            <section className="split-section dark-split">
                <div className="split-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548625361-ec853f7c3c54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}></div>
                <div className="split-content">
                    <div className="split-content-inner">
                        <h3 className="split-title">ONZE <span className="text-teal">GEMEENSCHAP</span><span className="heading-dot-gold"></span></h3>
                        <p>Samen vormen we een internationale familie van geloof. We laten zien dat een multiculturele samenleving in de praktijk mogelijk is, met medebroeders uit 70 verschillende landen.</p>
                        <Link to="/communiteiten" className="btn btn-primary" style={{ marginTop: '2rem' }}>Lees Meer</Link>
                    </div>
                </div>
            </section>

            <section className="split-section light-split reverse">
                <div className="split-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}></div>
                <div className="split-content">
                    <div className="split-content-inner">
                        <h3 className="split-title">HET <span className="text-teal">WOORD</span><span className="heading-dot"></span></h3>
                        <p>Het Goddelijk Woord staat centraal in al onze activiteiten. Door Bijbelstudie, gebed en apostolaat vinden we de kracht voor onze wereldwijde missie.</p>
                        <div className="quote-box-mini">
                            <em>"Komt allen tot Mij die uitgeput zijt en onder lasten gebukt..."</em> <br />
                            <small>- Matteüs 11:28</small>
                        </div>
                        <Link to="/apostolaat" className="btn btn-dark" style={{ marginTop: '2rem' }}>Apostolaat</Link>
                    </div>
                </div>
            </section>

            {/* Latest News Footer Banner */}
            <section className="news-banner section-dark">
                <div className="container">
                    <div className="news-banner-header">
                        <h2>LAATSTE <span className="text-teal">NIEUWS</span><span className="heading-dot-gold"></span></h2>
                        <Link to="/nieuws" className="view-all-link">Bekijk Alles <ArrowRight size={20} /></Link>
                    </div>

                    <div className="news-grid-v2">
                        {recentNews.map(item => (
                            <div key={item.id} className="news-card-v2">
                                <span className="date">{item.date}</span>
                                <h4>{item.title}</h4>
                                <Link to="/nieuws" className="card-link">Lees Artikel</Link>
                            </div>
                        ))}
                        {recentNews.length === 0 && <p className="text-teal">Nieuws wordt geladen...</p>}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
