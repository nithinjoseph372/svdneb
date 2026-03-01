import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, FileText, Settings, Home as HomeIcon, Users, MessageSquare, CreditCard, Image as ImageIcon } from 'lucide-react';
import { logoutAdmin, isAuthenticated } from '../../store/dataStore';
import AdminNews from './AdminNews';
import AdminUsers from './AdminUsers';
import AdminContacts from './AdminContacts';
import AdminDonations from './AdminDonations';
import AdminPages from './AdminPages';
import AdminGallery from './AdminGallery';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        logoutAdmin();
        navigate('/admin/login');
    };

    if (!isAuthenticated()) return null; // Prevent flash of content

    return (
        <div className="admin-wrapper">
            <aside className="admin-sidebar" style={{ backgroundColor: 'var(--black)', color: 'white', minHeight: '100vh', width: '280px', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div className="admin-brand" style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--white)', margin: 0 }}>
                        SVD <span className="text-teal">ADMIN</span><span className="heading-dot-gold" style={{ marginLeft: '2px' }}></span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Beheerders Paneel</p>
                </div>

                <nav className="admin-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link to="/admin" className={`admin-nav-link ${location.pathname === '/admin' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'var(--transition)' }}>
                        <LayoutDashboard size={20} />
                        <span style={{ fontWeight: 600 }}>Dashboard</span>
                    </Link>
                    <Link to="/admin/nieuws" className={`admin-nav-link ${location.pathname.includes('/admin/nieuws') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'var(--transition)' }}>
                        <FileText size={20} />
                        <span style={{ fontWeight: 600 }}>Nieuws & Blog</span>
                    </Link>
                    <Link to="/admin/users" className={`admin-nav-link ${location.pathname.includes('/admin/users') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'var(--transition)' }}>
                        <Users size={20} />
                        <span style={{ fontWeight: 600 }}>Gebruikers</span>
                    </Link>
                    <Link to="/admin/contacts" className={`admin-nav-link ${location.pathname.includes('/admin/contacts') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'var(--transition)' }}>
                        <MessageSquare size={20} />
                        <span style={{ fontWeight: 600 }}>Contactberichten</span>
                    </Link>
                    <Link to="/admin/donations" className={`admin-nav-link ${location.pathname.includes('/admin/donations') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'var(--transition)' }}>
                        <CreditCard size={20} />
                        <span style={{ fontWeight: 600 }}>Donaties</span>
                    </Link>
                    <Link to="/admin/gallery" className={`admin-nav-link ${location.pathname.includes('/admin/gallery') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'var(--transition)' }}>
                        <ImageIcon size={20} />
                        <span style={{ fontWeight: 600 }}>Foto Galerij</span>
                    </Link>
                    <Link to="/admin/pages" className={`admin-nav-link ${location.pathname.includes('/admin/pages') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'var(--transition)' }}>
                        <Settings size={20} />
                        <span style={{ fontWeight: 600 }}>Pagina Teksten</span>
                    </Link>

                    <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <a href="/" target="_blank" className="admin-nav-link" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: 'rgba(255,255,255,0.7)', borderRadius: '8px' }}>
                            <HomeIcon size={20} />
                            <span style={{ fontWeight: 600 }}>Bekijk Website</span>
                        </a>
                        <button onClick={handleLogout} className="admin-nav-link" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: '#ef4444', background: 'none', border: 'none', width: '100%', cursor: 'pointer', borderRadius: '8px', textAlign: 'left' }}>
                            <LogOut size={20} />
                            <span style={{ fontWeight: 600 }}>Uitloggen</span>
                        </button>
                    </div>
                </nav>
            </aside>

            <main className="admin-main-content" style={{ flex: 1, backgroundColor: 'var(--light-grey)', minHeight: '100vh', padding: '3rem 4rem' }}>
                <Routes>
                    <Route path="/" element={<AdminDashboardHome />} />
                    <Route path="/nieuws" element={<AdminNews />} />
                    <Route path="/users" element={<AdminUsers />} />
                    <Route path="/contacts" element={<AdminContacts />} />
                    <Route path="/donations" element={<AdminDonations />} />
                    <Route path="/gallery" element={<AdminGallery />} />
                    <Route path="/pages" element={<AdminPages />} />
                </Routes>
            </main>
        </div>
    );
};

// Simplified dashboard landing
const AdminDashboardHome = () => (
    <div className="admin-dashboard">
        <div style={{ marginBottom: '3rem' }}>
            <h1>Welkom Terug, <span className="text-teal">Admin</span><span className="heading-dot-gold"></span></h1>
            <p style={{ color: 'var(--dark-grey)' }}>Kies in het linkermenu welk onderdeel u wilt bewerken.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--teal)' }}>
                <h3 style={{ marginBottom: '1rem' }}>Nieuws & Blog Beheren<span className="heading-dot"></span></h3>
                <p style={{ color: 'var(--dark-grey)', marginBottom: '2rem' }}>Voeg nieuwe artikelen toe, of bewerk/verwijder bestaande artikelen. Deze worden direct op de website getoond.</p>
                <Link to="/admin/nieuws" className="btn btn-dark" style={{ padding: '0.8rem 1.5rem', fontSize: '0.8rem' }}>Beheer Nieuws</Link>
            </div>
        </div>
    </div>
);

export default AdminLayout;
