import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import OverOns from './pages/OverOns';
import Contact from './pages/Contact';
import Communiteiten from './pages/Communiteiten';
import Apostolaat from './pages/Apostolaat';
import Nieuws from './pages/Nieuws';
import SteunOns from './pages/SteunOns';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';

import './App.css';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdminRoute && <Header />}

      <main className={!isAdminRoute ? 'main-content' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/over-ons" element={<OverOns />} />
          <Route path="/communiteiten" element={<Communiteiten />} />
          <Route path="/apostolaat" element={<Apostolaat />} />
          <Route path="/nieuws" element={<Nieuws />} />
          <Route path="/steun-ons" element={<SteunOns />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
