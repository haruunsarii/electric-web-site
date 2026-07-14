import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, address, cartItems, cartTotal, paymentMethod, discountRate } = body;

    if (!customerName || !customerPhone || !address || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Eksik bilgi gönderildi' }, { status: 400 });
    }

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerPhone,
        address,
        totalAmount: cartTotal,
        discount: discountRate || 0,
        status: "PENDING",
        items: {
          create: cartItems.map((item: any) => ({
            productId: item.product.id,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity
          }))
        }
      }
    });

    return NextResponse.json({ success: true, orderNumber: order.orderNumber }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Sipariş oluşturulamadı' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });
    
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Siparişler alınamadı' }, { status: 500 });
  }
}
