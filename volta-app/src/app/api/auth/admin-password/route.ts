import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Admin user should have username 'admin'
    const user = await prisma.user.findUnique({
      where: { username: 'admin' }
    });

    if (!user || user.password !== currentPassword || !user.isAdmin) {
      return NextResponse.json({ error: 'Mevcut şifreniz yanlış.' }, { status: 401 });
    }

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newPassword }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Şifre değiştirme sırasında bir hata oluştu.' }, { status: 500 });
  }
}
