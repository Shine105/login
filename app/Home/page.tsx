import React from 'react';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
declare module 'next-auth' {
  interface User {
    role: string;
  }
}
import UserAccountnav from '@/components/UserAccountnav';
import UserHeader from '@/components/UserHeader';
import { getCurrentlyReading } from '@/lib/getCurrentlyReading';


const UserPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'user') {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        You are not authorized to view this page.
      </div>
    );
  }

  const currentlyReading = await getCurrentlyReading(session.user.id);


  return (
    <div className="min-h-screen bg-beige text-gray-800 font-sans p-4 md:p-8">
      <UserHeader session={session} />

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700 italic">
          Hi, <span className="font-semibold">{session.user.name?.split(' ')[0]}</span>
        </div>
        <span className="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 inline-block">
          <UserAccountnav />
        </span>
      </div>

      {/* Main Content */}
      <main className="grid md:grid-cols-3 gap-6 mt-6">
        {/* Currently Reading */}
        <section className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Currently Reading</h2>
          <div className="space-y-4">
            {currentlyReading.length === 0 && (
              <p className="text-sm text-gray-600 italic">
                You're not reading any books currently.
              </p>
            )}

            {currentlyReading.map((entry) => (
              <div
                key={entry.bookId}
                className="flex flex-col md:flex-row bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                {entry.thumbnail && (
                  <div className="p-3 md:p-4 flex-shrink-0">
                    <img
                      src={entry.thumbnail}
                      alt={entry.title}
                      className="w-24 h-auto rounded shadow-sm"
                    />
                  </div>
                )}

                <div className="flex flex-col justify-between p-3 md:p-4 flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                    <p className="text-sm text-gray-600 italic mb-3">by {entry.author}</p>
                  </div>

                  <div>
                    <div className="bg-gray-200 rounded-full h-2 w-full">
                      <div
                        className="bg-brown h-2 rounded-full"
                        style={{ width: `${(entry as any).progress ?? 0}%` }}
                      />
                    </div>
                    <button className="text-xs text-indigo-600 mt-2 hover:underline">
                      Update progress
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Reading Challenge */}
          <div className="mt-6 p-4 border rounded shadow-sm">
            <h3 className="font-bold text-lg">2025 Reading Challenge</h3>
            <p className="text-2xl mt-2">4 books completed</p>
            <p className="text-sm text-gray-600">1 book behind schedule</p>
          </div>
        </section>

        {/* Center Updates & Discovery */}
        <section className="md:col-span-1">
          <div className="bg-pink-100 p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold">Need Help Busting a Reading Slump?</h2>
            <p className="text-sm mt-1">132 page-turning books to inspire you anew!</p>
          </div>

          <h2 className="mt-6 text-xl font-semibold">Updates</h2>
          <div className="mt-2 space-y-4">
            <div className="p-4 border rounded shadow-sm">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">J.C. Thomas</span> reviewed <span className="italic">The Night Prince (Wolf King #2)</span>
              </p>
              <p className="text-sm text-yellow-600">★★★★★</p>
              <p className="text-sm mt-1">"If Aurora doesn't want Blake, I'll take him."</p>
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          <div className="border p-4 rounded shadow-sm">
            <h3 className="font-semibold text-lg">News & Interviews</h3>
            <p className="text-sm mt-2">Historical Fiction Leaps Across Genres in These 45 Recent Books</p>
          </div>

          <div className="border p-4 rounded shadow-sm">
            <h3 className="font-semibold text-lg">Recommendations</h3>
            <p className="text-sm mt-2">Because you enjoyed <span className="italic">The NO-BS Self-Help Book</span>:</p>
            <div className="mt-2">
              <p className="font-semibold">Wet Brain</p>
              <p className="text-sm text-gray-600">by Mark C. Hull</p>
              <p className="text-yellow-600">★★★★☆</p>
              <button className="mt-1 text-xs text-green-600">Want to Read</button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default UserPage;




