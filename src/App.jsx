import React, { useState, useRef, useEffect } from 'react';
import { languagesData, getLanguageById, getLanguagesByProvince, searchLanguages, getAllProvinces } from './data/languages';
import { indonesiaProvincePaths, indonesiaProvinceCenters, mapViewBox } from './data/indonesia-map';
import './App.css';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchInputRef = useRef(null);

  const provinces = getAllProvinces();

  const handleProvinceClick = (provinceName) => {
    const languages = getLanguagesByProvince(provinceName);
    if (languages.length === 1) {
      setSelectedLanguage(languages[0]);
      setSelectedProvince(provinceName);
    } else if (languages.length > 1) {
      setSelectedProvince(provinceName);
      setSelectedLanguage(languages[0]);
    } else {
      setSelectedProvince(provinceName);
      setSelectedLanguage(null);
    }
    setShowSearchResults(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setSelectedProvince(language.province);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = searchLanguages(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length >= 2) {
      setShowSearchResults(true);
    }
  };

  const hasLanguageData = (provinceName) => {
    const languages = getLanguagesByProvince(provinceName);
    return languages.length > 0;
  };

  const getProvincePath = (provinceName) => {
    return indonesiaProvincePaths[provinceName] || '';
  };

  const getProvinceCenter = (provinceName) => {
    return indonesiaProvinceCenters[provinceName] || null;
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Jelajah Bahasa Daerah Indonesia</h1>
          <p className="header-subtitle">
            Temukan keanekaragaman bahasa di 38 provinsi — 35+ bahasa utama dengan sejarah, budaya, dan warisan leluhur
          </p>
        </div>
      </header>

      <main className="main-content">
        <div className="map-section">
          <div className="map-container">
            <div className="map-wrapper">
              <svg
                className="indonesia-map"
                viewBox={mapViewBox}
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Peta interaktif provinsi Indonesia"
              >
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e3a5f" floodOpacity="0.15"/>
                  </filter>
                  <filter id="water" x="-50%" y="-50%" width="200%" height="200%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
                    <feGaussianBlur stdDeviation="0.5"/>
                  </filter>
                  <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#c8e0f0;stop-opacity:0.6" />
                    <stop offset="50%" style="stop-color:#a8d0e8;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#88c0e0;stop-opacity:0.4" />
                  </linearGradient>
                  <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#2d5a8a;stop-opacity:0.2" />
                    <stop offset="100%" style="stop-color:#1e3a5f;stop-opacity:0.15" />
                  </linearGradient>
                </defs>

                {/* Background ocean */}
                <rect x="0" y="0" width="1600" height="900" fill="url(#oceanGradient)" filter="url(#water)"/>

                {provinces.map((province) => {
                  const path = getProvincePath(province);
                  const center = getProvinceCenter(province);
                  const hasData = hasLanguageData(province);
                  const isActive = selectedProvince === province;
                  const languages = getLanguagesByProvince(province);

                  if (!path) return null;

                  return (
                    <g
                      key={province}
                      cursor="pointer"
                      onClick={() => handleProvinceClick(province)}
                      onKeyDown={(e) => e.key === 'Enter' && handleProvinceClick(province)}
                      tabIndex="0"
                      role="button"
                      aria-label={province}
                      aria-pressed={isActive}
                    >
                      <path
                        className={`province-path ${hasData ? 'has-data' : ''} ${isActive ? 'active' : ''}`}
                        d={path}
                        filter="url(#shadow)"
                        aria-label={province}
                      />
                      {center && (
                        <text
                          className="province-label"
                          x={center.x}
                          y={center.y}
                          aria-hidden="true"
                        >
                          {province.length > 18 ? province.replace(' ', '\n') : province}
                        </text>
                      )}
                    </g>
                  );
                })}

                {selectedProvince && getProvinceCenter(selectedProvince) && (
                  <circle
                    cx={getProvinceCenter(selectedProvince).x}
                    cy={getProvinceCenter(selectedProvince).y}
                    r="22"
                    fill="none"
                    stroke="#e8a838"
                    strokeWidth="3"
                    strokeDasharray="8 5"
                    className="pulse-ring"
                    aria-hidden="true"
                  />
                )}
              </svg>

              <div className="map-legend" role="legend" aria-label="Legenda peta">
                <div className="legend-item">
                  <div className="legend-color has-language" aria-hidden="true"></div>
                  <span>Provinsi dengan data bahasa</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color selected" aria-hidden="true"></div>
                  <span>Provinsi terpilih</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ background: 'transparent', borderColor: '#e0d8cc' }} aria-hidden="true"></div>
                  <span>Belum tersedia data</span>
                </div>
              </div>
            </div>
          </div>

          <div className="search-container" style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
            <input
              ref={searchInputRef}
              type="search"
              className="search-input"
              placeholder="Cari bahasa, provinsi, atau suku... (min. 2 huruf)"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              aria-label="Cari bahasa daerah"
              aria-expanded={showSearchResults}
              aria-controls="search-results"
              autoComplete="off"
            />
            {showSearchResults && searchResults.length > 0 && (
              <ul id="search-results" className="search-results" role="listbox" aria-label="Hasil pencarian">
                {searchResults.slice(0, 10).map((lang) => (
                  <li key={lang.id} className="search-result-item" role="option" onClick={() => handleLanguageSelect(lang)}>
                    <strong>{lang.name}</strong> ({lang.nativeName}) — {lang.province}
                  </li>
                ))}
              </ul>
            )}
            {showSearchResults && searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="search-no-results">Tidak ditemukan bahasa untuk "{searchQuery}"</div>
            )}
          </div>

          <div className={`info-panel ${!selectedLanguage ? 'empty' : ''}`} role="region" aria-label="Informasi bahasa" aria-live="polite">
            {!selectedLanguage ? (
              <div className="info-panel-empty">
                <svg className="empty-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <circle cx="32" cy="32" r="28" stroke="#1e3a5f" strokeOpacity="0.2" strokeWidth="2"/>
                  <path d="M32 16 L32 28 M22 32 L42 32 M32 36 L32 48" stroke="#1e3a5f" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="32" cy="46" r="2" fill="#1e3a5f" opacity="0.3"/>
                </svg>
                <h3 className="empty-title">Klik provinsi di peta</h3>
                <p className="empty-text">
                  Pilih salah satu provinsi pada peta di atas untuk menampilkan informasi bahasa daerahnya.
                  Anda juga bisa menggunakan pencarian di atas untuk menemukan bahasa tertentu.
                </p>
              </div>
            ) : (
              <div className="info-panel-content">
                <div className="language-header">
                  <div className="language-flag" aria-hidden="true">
                    {selectedLanguage.name.charAt(0)}
                  </div>
                  <div className="language-meta">
                    <h2 className="language-name">{selectedLanguage.name}</h2>
                    <p className="language-native">Nama asli: <strong>{selectedLanguage.nativeName}</strong></p>
                    <div className="language-region">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>{selectedLanguage.province}, {selectedLanguage.region}</span>
                    </div>
                    <span className="language-family">{selectedLanguage.family}</span>
                  </div>
                  <div className="language-stats">
                    <div className="stat">
                      <span className="stat-label">Penutur</span>
                      <span className="stat-value">{selectedLanguage.speakers}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Status</span>
                      <span className="stat-value" style={{fontSize:'0.9rem',fontWeight:'500'}}>{selectedLanguage.status}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Tulisan</span>
                      <span className="stat-value" style={{fontSize:'0.9rem',fontWeight:'500'}}>{selectedLanguage.writingSystem}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Kode ISO</span>
                      <span className="stat-value" style={{fontFamily:'monospace',fontSize:'0.9rem'}}>{selectedLanguage.isoCode}</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3 className="section-title">Sejarah & Asal Usul</h3>
                  <div className="section-content">
                    {selectedLanguage.history.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="info-section">
                  <h3 className="section-title">Dialek & Variasi</h3>
                  <div className="section-content">
                    <ul>
                      {selectedLanguage.dialects.map((dialect, i) => (
                        <li key={i}>{dialect}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="info-section">
                  <h3 className="section-title">Bahasa Terkait</h3>
                  <div className="section-content">
                    <div className="related-languages">
                      {selectedLanguage.relatedLanguages.map((lang, i) => (
                        <span key={i} className="related-tag">{lang}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            Data bersumber dari Ethnologue, Pusat Bahasa (Kemendikbud), dan penelitian linguistik terbaru.
            Jumlah penutur bersifat estimasi dan dapat berubah.
          </p>
          <div className="footer-links">
            <a href="https://www.ethnologue.com/country/ID" target="_blank" rel="noopener noreferrer" className="footer-link">Ethnologue Indonesia</a>
            <a href="https://www.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="footer-link">Kemendikbud RI</a>
            <a href="https://www.unesco.org/languages-atlas/" target="_blank" rel="noopener noreferrer" className="footer-link">UNESCO Atlas of Languages</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;