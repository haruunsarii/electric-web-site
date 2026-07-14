import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const productId = resolvedParams.id;
    const body = await request.json();
    
    // In a real app, you would verify the admin token here
    
    const { name, price, categorySlug, image, description } = body;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price: parseFloat(price),
        categorySlug,
        image,
        description
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Ürün güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    // In a real app, you would verify the admin token here

    await prisma.product.delete({
      where: { id: productId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Ürün silinemedi.' }, { status: 500 });
  }
}
