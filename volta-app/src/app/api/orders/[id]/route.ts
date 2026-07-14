import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const orderId = resolvedParams.id;
    const body = await request.json();
    const { status } = body;

    const allowedStatuses = ["Bekliyor", "Kargolandı", "Tamamlandı", "İptal Edildi"];
    
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: 'Geçersiz sipariş durumu' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Order status update error:', error);
    return NextResponse.json({ error: 'Sipariş güncellenirken hata oluştu.' }, { status: 500 });
  }
}
