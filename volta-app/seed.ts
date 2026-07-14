import { PrismaClient } from '@prisma/client';
import { mockProducts } from './src/data/products';

const prisma = new PrismaClient();

const categoriesInfo = [
  { slug: 'ampul', name: 'Ampuller', desc: 'Ev ve iş yerleri için yüksek enerji verimliliğine sahip uzun ömürlü ampul.' },
  { slug: 'led-paneller', name: 'LED Paneller', desc: 'Sıva altı ve sıva üstü montaj seçenekleriyle homojen aydınlatma sunan LED panel.' },
  { slug: 'ziller', name: 'Kapı Zilleri', desc: 'Kolay kurulum ve yüksek ses kalitesine sahip şık kapı zili modeli.' },
  { slug: 'sigortalar', name: 'Otomatik Sigortalar', desc: 'Aşırı yük ve kısa devrelere karşı üstün koruma sağlayan otomatik sigorta.' },
  { slug: 'bant-armatur', name: 'Bant Armatürler', desc: 'Otopark, depo ve geniş alanlar için ideal endüstriyel aydınlatma armatürü.' },
  { slug: 'bahce-armatur', name: 'Bahçe Armatürleri', desc: 'Zorlu hava koşullarına dayanıklı, dış mekan kullanımına uygun estetik armatür.' },
  { slug: 'projektor', name: 'LED Projektörler', desc: 'Geniş alan aydınlatmaları için IP65 koruma sınıfına sahip güçlü LED projektör.' }
];

async function main() {
  console.log('Seeding database...');
  
  // Create Categories
  for (const cat of categoriesInfo) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        slug: cat.slug,
        name: cat.name,
        desc: cat.desc
      }
    });
  }

  // Create Products
  for (const prod of mockProducts) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: {
        name: prod.name,
        description: prod.description,
        price: prod.price,
        image: prod.image,
        categorySlug: prod.categorySlug
      },
      create: {
        id: prod.id,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        image: prod.image,
        categorySlug: prod.categorySlug
      }
    });
  }

  // Create Default Dealer User
  await prisma.user.upsert({
    where: { username: 'bayi' },
    update: {},
    create: {
      username: 'bayi',
      password: '123456', // Hardcoded for prototype purposes
      isDealer: true
    }
  });

  // Create Default Admin User
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin123',
      isAdmin: true
    }
  });

  console.log('Database successfully seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
