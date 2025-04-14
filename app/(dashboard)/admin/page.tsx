import { AdminChart } from '@/components/my-chart';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { User } from 'next-auth'; // Import User type
import React from 'react';
import UserAccountnav from '@/components/UserAccountnav';


const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        You are not authorized to view this page.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-1/4 bg-[#EDE7FF] text-zinc-900 p-6">
        <div className="mb-10">
          <div className="text-2xl font-bold mb-1 text-[#6C4EFF]">Dash</div>
          <div className="text-sm text-gray-400">by InWord</div>
        </div>

        <nav className="space-y-4">
          <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Dashboard</div>
          <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Analytics</div>
          <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Users</div>
          <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">Settings</div>
          <div>
            <UserAccountnav />
          </div>
        </nav>
      </div>

      {/* Right Panel */}
      <div className="w-3/4 bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold mb-6">
          Admin Dashboard - Welcome back {session.user.username}
        </h1>

        <div>
          <h2 className="text-xl font-semibold mb-4">Site Analytics</h2>
          <div className="w-full">
            <AdminChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
