# Jelajah Bahasa Daerah Indonesia

Website interaktif untuk menjelajahi keanekaragaman bahasa daerah di Indonesia. Dibangun untuk tujuan pendidikan bagi pelajar Indonesia.

## Fitur

- **Peta Interaktif**: Klik provinsi di peta Indonesia untuk melihat bahasa-bahasa daerahnya
- **35+ Bahasa Utama**: Mencakup bahasa utama di 38 provinsi Indonesia
- **Informasi Lengkap**: Sejarah, asal usul, dialek, jumlah penutur, sistem tulisan, dan bahasa terkait
- **Pencarian**: Cari bahasa, provinsi, atau suku dengan cepat
- **Bahasa Indonesia**: Antarmuka sepenuhnya dalam Bahasa Indonesia
- **Responsif**: Bekerja di desktop, tablet, dan mobile
- **Aksesibilitas**: Mendukung navigasi keyboard dan screen reader

## Bahasa yang Terdapat

Mencakup 35+ bahasa utama dari berbagai wilayah:
- **Sumatera**: Aceh, Batak Toba, Batak Karo, Minangkabau, Melayu Riau, Jambi, Palembang, Bengkulu, Lampung, Rejang, Kerinci, Nias, Mentawai, Enggano, Gayo, Alas
- **Jawa**: Sunda, Jawa, Madura, Bali, Osing, Tengger, Betawi
- **Kalimantan**: Melayu Sambas, Banjar, Ngaju, Maanyan
- **Sulawesi**: Bugis, Makasar, Mandar, Toraja, Gorontalo, Minahasa, Mongondow, Kaili, Pamona, Tolaki, Suwawa
- **Nusa Tenggara**: Sasak, Bima, Sumbawa
- **Maluku & Papua**: Melayu Ambon, Melayu Ternate, Melayu Papua, Biak, Dani, Yali, Asmat
- **Kepulauan Riau**: Melayu Kepri

## Teknologi

- React 18 + Vite 5
- Vanilla CSS (tanpa framework CSS)
- SVG interaktif untuk peta Indonesia
- Deploy ke Netlify

## Instalasi & Menjalankan Lokal

```bash
# Masuk ke direktori project
cd indonesian-languages-explorer

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview build production
npm run preview
```

## Deploy ke Netlify

### Opsi 1: Drag & Drop (Termudah)
1. Jalankan `npm run build`
2. Drag folder `dist` ke [Netlify Drop](https://app.netlify.com/drop)

### Opsi 2: Git Integration (Direkomendasikan)
1. Push repository ke GitHub/GitLab/Bitbucket
2. Hubungkan ke Netlify
3. Build settings otomatis terdeteksi dari `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

### Opsi 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Struktur Project

```
indonesian-languages-explorer/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── languages.js      # Data 35+ bahasa daerah
│   ├── App.jsx               # Komponen utama
│   ├── App.css               # Styling komponen
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml              # Konfigurasi Netlify
└── README.md
```

## Menambah Bahasa Baru

Edit `src/data/languages.js`:
1. Tambahkan object bahasa baru ke array `languagesData`
2. Tambahkan mapping provinsi ke `provincesWithLanguages`
3. Tambahkan koordinat dan path SVG di `provinceCenters` dan `provincePaths` di `App.jsx`

## Sumber Data

- [Ethnologue: Languages of Indonesia](https://www.ethnologue.com/country/ID)
- [Pusat Bahasa, Kemendikbud RI](https://www.kemdikbud.go.id/)
- [UNESCO Atlas of the World's Languages in Danger](https://www.unesco.org/languages-atlas/)
- Penelitian linguistik dan publikasi akademik

## Lisensi

Proyek ini dibuat untuk tujuan pendidikan dan kompetisi lomba informatika. Data bahasa bersifat informasi publik.

---

Dibuat dengan ❤️ untuk mempelajari kekayaan budaya Indonesia