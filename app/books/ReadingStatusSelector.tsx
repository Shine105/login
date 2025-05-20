'use client';

import { useEffect, useState } from 'react';

const ReadingStatusSelector = ({ bookId }: { bookId: string }) => {
  const [status, setStatus] = useState<string>('not started');

  // Load from DB on first mount
  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(`/api/reading-status?bookId=${bookId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status) {
            setStatus(data.status);
          }
        }
      } catch (err) {
        console.error('Error fetching status:', err);
      }
    }

    fetchStatus();
  }, [bookId]);

  async function handleStatusChange(value: string) {
    if (value !== status) {
      setStatus(value);

      try {
        const res = await fetch('/api/reading-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookId, status: value }),
        });

        if (!res.ok) {
          console.error('Failed to update status');
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  }

  return (
    <select
      value={status}
      onChange={(e) => handleStatusChange(e.target.value)}
      className="border px-3 py-1 rounded bg-white text-gray-800"
    >
      <option value="not started">Not Started</option>
      <option value="reading">Reading</option>
      <option value="completed">Completed</option>
    </select>
  );
};

export default ReadingStatusSelector;
