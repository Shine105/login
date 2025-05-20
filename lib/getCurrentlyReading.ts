import prisma from './prisma';

export async function getCurrentlyReading(userId: string) {
  const entries = await prisma.readingStatus.findMany({
    where: {
      userId,
      status: 'reading',
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return entries;
}
