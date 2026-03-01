import React, { useState, useEffect, useRef } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../../store/dataStore';

const AdminGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [title, setTitle] = useState('');

    const fetchImages = async () => {
        setLoading(true);
        const data = await getGallery();
        setImages(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = fileInputRef.current?.files[0];
        if (!file) return alert('Selecteer eerst een afbeelding.');

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);

        setUploading(true);
        const success = await uploadGalleryImage(formData);
        setUploading(false);

        if (success) {
            setTitle('');
            if (fileInputRef.current) fileInputRef.current.value = '';
            fetchImages();
        } else {
            alert('Er is een fout opgetreden bij het uploaden.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Weet u zeker dat u deze afbeelding wilt verwijderen?')) {
            await deleteGalleryImage(id);
            fetchImages();
        }
    };

    if (loading) return <div>Laden...</div>;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2>Foto<span className="text-teal">galerij</span><span className="heading-dot-gold"></span></h2>
                <p style={{ color: 'var(--dark-grey)' }}>Beheer afbeeldingen voor de Galerij pagina.</p>
            </div>

            {/* Upload Form */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', marginBottom: '3rem', borderTop: '4px solid var(--teal)' }}>
                <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ImagePlus size={20} className="text-teal" /> Nieuwe Afbeelding Uploaden
                </h3>
                <form onSubmit={handleUpload} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 2fr) auto', gap: '1rem', alignItems: 'end', marginTop: '1.5rem' }}>

                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                        <label>Titel / Beschrijving</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bijv. Klooster Teteringen" required />
                    </div>

                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                        <label>Afbeelding Bestand (JPEG/PNG)</label>
                        <input type="file" ref={fileInputRef} accept="image/*" required style={{ border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px', width: '100%', background: 'var(--light-grey)' }} />
                    </div>

                    <button type="submit" className="btn btn-teal" disabled={uploading} style={{ padding: '0.8rem 2rem', height: 'max-content' }}>
                        {uploading ? 'Uploaden...' : 'Uploaden'}
                    </button>
                </form>
            </div>

            {/* Image Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {images.map(img => (
                    <div key={img.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
                        <div style={{ height: '200px', width: '100%', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                            <img
                                src={`http://localhost:3000${img.image_url}`}
                                alt={img.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: 0 }}>{img.title}</h4>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--dark-grey)' }}>{new Date(img.timestamp).toLocaleDateString()}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(img.id)}
                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '4px' }}
                                title="Verwijderen"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
                {images.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--dark-grey)', background: 'white', borderRadius: '12px' }}>
                        Er zijn nog geen afbeeldingen in de galerij.
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminGallery;
