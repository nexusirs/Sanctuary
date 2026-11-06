import React, { useState, useRef, useEffect } from 'react';
import { languagesData, getLanguageById, getLanguagesByProvince, searchLanguages, getAllProvinces } from './data/languages';
import './App.css';

// More accurate province centers and paths based on actual Indonesian geography
// ViewBox: 0 0 1400 800 (wider to accommodate full Indonesia width)
const provinceCenters = {
  'Aceh': { x: 120, y: 150 },
  'Sumatera Utara': { x: 240, y: 240 },
  'Sumatera Barat': { x: 280, y: 320 },
  'Riau': { x: 350, y: 260 },
  'Kepulauan Riau': { x: 400, y: 220 },
  'Jambi': { x: 380, y: 340 },
  'Sumatera Selatan': { x: 420, y: 380 },
  'Bengkulu': { x: 360, y: 420 },
  'Lampung': { x: 450, y: 400 },
  'Bangka Belitung': { x: 470, y: 350 },
  'DKI Jakarta': { x: 560, y: 420 },
  'Jawa Barat': { x: 570, y: 400 },
  'Jawa Tengah': { x: 650, y: 420 },
  'DI Yogyakarta': { x: 670, y: 435 },
  'Jawa Timur': { x: 730, y: 440 },
  'Banten': { x: 540, y: 415 },
  'Bali': { x: 770, y: 460 },
  'Nusa Tenggara Barat': { x: 800, y: 475 },
  'Nusa Tenggara Timur': { x: 880, y: 490 },
  'Kalimantan Barat': { x: 420, y: 200 },
  'Kalimantan Tengah': { x: 580, y: 320 },
  'Kalimantan Selatan': { x: 550, y: 340 },
  'Kalimantan Timur': { x: 700, y: 240 },
  'Kalimantan Utara': { x: 630, y: 180 },
  'Sulawesi Utara': { x: 890, y: 330 },
  'Gorontalo': { x: 850, y: 370 },
  'Sulawesi Tengah': { x: 870, y: 400 },
  'Sulawesi Barat': { x: 820, y: 440 },
  'Sulawesi Selatan': { x: 900, y: 480 },
  'Sulawesi Tenggara': { x: 950, y: 470 },
  'Maluku': { x: 1100, y: 520 },
  'Maluku Utara': { x: 1050, y: 440 },
  'Papua': { x: 1250, y: 460 },
  'Papua Pegunungan': { x: 1200, y: 520 },
  'Papua Selatan': { x: 1230, y: 580 },
  'Papua Barat': { x: 1180, y: 420 },
  'Papua Barat Daya': { x: 1210, y: 540 },
};

// More accurate SVG paths for Indonesian provinces
// Based on actual geographic boundaries, scaled to fit viewBox
const provincePaths = {
  // SUMATERA & KEPULAUAN
  'Aceh': 'M50,80 L180,70 L200,130 L190,190 L140,210 L90,200 L60,160 L40,120 Z',
  'Sumatera Utara': 'M180,70 L320,90 L350,160 L360,240 L320,270 L260,280 L200,220 L180,130 Z',
  'Sumatera Barat': 'M260,280 L330,260 L360,330 L350,390 L300,410 L250,380 Z',
  'Riau': 'M320,160 L420,160 L450,220 L460,280 L420,310 L360,330 L330,260 Z',
  'Kepulauan Riau': 'M380,140 L460,140 L480,200 L460,250 L420,250 L380,220 Z',
  'Jambi': 'M360,310 L440,310 L460,370 L420,410 L350,400 Z',
  'Sumatera Selatan': 'M420,340 L510,330 L530,400 L470,430 L400,400 Z',
  'Bengkulu': 'M340,380 L410,380 L420,460 L350,480 Z',
  'Lampung': 'M450,370 L520,370 L540,430 L470,450 Z',
  'Bangka Belitung': 'M460,320 L530,320 L540,380 L470,400 Z',

  // JAWA & BALI
  'DKI Jakarta': 'M520,400 L560,400 L570,440 L530,450 Z',
  'Jawa Barat': 'M500,370 L590,360 L600,420 L570,450 L520,420 Z',
  'Jawa Tengah': 'M580,390 L680,390 L690,460 L650,470 L600,440 Z',
  'DI Yogyakarta': 'M650,420 L680,420 L690,450 L660,460 Z',
  'Jawa Timur': 'M680,400 L780,400 L790,480 L730,500 L690,460 Z',
  'Banten': 'M500,390 L540,390 L550,430 L510,440 Z',
  'Bali': 'M750,430 L790,430 L800,480 L760,480 Z',
  'Nusa Tenggara Barat': 'M780,450 L850,450 L860,500 L800,510 Z',
  'Nusa Tenggara Timur': 'M850,460 L950,460 L960,520 L860,530 Z',

  // KALIMANTAN
  'Kalimantan Barat': 'M360,130 L490,130 L510,220 L460,250 L390,230 Z',
  'Kalimantan Tengah': 'M460,220 L620,220 L650,340 L530,380 L460,280 Z',
  'Kalimantan Selatan': 'M480,280 L570,280 L580,360 L510,380 Z',
  'Kalimantan Timur': 'M580,150 L740,150 L760,280 L640,340 L590,250 Z',
  'Kalimantan Utara': 'M550,110 L650,110 L670,180 L580,160 Z',

  // SULAWESI
  'Sulawesi Utara': 'M820,280 L950,280 L960,370 L880,390 Z',
  'Gorontalo': 'M790,340 L870,340 L880,410 L800,430 Z',
  'Sulawesi Tengah': 'M810,370 L920,370 L930,450 L840,470 Z',
  'Sulawesi Barat': 'M770,410 L850,410 L860,490 L780,520 Z',
  'Sulawesi Selatan': 'M830,450 L960,450 L970,550 L880,580 L830,520 Z',
  'Sulawesi Tenggara': 'M910,440 L990,440 L1000,530 L920,540 Z',

  // MALUKU
  'Maluku': 'M1030,480 L1160,480 L1170,570 L1040,590 Z',
  'Maluku Utara': 'M980,400 L1080,400 L1090,480 L990,500 Z',

  // PAPUA (larger area, more detail)
  'Papua': 'M1150,380 L1380,380 L1400,540 L1180,580 Z',
  'Papua Pegunungan': 'M1120,500 L1250,500 L1270,600 L1130,630 Z',
  'Papua Selatan': 'M1160,550 L1320,550 L1330,650 L1170,680 Z',
  'Papua Barat': 'M1120,360 L1250,360 L1260,450 L1130,470 Z',
  'Papua Barat Daya': 'M1180,510 L1280,510 L1290,590 L1190,610 Z',
};

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
    return provincePaths[provinceName] || '';
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
                viewBox="0 0 1450 800"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Peta interaktif provinsi Indonesia"
              >
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e3a5f" floodOpacity="0.15"/>
                  </filter>
                  <filter id="water" x="-50%" y="-50%" width="200%" height="200%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                  </filter>
                </defs>

                {/* Background water */}
                <rect x="0" y="0" width="1450" height="800" fill="#e8f0f8" filter="url(#water)" opacity="0.3"/>

                {provinces.map((province) => {
                  const path = getProvincePath(province);
                  const center = provinceCenters[province];
                  const hasData = hasLanguageData(province);
                  const isActive = selectedProvince === province;
                  const languages = getLanguagesByProvince(province);

                  if (!path) return null;

                  return (
                    <g key={province} cursor="pointer" onClick={() => handleProvinceClick(province)} onKeyDown={(e) => e.key === 'Enter' && handleProvinceClick(province)} tabIndex="0" role="button" aria-label={province} aria-pressed={isActive}>
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

                {selectedProvince && provinceCenters[selectedProvince] && (
                  <circle
                    cx={provinceCenters[selectedProvince].x}
                    cy={provinceCenters[selectedProvince].y}
                    r="20"
                    fill="none"
                    stroke="#e8a838"
                    strokeWidth="3"
                    strokeDasharray="6 4"
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

      <style jsx>{`
        .search-container {
          margin: 1rem auto;
        }
        .search-input {
          width: 100%;
          padding: 0.875rem 1.25rem;
          font-size: 1rem;
          border: 2px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface);
          color: var(--text-primary);
          transition: all var(--transition-fast);
          box-shadow: 0 2px 8px var(--shadow);
        }
        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 4px 16px var(--shadow);
        }
        .search-input::placeholder {
          color: var(--text-muted);
        }
        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 24px var(--shadow);
          list-style: none;
          max-height: 300px;
          overflow-y: auto;
          z-index: 100;
          animation: slideDown var(--transition-fast) ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .search-result-item {
          padding: 0.875rem 1.25rem;
          cursor: pointer;
          border-bottom: 1px solid var(--border);
          transition: background var(--transition-fast);
          color: var(--text-primary);
        }
        .search-result-item:last-child { border-bottom: none; }
        .search-result-item:hover { background: var(--surface-hover); }
        .search-result-item strong { color: var(--primary); }
        .search-no-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 0.5rem;
          padding: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 24px var(--shadow);
          color: var(--text-muted);
          text-align: center;
        }
        .info-panel-content { animation: fadeIn var(--transition-normal) ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .language-native { color: var(--text-secondary); margin-top: 0.25rem; }
        .language-native strong { color: var(--primary); }
        .pulse-ring { animation: pulse 2s ease-out infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
      `}</style>
    </div>
  );
}

export default App;