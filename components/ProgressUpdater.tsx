'use client';

import { useState } from 'react';

type Props = {
  bookId: string;
  pagesRead?: number;
  totalPages?: number;
};

export default function ProgressUpdater({ bookId, pagesRead = 0, totalPages = 0 }: Props) {
  const [input, setInput] = useState(pagesRead);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/reading-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId,
        status: 'reading',
        pagesRead: input,
        totalPages,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      console.error('Failed to update reading progress');
    } else {
      // Optionally trigger UI update (page reload, toast, etc.)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2 text-xs">
      <input
        type="number"
        min="0"
        max={totalPages}
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        className="border px-2 py-1 rounded w-20"
        placeholder="Pages read"
      />
      <button
        type="submit"
        className="bg-brown text-white px-2 py-1 rounded hover:bg-brown-dark disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
