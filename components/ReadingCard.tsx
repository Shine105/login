'use client';

import { useState } from 'react';

interface ReadingEntry {
    bookId: string;
    title: string;
    author: string;
    thumbnail?: string;
    pagesRead: number;
    totalPages: number;
}

export default function ReadingCard({ entry }: { entry: ReadingEntry }) {
    const [pagesRead, setPagesRead] = useState(entry.pagesRead);
    const [inputValue, setInputValue] = useState(entry.pagesRead.toString());
    const [isSaving, setIsSaving] = useState(false);

    const progress = Math.min(
        100,
        Math.round((pagesRead / entry.totalPages) * 100)
    );

    const handleUpdate = async () => {
        const numericValue = parseInt(inputValue, 10);
        if (
            isNaN(numericValue) ||
            numericValue < 0 ||
            numericValue > entry.totalPages
        ) {
            return;
        }

        setIsSaving(true);

        // fake update call
        await new Promise((res) => setTimeout(res, 300)); // simulate network

        // Update state locally
        setPagesRead(numericValue);
        setIsSaving(false);
    };

    return (
        <div className="flex flex-col md:flex-row bg-white border rounded-lg shadow-sm overflow-hidden p-4 mb-4">
            {entry.thumbnail && (
                <img
                    src={entry.thumbnail}
                    alt={entry.title}
                    className="w-24 h-auto rounded shadow-sm mb-2 md:mb-0 md:mr-4"
                />
            )}

            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{entry.title}</h3>
                <p className="text-sm italic text-gray-500 mb-2">
                    by {entry.author}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-2.5 rounded-full mt-1 mb-1">
                    <div
                        className="h-2.5 bg-indigo-600 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Progress and % */}
                <div className="text-xs text-gray-700 flex justify-between">
                    <span>
                        {pagesRead} / {entry.totalPages} pages
                    </span>
                    <span>{progress}%</span>
                </div>

                {/* Input & Update button */}
                <div className="mt-2 flex items-center gap-2 text-sm">
                    <input
                        type="text"
                        inputMode="numeric"
                        className="w-20 px-2 py-1 border rounded text-sm"
                        value={inputValue}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) setInputValue(val);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleUpdate();
                            }
                        }}
                    />
                    <button
                        onClick={handleUpdate}
                        disabled={isSaving}
                        className="text-indigo-600 hover:underline"
                    >
                        {isSaving ? 'Saving...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
}
