import React, { useState, useEffect } from 'react';
import { getPageContent, savePageContent } from '../../store/dataStore';
import { Save } from 'lucide-react';

const AdminPages = () => {
    const [selectedPage, setSelectedPage] = useState('over-ons');
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchContent = async (pageId) => {
        setLoading(true);
        const data = await getPageContent(pageId);
        // Provide default empty objects if brand new
        if (Object.keys(data).length === 0) {
            if (pageId === 'over-ons') setContent({ history: '', community: '' });
            else if (pageId === 'communiteiten') setContent({ intro: '' });
        } else {
            setContent(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchContent(selectedPage);
    }, [selectedPage]);

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        await savePageContent(selectedPage, content);
        setSaving(false);
        alert('Wijzigingen opgeslagen!');
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Pagina <span className="text-teal">Teksten</span><span className="heading-dot-gold"></span></h2>
                    <p style={{ color: 'var(--dark-grey)' }}>Bewerk teksten op de hoofdwebsite dynamisch.</p>
                </div>

                <div>
                    <select
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(e.target.value)}
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', cursor: 'pointer', background: 'white' }}
                    >
                        <option value="over-ons">Over Ons Pagina</option>
                        <option value="communiteiten">Communiteiten Pagina</option>
                    </select>
                </div>
            </div>

            <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                {loading ? <p>Laden...</p> : (
                    <form onSubmit={handleSave}>

                        {selectedPage === 'over-ons' && (
                            <>
                                <div className="admin-form-group">
                                    <label>Historie & Oorsprong</label>
                                    <textarea name="history" value={content.history || ''} onChange={handleChange} rows="6" />
                                    <small style={{ color: 'var(--dark-grey)' }}>Gevonden op de "Over Ons" pagina bovenaan.</small>
                                </div>
                                <div className="admin-form-group">
                                    <label>Onze Gemeenschap Nu</label>
                                    <textarea name="community" value={content.community || ''} onChange={handleChange} rows="6" />
                                    <small style={{ color: 'var(--dark-grey)' }}>Tekst over de huidige Nederlands-Belgische structuur.</small>
                                </div>
                            </>
                        )}

                        {selectedPage === 'communiteiten' && (
                            <>
                                <div className="admin-form-group">
                                    <label>Introductietekst</label>
                                    <textarea name="intro" value={content.intro || ''} onChange={handleChange} rows="6" />
                                    <small style={{ color: 'var(--dark-grey)' }}>De tekst die bovenaan de Communiteiten pagina verschijnt.</small>
                                </div>
                            </>
                        )}

                        <button type="submit" className="btn btn-teal" disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                            <Save size={18} /> {saving ? 'Aan het opslaan...' : 'Wijzigingen Opslaan'}
                        </button>
                    </form>
                )}
            </div>

        </div>
    );
};

export default AdminPages;
