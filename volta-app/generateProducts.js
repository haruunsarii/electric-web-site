const fs = require('fs');
const path = require('path');

const categoriesData = {
  'ampul': [
    "9W LED Ampul Beyaz Işık", "9W LED Ampul Gün Işığı", "12W LED Ampul Beyaz Işık", "15W LED Ampul", 
    "Rustik LED Ampul E27", "Mum LED Ampul E14", "Akıllı Wi-Fi LED Ampul", "Dimlenebilir LED Ampul", 
    "Kapsül Halojen Ampul", "Buji Ampul Şeffaf", "Cata 8W Renkli LED Ampul Kırmızı", "Cata 8W Renkli LED Ampul Mavi",
    "Philips 13W CorePro LED Ampul", "Osram 9W Base LED Ampul", "Panasoniz 10W LED Ampul", "18W Yüksek Işık Gücü LED Ampul",
    "4W Filament LED Ampul", "6W Rustik Glop Ampul", "14W Şarjlı LED Ampul", "20W UFO LED Ampul"
  ],
  'led-paneller': [
    "18W Sıva Altı Yuvarlak LED Panel", "24W Sıva Üstü Kare LED Panel", "60x60 54W Backlight LED Panel", 
    "30x120 40W LED Panel Armatür", "12W Camlı LED Panel", "6W Mini LED Panel Sıva Altı", 
    "Sıva Altı Kare Panel 18W", "Clip-in Tavan LED Panel 60x60 36W", "Osram 60x60 LED Panel",
    "Philips CoreLine Panel 60x60", "48W Alüminyum Kasa Sıva Üstü Panel", "15W Çerçevesiz Sıva Altı Panel",
    "30x30 18W Kare Panel", "36W 60x60 Sıva Altı Beyaz Işık", "Dimlenebilir 60x60 LED Panel",
    "Acil Kitli 60x60 LED Panel Armatür", "Sıva Üstü 18W Yuvarlak Kasa", "Dekoratif Siyah Kasa LED Panel"
  ],
  'ziller': [
    "Klasik Kablolu Kapı Zili", "Kablosuz Pilli Kapı Zili", "Ding-Dong Zil Trafosu Dahil", 
    "Görüntülü Diafon Uyumlu Zil", "Mekanik Çan Zil 220V", "Melodili Apartman Zili", 
    "Su Geçirmez Kablosuz Dış Mekan Zili", "Kanarya Sesli Elektronik Zil", "Akıllı Kameralı Kapı Zili",
    "12V Pilli Mini Kapı Zili", "Sanayi Tipi Siren Zil 220V", "Masa Tipi Resepsiyon Zili",
    "Kuş Sesli Dekoratif Kapı Zili", "Işıklı Kablosuz Sağır Zili", "38 Melodili Uzaktan Kumandalı Zil"
  ],
  'sigortalar': [
    "1x16A C Tipi Otomatik Sigorta", "1x20A B Tipi Sigorta", "3x32A C Tipi Trifaze Sigorta", 
    "40A 30mA Kaçak Akım Rölesi", "63A 300mA Yangın Koruma Rölesi", "1x10A Otomatik Sigorta Siemens", 
    "1x40A B Tipi Minyatür Sigorta", "1x6A Sigorta V-Otomat", "Legrand 1x25A C Tipi Sigorta",
    "Schneider 3x40A C Tipi Otomatik Sigorta", "1x32A C Tipi V-Otomat", "Viko 40A 30mA Kaçak Akım Koruma",
    "4x63A 300mA Kaçak Akım Şalteri", "Siemens 1x16A B Tipi Sigorta", "2x25A Monofaze Kaçak Akım"
  ],
  'bant-armatur': [
    "18W LED Bant Armatür 60cm", "36W LED Bant Armatür 120cm", "Etanj Bant Armatür Su Geçirmez 120cm", 
    "T5 LED Bant Armatür Anahtarlı 90cm", "T8 Floresan Uyumlu Bant Armatür", "Slim Kasa LED Bant Armatür 120cm", 
    "Sıva Üstü Lineer Aydınlatma 100cm", "54W 150cm LED Bant Armatür", "Sensörlü LED Bant Armatür 120cm",
    "Pelsan 36W Yüksek Lümen Bant Armatür", "Cata 18W Anahtarlı Bant Armatür", "Eklenebilir T5 Bant Armatür 120cm",
    "60cm 18W Polikarbon Etanj Armatür", "IP65 Su Korumalı 36W LED Etanj", "Siyah Kasa 120cm Lineer Bant Armatür"
  ],
  'bahce-armatur': [
    "Paslanmaz Çelik Bahçe Dikme Armatür", "Alüminyum Döküm Aplik", "Güneş Enerjili (Solar) Bahçe Lambası", 
    "Kazıklı Çim Armatürü GU10", "Glob Glop Dış Mekan Bahçe Aydınlatması", "Sensörlü Dış Mekan Duvar Apliki", 
    "Set Üstü Bahçe Feneri Klasik", "Modern Antrasit Bahçe Duvar Apliki", "IP67 Zemine Gömme Bahçe Spotu",
    "Mantar Tip Alüminyum Bahçe Dikme", "Çift Yönlü Duvar Aplik Siyah", "Retro Bakır Renkli Dış Mekan Feneri",
    "Bambu Görünümlü Dekoratif Bahçe Lambası", "Solar Saplamalı Meşale Lamba", "Hareket Sensörlü 30W Bahçe Spotu"
  ],
  'projektor': [
    "50W SMD LED Projektör Beyaz", "100W Dış Mekan LED Projektör Gün Işığı", "200W Yüksek Lümen IP65 Projektör", 
    "30W İnce Kasa Slim Projektör", "10W Sensörlü LED Projektör", "RGB Uzaktan Kumandalı Projektör 50W", 
    "Güneş Enerjili Solar Projektör 100W", "400W Halojen Kasa LED Projektör", "Saha Aydınlatma 300W LED Projektör",
    "Philips 50W BVP150 Essential Projektör", "Cata 100W Kırmızı Işıklı Projektör", "Yeşil Işık 50W Ağaç Altı Projektör",
    "Taşınabilir Şarjlı 30W Projektör", "Tripod Ayaklı 2x50W Şantiye Projektörü", "Asimetrik Lensli 150W LED Projektör"
  ]
};

const categoriesInfo = [
  { slug: 'ampul', desc: 'Ev ve iş yerleri için yüksek enerji verimliliğine sahip uzun ömürlü ampul.' },
  { slug: 'led-paneller', desc: 'Sıva altı ve sıva üstü montaj seçenekleriyle homojen aydınlatma sunan LED panel.' },
  { slug: 'ziller', desc: 'Kolay kurulum ve yüksek ses kalitesine sahip şık kapı zili modeli.' },
  { slug: 'sigortalar', desc: 'Aşırı yük ve kısa devrelere karşı üstün koruma sağlayan otomatik sigorta.' },
  { slug: 'bant-armatur', desc: 'Otopark, depo ve geniş alanlar için ideal endüstriyel aydınlatma armatürü.' },
  { slug: 'bahce-armatur', desc: 'Zorlu hava koşullarına dayanıklı, dış mekan kullanımına uygun estetik armatür.' },
  { slug: 'projektor', desc: 'Geniş alan aydınlatmaları için IP65 koruma sınıfına sahip güçlü LED projektör.' }
];

let products = [];
let globalId = 1;

for (const catInfo of categoriesInfo) {
  const names = categoriesData[catInfo.slug];
  
  for (let i = 1; i <= 30; i++) {
    // Pick a name from the list (cycling through)
    const baseName = names[(i - 1) % names.length];
    
    // Add a variation suffix so each of the 30 products has a distinct name
    const variation = Math.ceil(i / names.length) > 1 ? ` - Seri 0${Math.ceil(i / names.length)}` : '';
    const finalName = `${baseName}${variation}`;

    // Generate a random-looking price between 20 and 1500
    const price = (Math.random() * 1480 + 20).toFixed(2);
    
    // Use picsum with a unique seed so every photo is different but consistent
    const imageUrl = `https://picsum.photos/seed/${catInfo.slug}-${i}/400/300`;
    
    products.push({
      id: `${catInfo.slug}-${i}`,
      name: finalName,
      description: `${finalName}. ${catInfo.desc} CE ve RoHS sertifikalarına sahiptir. İki yıl garantilidir.`,
      price: parseFloat(price),
      image: imageUrl,
      categorySlug: catInfo.slug
    });
  }
}

const fileContent = `export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categorySlug: string;
}

export const mockProducts: Product[] = ${JSON.stringify(products, null, 2)};
`;

const outputPath = path.join(__dirname, 'src', 'data', 'products.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully generated products.ts with realistic names for 210 products.');
