'use client';

import React from 'react';

export const ReflectionsBox = () => {
  return (
    <div className="mt-10 max-w-5xl mx-auto bg-slate-100 border border-slate-300 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">📓 Reflections & Notes</h3>
      <textarea
        placeholder="Write your thoughts, favorite quotes, or reflections here..."
        className="w-full min-h-[120px] p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-sm"
      ></textarea>
      <button
        disabled
        className="mt-3 px-4 py-2 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 cursor-not-allowed opacity-70"
      >
        Save (coming soon)
      </button>
    </div>
  );
};
