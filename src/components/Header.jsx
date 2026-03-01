import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Over ons', path: '/over-ons' },
        { name: 'Communiteiten', path: '/communiteiten' },
        { name: 'Apostolaat', path: '/apostolaat' },
        { name: 'Nieuws', path: '/nieuws' },
        { name: 'Steun ons', path: '/steun-ons' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <header className={`header-v2 ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <Link to="/" className="brand-v2">
                    <Globe className="brand-logo" size={40} />
                    <div className="brand-text">
                        <span>SVD NEB</span>
                        <small>Provincie</small>
                    </div>
                </Link>

                {/* Desktop Nav - Minimalist */}
                <nav className="desktop-nav-v2">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={location.pathname === link.path ? 'active' : ''}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* "Donate" CTA in header common for NGO sites */}
                <div className="header-actions">
                    <Link to="/steun-ons" className="btn btn-teal header-btn">Doneer<span className="heading-dot-gold" style={{ marginLeft: '2px' }}></span></Link>
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            {/* Full Screen Overlay Menu for Mobile */}
            <div className={`mobile-overlay-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="menu-inner">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={location.pathname === link.path ? 'active' : ''}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
