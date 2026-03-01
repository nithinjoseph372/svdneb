import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Subpage.css';

const Contact = () => {
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

                    <div className="contact-form-v2">
                        <h2>STUUR EEN <span className="text-teal">BERICHT</span><span className="heading-dot-gold"></span></h2>
                        <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: '2rem' }}>
                            <div className="form-group">
                                <label htmlFor="name">Uw Naam</label>
                                <input type="text" id="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mailadres</label>
                                <input type="email" id="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Onderwerp</label>
                                <input type="text" id="subject" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Uw Bericht</label>
                                <textarea id="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-dark" style={{ width: '100%' }}>Verstuur Bericht</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
