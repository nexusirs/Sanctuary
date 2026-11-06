import React, { useState, useRef, useEffect } from 'react';
import { languagesData, getLanguageById, getLanguagesByProvince, searchLanguages, getAllProvinces } from './data/languages';
import './App.css';

const provinceCenters = {
  'Aceh': { x: 110, y: 160 },
  'Sumatera Utara': { x: 210, y: 230 },
  'Sumatera Barat': { x: 260, y: 300 },
  'Riau': { x: 320, y: 250 },
  'Kepulauan Riau': { x: 350, y: 230 },
  'Jambi': { x: 340, y: 300 },
  'Sumatera Selatan': { x: 370, y: 340 },
  'Bengkulu': { x: 350, y: 380 },
  'Lampung': { x: 400, y: 370 },
  'Bangka Belitung': { x: 410, y: 330 },
  'DKI Jakarta': { x: 510, y: 390 },
  'Jawa Barat': { x: 520, y: 380 },
  'Jawa Tengah': { x: 600, y: 400 },
  'DI Yogyakarta': { x: 620, y: 410 },
  'Jawa Timur': { x: 660, y: 420 },
  'Banten': { x: 500, y: 385 },
  'Bali': { x: 700, y: 440 },
  'Nusa Tenggara Barat': { x: 730, y: 455 },
  'Nusa Tenggara Timur': { x: 800, y: 470 },
  'Kalimantan Barat': { x: 400, y: 220 },
  'Kalimantan Tengah': { x: 550, y: 340 },
  'Kalimantan Selatan': { x: 520, y: 320 },
  'Kalimantan Timur': { x: 650, y: 280 },
  'Kalimantan Utara': { x: 600, y: 220 },
  'Sulawesi Utara': { x: 830, y: 370 },
  'Gorontalo': { x: 800, y: 400 },
  'Sulawesi Tengah': { x: 830, y: 430 },
  'Sulawesi Barat': { x: 820, y: 470 },
  'Sulawesi Selatan': { x: 860, y: 490 },
  'Sulawesi Tenggara': { x: 910, y: 480 },
  'Maluku': { x: 1050, y: 520 },
  'Maluku Utara': { x: 1000, y: 450 },
  'Papua': { x: 1200, y: 480 },
  'Papua Pegunungan': { x: 1150, y: 520 },
  'Papua Selatan': { x: 1180, y: 580 },
  'Papua Barat': { x: 1150, y: 440 },
  'Papua Barat Daya': { x: 1180, y: 540 },
};

const provincePaths = {
  'Aceh': 'M80,120 L140,120 L150,160 L140,200 L100,210 L70,190 L60,160 Z',
  'Sumatera Utara': 'M140,120 L250,130 L280,180 L290,240 L260,260 L220,250 L150,200 Z',
  'Sumatera Barat': 'M220,250 L280,240 L300,300 L290,340 L240,350 L210,300 Z',
  'Riau': 'M280,180 L360,190 L380,240 L350,280 L300,300 L280,240 Z',
  'Kepulauan Riau': 'M330,190 L380,190 L390,230 L360,250 L330,240 Z',
  'Jambi': 'M300,280 L360,280 L380,330 L340,360 L290,350 Z',
  'Sumatera Selatan': 'M340,320 L420,310 L430,360 L380,380 L330,350 Z',
  'Bengkulu': 'M300,350 L360,350 L370,410 L310,420 Z',
  'Lampung': 'M380,340 L440,340 L450,390 L400,400 Z',
  'Bangka Belitung': 'M400,310 L450,310 L460,350 L410,360 Z',
  'DKI Jakarta': 'M490,370 L520,370 L530,400 L500,410 Z',
  'Jawa Barat': 'M480,350 L550,350 L560,400 L520,420 L490,390 Z',
  'Jawa Tengah': 'M540,370 L630,370 L640,420 L600,430 L560,410 Z',
  'DI Yogyakarta': 'M610,400 L640,400 L650,420 L620,430 Z',
  'Jawa Timur': 'M630,390 L720,390 L730,450 L680,460 L640,420 Z',
  'Banten': 'M480,370 L510,370 L520,400 L490,410 Z',
  'Bali': 'M680,420 L720,420 L730,460 L690,460 Z',
  'Nusa Tenggara Barat': 'M700,440 L780,440 L790,480 L720,480 Z',
  'Nusa Tenggara Timur': 'M780,440 L880,440 L890,500 L790,500 Z',
  'Kalimantan Barat': 'M350,180 L450,180 L460,250 L400,260 L350,240 Z',
  'Kalimantan Tengah': 'M480,250 L600,250 L620,350 L520,380 L470,300 Z',
  'Kalimantan Selatan': 'M470,280 L550,280 L560,340 L500,360 Z',
  'Kalimantan Timur': 'M580,200 L700,200 L720,300 L620,350 L600,280 Z',
  'Kalimantan Utara': 'M550,180 L630,180 L650,230 L580,220 Z',
  'Sulawesi Utara': 'M780,330 L880,330 L890,400 L820,410 Z',
  'Gorontalo': 'M760,370 L830,370 L840,420 L770,430 Z',
  'Sulawesi Tengah': 'M790,400 L870,400 L880,460 L810,470 Z',
  'Sulawesi Barat': 'M770,440 L840,440 L850,500 L780,510 Z',
  'Sulawesi Selatan': 'M820,460 L920,460 L930,540 L850,550 L820,500 Z',
  'Sulawesi Tenggara': 'M880,440 L960,440 L970,520 L900,530 Z',
  'Maluku': 'M1000,490 L1100,490 L1110,560 L1010,570 Z',
  'Maluku Utara': 'M960,420 L1050,420 L1060,480 L970,480 Z',
  'Papua': 'M1120,420 L1300,420 L1320,550 L1140,570 Z',
  'Papua Pegunungan': 'M1100,490 L1200,490 L1220,580 L1120,600 Z',
  'Papua Selatan': 'M1140,550 L1250,550 L1260,630 L1150,650 Z',
  'Papua Barat': 'M1100,410 L1200,410 L1210,470 L1110,480 Z',
  'Papua Barat Daya': 'M1150,500 L1230,500 L1240,580 L1160,590 Z',
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
                viewBox="0 0 1350 700"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Peta interaktif provinsi Indonesia"
              >
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e3a5f" floodOpacity="0.15"/>
                  </filter>
                </defs>

                {provinces.map((province) => {
                  const path = getProvincePath(province);
                  const center = provinceCenters[province];
                  const hasData = hasLanguageData(province);
                  const isActive = selectedProvince === province;
                  const languages = getLanguagesByProvince(province);
                  const primaryLang = languages[0];

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
                    r="18"
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