import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-beige text-gray-800 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-brown">InWord</h1>
        <nav className="space-x-4">
          <button className="hover:underline">Home</button>
          <button className="hover:underline">My Books</button>
          <button className="hover:underline">Browse</button>
          <button className="hover:underline">Community</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="grid md:grid-cols-3 gap-6 mt-6">
        {/* Currently Reading */}
        <section className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Currently Reading</h2>
          <div className="space-y-4">
            <div className="border p-4 rounded shadow-sm">
              <p className="font-semibold">The Cooking of Books</p>
              <p className="text-sm text-gray-600">by Ramachandra Guha</p>
              <div className="bg-gray-200 rounded-full h-2 mt-2 w-full">
                <div className="bg-brown h-2 rounded-full w-1/4"></div>
              </div>
              <button className="text-xs text-blue-600 mt-2">Update progress</button>
            </div>

            <div className="border p-4 rounded shadow-sm">
              <p className="font-semibold">Book Lovers</p>
              <p className="text-sm text-gray-600">by Emily Henry</p>
              <div className="bg-gray-200 rounded-full h-2 mt-2 w-full">
                <div className="bg-brown h-2 rounded-full w-1/5"></div>
              </div>
              <button className="text-xs text-blue-600 mt-2">Update progress</button>
            </div>
          </div>

          {/* Reading Challenge */}
          <div className="mt-6 p-4 border rounded shadow-sm">
            <h3 className="font-bold text-lg">2025 Reading Challenge</h3>
            <p className="text-2xl mt-2">4 books completed</p>
            <p className="text-sm text-gray-600">1 book behind schedule</p>
          </div>

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

export default Home;
