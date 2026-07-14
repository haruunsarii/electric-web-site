import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image, categorySlug } = body;

    if (!name || !price || !categorySlug) {
      return NextResponse.json({ error: 'Eksik bilgi girdiniz' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        image: image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCk9LUoT2zMA-Q_q8RpzU-crEE-0MOG5j_Zd8zPSYh7pTX8FdMyXypioCHkHIZiWWfPmnNlUQGUIP_LazNbiEGULeTGYlo2W27e0QlSY2-Tq_j1-6HQdBfSt8-Xxs8wG8SVXMbZfDjqZd3khNFBF-nrZjIpPTgy2RwjLrm2nTLk5qOMA7IOasyRZP-s4w3FKUpjq3V-fdY_I4QhuSOWEp13lh7Vm7VQkTFtr6Pq4eSAKS1cH8UZmIpCI600cxwCTGEXNH2uBiC1pcuL", // default generic image
        categorySlug
      }
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json({ error: 'Ürün eklenirken bir hata oluştu.' }, { status: 500 });
  }
}
