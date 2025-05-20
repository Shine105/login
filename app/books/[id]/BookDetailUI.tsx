'use client';

import Link from 'next/link';
import ReadingStatusSelector from '../ReadingStatusSelector';
import { ReflectionsBox } from '../ReflectionBox';

export default function BookDetailUI({ book, bookId }: { book: any; bookId: string }) {
  const info = book.volumeInfo;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white py-10 px-4 md:px-8 text-gray-800">
      <div className="mb-6">
        <Link href="/Home" className="inline-flex items-center text-sm text-indigo-700 hover:underline">
          ← Back to Home
        </Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-indigo-900">{info.title}</h1>
        <p className="text-md text-indigo-700 italic mt-2">
          by {info.authors?.join(', ') || 'Unknown Author'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8 bg-white shadow-xl rounded-2xl p-6 max-w-5xl mx-auto">
        {info.imageLinks?.thumbnail && (
          <img
            src={info.imageLinks.thumbnail}
            alt={info.title}
            className="w-40 md:w-48 rounded shadow-md self-center"
          />
        )}

        <div className="flex-1 space-y-4">
          <p className="text-sm text-gray-600">
            <strong>Published by:</strong> {info.publisher || 'Unknown'} <br />
            <strong>Date:</strong> {info.publishedDate || 'Unknown date'}
          </p>

          {info.averageRating && (
            <p className="text-yellow-600 font-semibold text-sm">
              ★ {info.averageRating}/5 average rating
            </p>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">In the Author’s Words</h3>
            <div
              className="prose prose-indigo max-w-none text-sm"
              dangerouslySetInnerHTML={{
                __html: info.description || 'No description available.',
              }}
            />
          </div>

          <ReadingStatusSelector bookId={bookId} />
        </div>
      </div>

      <ReflectionsBox />
    </div>
  );
}






