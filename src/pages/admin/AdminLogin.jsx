import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../store/dataStore';
import { AlertCircle, Lock } from 'lucide-react';
import './AdminAuth.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const success = await loginAdmin(username, password);
        if (success) {
            navigate('/admin');
        } else {
            setError('Onjuiste inloggegevens. Gebruik admin / admin123 voor deze demo.');
        }
    };

    return (
        <div className="admin-login-layout">
            <div className="login-card">
                <div className="login-header">
                    <Lock size={40} className="lock-icon" />
                    <h2>ADMIN<span className="text-teal"> LOGIN</span><span className="heading-dot-gold"></span></h2>
                    <p>Beheerders paneel voor svdneb.nl</p>
                </div>

                {error && (
                    <div className="login-error">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Gebruikersnaam</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Bijv: admin"
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Wachtwoord</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '1rem' }}>
                        Inloggen
                    </button>
                </form>

                <div className="login-footer">
                    <p>Demo Credentials: <strong>admin</strong> / <strong>admin123</strong></p>
                    <a href="/" style={{ color: 'var(--teal)', fontSize: '0.9rem' }}>Terug naar de website</a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
