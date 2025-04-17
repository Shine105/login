'use client'
import React, { useState, useEffect } from 'react';

const Browse = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<{ id: string; volumeInfo: { title: string; authors?: string[]; description?: string; imageLinks?: { thumbnail?: string } } }[]>([]);
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

  const handleChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setQuery(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        if (value.trim()) fetchBooks(value);
      }, 500)
    );
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (query.trim()) fetchBooks(query);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Browse and find your next read!</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search books by title, author..."
          className="w-full p-2 border rounded"
        />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => {
          const info = book.volumeInfo;
          return (
            <div key={book.id} className="border rounded p-4 shadow hover:shadow-lg transition">
              {info.imageLinks?.thumbnail && (
                <img
                  src={info.imageLinks.thumbnail}
                  alt={info.title}
                  className="w-full h-48 object-cover mb-2"
                />
              )}
              <h2 className="text-lg font-bold">{info.title}</h2>
              <p className="text-sm text-gray-600">
                {info.authors ? info.authors.join(', ') : 'Unknown Author'}
              </p>
              <p className="mt-2 text-sm">
                {info.description
                  ? info.description.slice(0, 100) + '...'
                  : 'No description available.'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Browse;
