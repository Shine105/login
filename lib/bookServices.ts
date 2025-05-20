// lib/bookService.ts
export async function fetchBookFromGoogle(volumeId: string) {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`);
    if (!res.ok) return null;
  
    const data = await res.json();
    return {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors ?? [],
      description: data.volumeInfo.description ?? '',
      coverImage: data.volumeInfo.imageLinks?.thumbnail ?? '',
      publisher: data.volumeInfo.publisher ?? '',
      publishedDate: data.volumeInfo.publishedDate ?? '',
    };
  }
  