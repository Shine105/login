// app/api/reading-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { bookId, status } = await req.json();

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  try {
    await db.readingStatus.upsert({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId,
        },
      },
      update: { status },
      create: {
        userId: user.id,
        bookId,
        status,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DB Error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
