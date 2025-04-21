import { ActivityChart } from "./components/activity-chart";
import { RecentContent } from "./components/recent-content";
import { Summary } from "./components/summary";

export function Dashboard(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Summary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <RecentContent />
        </div>
      </div>
    </div>
  );
}
