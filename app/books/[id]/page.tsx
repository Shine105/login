import BookDetailUI from './BookDetailUI';

const getBookDetails = async (id: string) => {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch book details');
  return res.json();
};

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book = await getBookDetails(params.id);
  return <BookDetailUI book={book} bookId={params.id} />;
}
