import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, contactName, phone, email, taxNumber, message } = body;

    // Basic validation
    if (!companyName || !contactName || !phone || !email || !taxNumber) {
      return NextResponse.json(
        { error: 'Zorunlu alanlar eksik' },
        { status: 400 }
      );
    }

    const application = await prisma.dealerApplication.create({
      data: {
        companyName,
        contactName,
        phone,
        email,
        taxNumber,
        message,
        status: "Bekliyor"
      }
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating dealer application:', error);
    return NextResponse.json(
      { error: 'Başvuru alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Admin yetkisi kontrolü yapılmalı (gerçek bir senaryoda)
    const applications = await prisma.dealerApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: 'Başvurular alınamadı' },
      { status: 500 }
    );
  }
}
