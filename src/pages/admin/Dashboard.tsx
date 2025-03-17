
import React from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DashboardSummary from '@/components/admin/dashboard/DashboardSummary';
import ActivityChart from '@/components/admin/dashboard/ActivityChart';
import RecentContent from '@/components/admin/dashboard/RecentContent';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <DashboardSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>
          <div>
            <RecentContent />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
