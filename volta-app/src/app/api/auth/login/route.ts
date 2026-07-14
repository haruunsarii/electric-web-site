import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 });
    }

    // In a real app, you would sign a JWT here. 
    // For this prototype, we just return the user info.
    return NextResponse.json({
      id: user.id,
      username: user.username,
      isDealer: user.isDealer,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Giriş işlemi sırasında bir hata oluştu.' }, { status: 500 });
  }
}
