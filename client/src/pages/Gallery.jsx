import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGallery } from '../services/api';
import usePluginInit from '../hooks/usePluginInit';

const Gallery = () => {
  usePluginInit();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await fetchGallery();
        setGalleryItems(res.data || []);
      } catch (err) {
        console.error(err);
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  return (
    <main>
      <a href="#" id="back-to-top"></a>

      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/luxury_interior_hero.png" className="jarallax-img" alt="Gallery" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Gallery</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">Gallery</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                Explore a visual showcase of our premium custom constructions, architectural designs, and turnkey interiors.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Gallery Grid */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3">Loading gallery...</p>
            </div>
          ) : (
            <div className="row g-4">
              {galleryItems.map((item, i) => (
                <div key={item.id || i} className="col-lg-4 col-md-6">
                  <div 
                    onClick={() => setSelectedImage(item)} 
                    className="hover relative overflow-hidden rounded-1 group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-1 wow scaleIn" data-wow-delay={`${i * 0.1}s`}>
                      <img src={item.img} className="w-100 hover-scale-1-2 transition-transform duration-500" alt={item.title} style={{ height: '260px', objectFit: 'cover' }} />
                      <div className="abs top-0 start-0 w-100 h-100 bg-dark hover-op-6 transition-all duration-300 d-flex flex-column justify-content-end p-4 text-light z-2">
                        <div className="bg-blur p-2 align-self-start mb-2 text-uppercase fs-11 tracking-wide">{item.category}</div>
                        <h3 className="fs-20 mb-0 font-semibold">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="gallery-lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <button className="gallery-lightbox-close" onClick={() => setSelectedImage(null)}>&times;</button>
          
          <button 
            className="gallery-lightbox-prev" 
            onClick={(e) => { 
              e.stopPropagation(); 
              const currentIndex = galleryItems.findIndex(x => x.id === selectedImage.id);
              const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
              setSelectedImage(galleryItems[prevIndex]);
            }}
          >
            &#10094;
          </button>

          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.img} alt={selectedImage.title} />
            {selectedImage.title && (
              <div className="gallery-lightbox-caption text-center mt-3">
                <span className="badge bg-blur text-uppercase fs-10 tracking-wide mb-1" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(5px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>{selectedImage.category}</span>
                <h4 className="fs-18 mb-0 text-white font-semibold">{selectedImage.title}</h4>
              </div>
            )}
          </div>

          <button 
            className="gallery-lightbox-next" 
            onClick={(e) => { 
              e.stopPropagation(); 
              const currentIndex = galleryItems.findIndex(x => x.id === selectedImage.id);
              const nextIndex = (currentIndex + 1) % galleryItems.length;
              setSelectedImage(galleryItems[nextIndex]);
            }}
          >
            &#10095;
          </button>
        </div>
      )}

      {/* Lightbox Styles */}
      <style>{`
        .gallery-lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(10, 8, 6, 0.95);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          transition: all 0.3s ease;
        }

        .gallery-lightbox-content {
          max-width: 85%;
          max-height: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: zoomIn 0.3s ease;
        }

        .gallery-lightbox-content img {
          max-width: 100%;
          max-height: 75vh;
          object-fit: contain;
          border-radius: 8px;
          border: 1px solid rgba(195, 175, 155, 0.2);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .gallery-lightbox-close {
          position: absolute;
          top: 30px;
          right: 30px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 40px;
          cursor: pointer;
          transition: color 0.2s ease;
          z-index: 1000001;
        }
        .gallery-lightbox-close:hover {
          color: #fff;
        }

        .gallery-lightbox-prev, .gallery-lightbox-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 24px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          user-select: none;
          z-index: 1000002;
        }

        .gallery-lightbox-prev {
          left: 40px;
        }

        .gallery-lightbox-next {
          right: 40px;
        }

        .gallery-lightbox-prev:hover, .gallery-lightbox-next:hover {
          background: var(--primary-color);
          border-color: var(--primary-color);
          box-shadow: 0 0 15px rgba(195, 175, 155, 0.4);
        }

        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 768px) {
          .gallery-lightbox-prev { left: 15px; width: 40px; height: 40px; font-size: 18px; }
          .gallery-lightbox-next { right: 15px; width: 40px; height: 40px; font-size: 18px; }
          .gallery-lightbox-close { top: 15px; right: 15px; font-size: 32px; }
          .gallery-lightbox-content { max-width: 90%; }
          .gallery-lightbox-content img { max-height: 60vh; }
        }
      `}</style>
    </main>
  );
};

export default Gallery;

