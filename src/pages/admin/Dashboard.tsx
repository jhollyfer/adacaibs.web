import ActivityChart from "@/components/administrator/dashboard/ActivityChart";
import DashboardSummary from "@/components/administrator/dashboard/DashboardSummary";
import RecentContent from "@/components/administrator/dashboard/RecentContent";
import AdminLayout from "@/components/administrator/layout/AdminLayout";

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
