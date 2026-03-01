import React, { useState, useEffect } from 'react';
import { getGallery } from '../store/dataStore';
import './Subpage.css';

const Galerij = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGallery().then(data => {
            setImages(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-nieuws-v2"> {/* Reusing news banner background for now */}
                <div className="container">
                    <h1 className="animate-fade-in">FOTO<span className="text-teal">GALERIJ</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">Een visuele blik op ons werk en gemeenschap</p>
                </div>
            </div>

            <div className="container subpage-content-v2">

                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                    <h2>ONZE <span className="text-teal">MOMENTEN</span><span className="heading-dot"></span></h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--dark-grey)' }}>
                        Bekijk afbeeldingen van onze kloosters, missies en evenementen.
                    </p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>Afbeeldingen laden...</div>
                ) : (
                    <div className="gallery-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {images.map(img => (
                            <div key={img.id} style={{
                                position: 'relative',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-md)',
                                aspectRatio: '4/3',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease'
                            }}
                                className="gallery-item-hover"
                            >
                                <img
                                    src={`http://localhost:3000${img.image_url}`}
                                    alt={img.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                    color: 'white',
                                    padding: '1.5rem',
                                    transform: 'translateY(100%)',
                                    transition: 'transform 0.3s ease'
                                }}
                                    className="gallery-caption"
                                >
                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{img.title || 'Galerij Afbeelding'}</h4>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                                        {new Date(img.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {images.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '12px', color: 'var(--dark-grey)' }}>
                                Er zijn momenteel geen afbeeldingen in de galerij.
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .gallery-item-hover:hover img {
                    transform: scale(1.05);
                }
                .gallery-item-hover:hover .gallery-caption {
                    transform: translateY(0);
                }
            `}} />
        </div>
    );
};

export default Galerij;
