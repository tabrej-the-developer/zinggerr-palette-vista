import { motion } from 'framer-motion';

const enrollments = [
  { id: 1, student: 'Aria Patel', course: 'Advanced React', date: 'Mar 18, 2026', status: 'Active' },
  { id: 2, student: 'Liam Chen', course: 'UI/UX Design', date: 'Mar 17, 2026', status: 'Active' },
  { id: 3, student: 'Sofia Rivera', course: 'Data Science 101', date: 'Mar 16, 2026', status: 'Pending' },
  { id: 4, student: 'Noah Kim', course: 'Machine Learning', date: 'Mar 15, 2026', status: 'Active' },
  { id: 5, student: 'Emma Watson', course: 'Cloud Computing', date: 'Mar 14, 2026', status: 'Completed' },
];

const statusStyles: Record<string, { bg: string; text: string }> = {
  Active: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981' },
  Pending: { bg: 'rgba(var(--primary-rgb), 0.1)', text: 'var(--primary)' },
  Completed: { bg: 'rgba(var(--primary-rgb), 0.06)', text: 'var(--text-muted)' },
};

const RecentEnrollments = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="p-6 rounded-2xl glass-surface backdrop-blur-xl"
  >
    <h3 className="text-lg font-bold text-main mb-4">Recent Enrollments</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted-custom text-left">
            <th className="pb-3 font-medium">Student</th>
            <th className="pb-3 font-medium">Course</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e) => {
            const s = statusStyles[e.status];
            return (
              <tr
                key={e.id}
                className="border-t transition-colors hover:bg-[rgba(var(--primary-rgb),0.03)]"
                style={{ borderColor: 'var(--border)' }}
              >
                <td className="py-3 font-medium text-main">{e.student}</td>
                <td className="py-3 text-muted-custom">{e.course}</td>
                <td className="py-3 text-muted-custom">{e.date}</td>
                <td className="py-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: s.bg, color: s.text }}
                  >
                    {e.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </motion.div>
);

export default RecentEnrollments;
