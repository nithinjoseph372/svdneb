import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-v2">
            <div className="container footer-container">

                <div className="footer-col brand-col">
                    <Link to="/" className="brand-v2">
                        <Globe className="brand-logo" size={40} />
                        <div className="brand-text">
                            <span>SVD NEB</span>
                            <small>Provincie</small>
                        </div>
                    </Link>
                    <p className="footer-desc">
                        SOCIETAS VERBI DIVINI<br />
                        Een internationale missiecongregatie van priesters en broeders uit 70 landen, gedreven door Gods liefde.
                    </p>
                </div>

                <div className="footer-col links-col">
                    <h4 className="footer-heading">Navigatie<span className="heading-dot-gold"></span></h4>
                    <ul>
                        <li><Link to="/over-ons">Over ons</Link></li>
                        <li><Link to="/communiteiten">Communiteiten</Link></li>
                        <li><Link to="/apostolaat">SVD Apostolaat</Link></li>
                        <li><Link to="/nieuws">Nieuws & Blog</Link></li>
                        <li><Link to="/steun-ons">Steun ons</Link></li>
                    </ul>
                </div>

                <div className="footer-col contact-col">
                    <h4 className="footer-heading">Neem Contact Op<span className="heading-dot-gold"></span></h4>
                    <p>
                        <strong>Provincialate SVD</strong><br />
                        Laan der Continenten 8<br />
                        4847 DG Teteringen<br />
                        Nederland
                    </p>
                    <p className="contact-details">
                        <a href="tel:+310765733433">+31 (0)76 573 34 33</a><br />
                        <a href="mailto:info@svdneb.nl">info@svdneb.nl</a>
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} SVD NEB Provincie. Alle rechten voorbehouden.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
