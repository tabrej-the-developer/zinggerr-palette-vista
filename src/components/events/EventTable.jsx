import { motion } from 'framer-motion';
import EventRow from './EventRow';
import { CalendarDays } from 'lucide-react';

const EventTable = ({ events, onEdit, onDelete }) => {
  return (
    <div className="glass-surface rounded-2xl shadow-glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Title', 'Duration', 'Colors', 'Description', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-custom">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <CalendarDays size={40} className="mx-auto mb-3 text-muted-custom opacity-40" />
                  <p className="text-muted-custom text-sm">No events found</p>
                </td>
              </tr>
            ) : (
              events.map((event, i) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="transition-colors hover:bg-[rgba(var(--primary-rgb),0.04)]"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <EventRow event={event} onEdit={onEdit} onDelete={onDelete} />
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;
