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

  const booksWithDetails = await Promise.all(
    entries.map(async (entry) => {
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${entry.bookId}`);
        const data = await res.json();
        const info = data.volumeInfo;

        return {
          bookId: entry.bookId,
          status: entry.status,
          updatedAt: entry.updatedAt,
          title: info?.title || 'Unknown Title',
          author: info?.authors?.join(', ') || 'Unknown Author',
          thumbnail: info?.imageLinks?.thumbnail || null,
        };
      } catch (err) {
        console.error('Error fetching book details:', err);
        return {
          bookId: entry.bookId,
          status: entry.status,
          updatedAt: entry.updatedAt,
          title: 'Unknown Title',
          author: 'Unknown Author',
          thumbnail: null,
        };
      }
    })
  );

  return booksWithDetails;
}
