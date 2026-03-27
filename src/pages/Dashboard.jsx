import { Users, GraduationCap, BookOpen, ClipboardList, DollarSign } from 'lucide-react';
import AppSidebar from '@/components/dashboard/AppSidebar';
import Navbar from '@/components/dashboard/Navbar';
import StatCard from '@/components/dashboard/StatCard';
import CourseChart from '@/components/dashboard/CourseChart';
import RecentEnrollments from '@/components/dashboard/RecentEnrollments';
import CalendarWidget from '@/components/dashboard/CalendarWidget';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';
import TasksWidget from '@/components/dashboard/TasksWidget';
import QuickActions from '@/components/dashboard/QuickActions';

const stats = [
  { title: 'Total Students', value: 1248, icon: Users, trend: 12.5 },
  { title: 'Total Faculty', value: 86, icon: GraduationCap, trend: 4.2 },
  { title: 'Total Courses', value: 342, icon: BookOpen, trend: 8.1 },
  { title: 'Enrollments', value: 2847, icon: ClipboardList, trend: 15.3 },
  { title: 'Revenue', value: 14842, icon: DollarSign, trend: 22.7, prefix: '$' },
];

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Welcome */}
          <div>
            <h1 className="text-2xl font-bold text-main">
              Welcome back, Turgnina
            </h1>
            <p className="text-sm text-muted-custom mt-1">
              Your curriculum is performing 12% above benchmark.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.title} {...s} delay={i * 100} />
            ))}
          </div>

          {/* Chart + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CourseChart />
            </div>
            <QuickActions />
          </div>

          {/* Enrollments + Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentEnrollments />
            </div>
            <CalendarWidget />
          </div>

          {/* Notifications + Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NotificationsPanel />
            <TasksWidget />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
