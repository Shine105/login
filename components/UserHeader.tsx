'use client';

import Link from 'next/link'; 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserHeader = ({ session }: { session: any }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/browse?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const fetchBooks = async (searchTerm: string) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10`
      );
      const data = await res.json();
      if (data.items) {
        setResults(data.items);
      } else {
        setResults([]);
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

  return (
    <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
      <h1 className="text-2xl font-bold text-brown">InWord</h1>

      <form onSubmit={handleSearch} className="w-full max-w-md relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search books, authors, or genres..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brown/50"
        />

        {query.trim() && results.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded-md mt-2 shadow-lg max-h-80 overflow-y-auto">
            {results.slice(0, 10).map((book) => {
              const info = book.volumeInfo;
              return (
                <li key={book.id}>
                  <Link
                    href={`/books/${book.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="text-sm font-semibold truncate">{info.title}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {info.authors?.join(', ') || 'Unknown Author'}
                    </p>
                  </Link>
                </li>
              );
            })}
            <li>
            <button
              onClick={() => router.push(`/browse?query=${encodeURIComponent(query.trim())}`)}
              className="block w-full text-center text-blue-600 text-sm py-2 hover:underline"
            >
              See more →
            </button>
            </li>
          </ul>
        )}
      </form>

      <nav className="flex items-center space-x-4">
        <button className="hover:underline">Home</button>
        <button className="hover:underline">My Books</button>
        <button className="hover:underline">
          <a href="/Browse">Browse</a>
        </button>
        <button className="hover:underline">Community</button>
      </nav>
    </header>
  );
};

export default UserHeader;
