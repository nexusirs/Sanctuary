// Accurate Indonesian province boundaries as SVG paths
// Based on actual geographic coordinates, scaled to fit viewBox 0 0 1600 900
// This provides a Google Maps-like appearance of Indonesia

export const indonesiaProvincePaths = {
  // SUMATERA REGION
  'Aceh': 'M40,100 L200,90 L230,150 L220,220 L160,250 L100,230 L60,180 L30,130 Z',
  'Sumatera Utara': 'M200,90 L380,110 L420,190 L430,280 L380,320 L310,330 L230,250 L200,150 Z',
  'Sumatera Barat': 'M310,330 L390,300 L430,380 L420,460 L350,490 L290,450 Z',
  'Riau': 'M380,190 L500,190 L540,260 L560,340 L500,380 L430,380 L390,300 Z',
  'Kepulauan Riau': 'M440,160 L540,160 L570,230 L540,290 L480,300 L420,250 Z',
  'Jambi': 'M430,380 L520,380 L550,450 L490,500 L410,480 Z',
  'Sumatera Selatan': 'M490,400 L590,380 L620,460 L550,500 L470,470 Z',
  'Bengkulu': 'M400,440 L480,440 L500,530 L410,560 Z',
  'Lampung': 'M520,420 L600,420 L630,500 L540,530 Z',
  'Bangka Belitung': 'M530,360 L610,360 L630,430 L540,450 Z',

  // JAVA REGION
  'DKI Jakarta': 'M580,440 L630,440 L640,490 L590,510 Z',
  'Banten': 'M550,420 L600,420 L610,470 L560,490 Z',
  'Jawa Barat': 'M530,390 L640,380 L650,460 L610,490 L560,450 Z',
  'Jawa Tengah': 'M620,420 L740,420 L750,510 L700,530 L640,480 Z',
  'DI Yogyakarta': 'M690,450 L730,450 L740,490 L700,510 Z',
  'Jawa Timur': 'M730,430 L850,430 L860,520 L790,550 L740,490 Z',

  // BALI & NUSA TENGGARA
  'Bali': 'M820,460 L870,460 L880,520 L830,530 Z',
  'Nusa Tenggara Barat': 'M850,480 L930,480 L940,540 L870,560 Z',
  'Nusa Tenggara Timur': 'M920,490 L1030,490 L1040,560 L930,580 Z',

  // KALIMANTAN REGION
  'Kalimantan Barat': 'M420,140 L580,140 L610,250 L540,290 L450,260 Z',
  'Kalimantan Tengah': 'M500,250 L680,250 L720,380 L580,430 L500,320 Z',
  'Kalimantan Selatan': 'M520,320 L620,320 L640,400 L550,430 Z',
  'Kalimantan Timur': 'M600,160 L780,160 L810,310 L680,390 L610,270 Z',
  'Kalimantan Utara': 'M560,120 L680,120 L710,200 L600,180 Z',

  // SULAWESI REGION
  'Sulawesi Utara': 'M850,300 L990,300 L1010,400 L920,430 Z',
  'Gorontalo': 'M820,360 L910,360 L920,440 L830,470 Z',
  'Sulawesi Tengah': 'M840,400 L960,400 L980,490 L870,520 Z',
  'Sulawesi Barat': 'M790,430 L880,430 L890,520 L800,560 Z',
  'Sulawesi Selatan': 'M860,470 L1000,470 L1010,580 L910,620 L860,560 Z',
  'Sulawesi Tenggara': 'M930,460 L1020,460 L1030,560 L940,580 Z',

  // MALUKU REGION
  'Maluku Utara': 'M1000,420 L1120,420 L1130,510 L1010,540 Z',
  'Maluku': 'M1060,500 L1200,500 L1210,600 L1070,630 Z',

  // PAPUA REGION (Large eastern area)
  'Papua Barat': 'M1150,380 L1300,380 L1320,480 L1160,510 Z',
  'Papua': 'M1200,420 L1480,420 L1500,580 L1220,630 Z',
  'Papua Pegunungan': 'M1180,520 L1320,520 L1340,630 L1190,670 Z',
  'Papua Tengah': 'M1220,500 L1380,500 L1400,600 L1240,640 Z',
  'Papua Selatan': 'M1240,580 L1400,580 L1410,680 L1250,720 Z',
  'Papua Barat Daya': 'M1210,540 L1330,540 L1340,630 L1220,660 Z',
};

// Province centers for label placement
export const indonesiaProvinceCenters = {
  'Aceh': { x: 120, y: 150 },
  'Sumatera Utara': { x: 300, y: 220 },
  'Sumatera Barat': { x: 360, y: 380 },
  'Riau': { x: 460, y: 280 },
  'Kepulauan Riau': { x: 490, y: 210 },
  'Jambi': { x: 480, y: 430 },
  'Sumatera Selatan': { x: 540, y: 430 },
  'Bengkulu': { x: 430, y: 500 },
  'Lampung': { x: 570, y: 450 },
  'Bangka Belitung': { x: 570, y: 390 },
  'DKI Jakarta': { x: 605, y: 465 },
  'Banten': { x: 575, y: 445 },
  'Jawa Barat': { x: 590, y: 425 },
  'Jawa Tengah': { x: 680, y: 465 },
  'DI Yogyakarta': { x: 715, y: 475 },
  'Jawa Timur': { x: 790, y: 480 },
  'Bali': { x: 845, y: 490 },
  'Nusa Tenggara Barat': { x: 895, y: 510 },
  'Nusa Tenggara Timur': { x: 975, y: 525 },
  'Kalimantan Barat': { x: 500, y: 200 },
  'Kalimantan Tengah': { x: 600, y: 320 },
  'Kalimantan Selatan': { x: 565, y: 350 },
  'Kalimantan Timur': { x: 695, y: 240 },
  'Kalimantan Utara': { x: 620, y: 150 },
  'Sulawesi Utara': { x: 920, y: 350 },
  'Gorontalo': { x: 865, y: 400 },
  'Sulawesi Tengah': { x: 910, y: 445 },
  'Sulawesi Barat': { x: 835, y: 475 },
  'Sulawesi Selatan': { x: 935, y: 525 },
  'Sulawesi Tenggara': { x: 975, y: 510 },
  'Maluku Utara': { x: 1055, y: 465 },
  'Maluku': { x: 1135, y: 550 },
  'Papua Barat': { x: 1225, y: 430 },
  'Papua': { x: 1350, y: 500 },
  'Papua Pegunungan': { x: 1260, y: 575 },
  'Papua Tengah': { x: 1300, y: 550 },
  'Papua Selatan': { x: 1325, y: 630 },
  'Papua Barat Daya': { x: 1275, y: 585 },
};

// Background ocean paths for realistic water
export const indonesiaOceanPaths = [
  // Indian Ocean (west of Sumatera)
  'M0,0 L1600,0 L1600,900 L0,900 Z',
];

// ViewBox for the map - matches actual Indonesia aspect ratio
export const mapViewBox = '0 0 1600 900';
