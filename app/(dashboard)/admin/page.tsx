import {AdminChart} from '@/components/my-chart';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-1/4 bg-[#EDE7FF] text-zinc-900 p-6">
        {/* Logo & Company Name */}
        <div className="mb-10">
          <div className="text-2xl font-bold mb-1 text-[#6C4EFF]">Dash</div>
          <div className="text-sm text-gray-400">by InWord</div>
        </div>

        {/* Menu */}
        <nav className="space-y-4">
          <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Dashboard</div>
          <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Analytics</div>
          <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Users</div>
          <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Settings</div>
        </nav>
      </div>

      {/* Right Panel */}
      <div className="w-3/4 bg-gray-100 p-8">
        {session?.user ? (
          <div>
            <h1 className="text-3xl font-semibold mb-6">
              Admin Dashboard - Welcome back {session.user.username}
            </h1>

            {/* Chart or Dashboard Content */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Site Analytics</h2>
              <div className="w-full">
                < AdminChart />
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-2xl mt-20 flex justify-center items-center text-gray-600">
            Please login to see this admin page
          </h2>
        )}
      </div>
    </div>
  );
};

export default page;
