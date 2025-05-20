'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { generateBookSlug } from '@/util/page';

const Browse = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<{
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      imageLinks?: { thumbnail?: string };
      averageRating?: number;
    };
  }[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const API_KEY = 'AIzaSyBxUKJdwBG8i2nosziuZeoNYxPaKcbx5oQ';

  const fetchBooks = async (searchTerm: string) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}&maxResults=10`
      );
      const data = await res.json();
      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        if (value.trim()) fetchBooks(value);
      }, 500)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) fetchBooks(query);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Find Your Next Great Read
      </h1>

      <form onSubmit={handleSubmit} className="mb-8 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by title, author, or keyword..."
          className="w-full max-w-xl p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => {
          const info = book.volumeInfo;
          return (
            <div
              key={book.id}
              className="rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 bg-white overflow-hidden"
            >
              {info.imageLinks && <div className="w-full h-72 bg-white relative rounded overflow-hidden mb-3 flex items-center justify-center">
                <img
                  src={info.imageLinks?.thumbnail}
                  alt={info.title}
                  className="max-h-full max-w-full object-contain p-2"
                  loading="lazy"
                />
              </div>}

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {info.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  {info.authors ? info.authors.join(', ') : 'Unknown Author'}
                </p>
                {info.averageRating && (
                  <p className="text-sm text-yellow-500 mb-1">⭐ {info.averageRating}/5</p>
                )}
                <p className="text-sm text-gray-700">
                  {info.description
                    ? info.description.slice(0, 120) + '...'
                    : 'No description available.'}
                </p>
                <Link href={`/book/${generateBookSlug(info.title)}`}>
                  <span className="text-sm text-blue-600 hover:underline mt-auto">Read more →</span>
                </Link>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Browse;
