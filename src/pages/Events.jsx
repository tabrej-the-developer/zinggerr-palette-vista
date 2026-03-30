import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Plus, CalendarDays, Home, ChevronRight } from 'lucide-react';
import EventTable from '@/components/events/EventTable';
import CreateEventModal from '@/components/events/CreateEventModal';
import EditEventModal from '@/components/events/EditEventModal';
import DeleteEventModal from '@/components/events/DeleteEventModal';

const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Orientation Week',
    bgColor: '#6C8CFF',
    textColor: '#FFFFFF',
    startDate: '2026-04-01T09:00',
    endDate: '2026-04-05T17:00',
    description: 'Welcome week for new students with campus tours, workshops, and social mixers.',
  },
  {
    id: 2,
    title: 'Mid-Term Exams',
    bgColor: '#F472B6',
    textColor: '#FFFFFF',
    startDate: '2026-04-14T08:00',
    endDate: '2026-04-18T16:00',
    description: 'Mid-semester examinations across all departments.',
  },
  {
    id: 3,
    title: 'Guest Lecture: AI in Education',
    bgColor: '#34D399',
    textColor: '#1E293B',
    startDate: '2026-04-22T14:00',
    endDate: '2026-04-22T16:00',
    description: 'A special guest lecture on the impact of artificial intelligence in modern education.',
  },
  {
    id: 4,
    title: 'Annual Sports Day',
    bgColor: '#FBBF24',
    textColor: '#1E293B',
    startDate: '2026-05-01T07:00',
    endDate: '2026-05-01T18:00',
    description: 'Inter-department sports competition with track, field, and team events.',
  },
];

const Events = () => {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null);

  const filtered = useMemo(() =>
    events.filter(e =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
    ), [events, search]);

  const handleCreate = (newEvent) => {
    setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
  };

  const handleUpdate = (updated) => {
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  const handleDelete = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb + Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-2 text-xs text-muted-custom mb-4">
          <Link to="/" className="flex items-center gap-1 hover:text-main transition-colors">
            <Home size={13} /> Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-main font-medium">Events</span>
        </div>

        <div className="glass-surface rounded-2xl p-6 shadow-glass">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
              <CalendarDays size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-main">Events</h1>
              <p className="text-sm text-muted-custom mt-0.5">Manage and schedule events</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}
        className="flex items-center justify-between gap-4 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-glow hover:shadow-lg"
          style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
          <Plus size={16} /> Add Event
        </motion.button>

        <div className="relative w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-custom pointer-events-none" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text-main)',
              '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)',
            }}
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }}>
        <EventTable events={filtered} onEdit={setEditEvent} onDelete={setDeleteEvent} />
      </motion.div>

      {/* Modals */}
      <CreateEventModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onSave={handleCreate} />
      <EditEventModal isOpen={!!editEvent} onClose={() => setEditEvent(null)} event={editEvent} onUpdate={handleUpdate} />
      <DeleteEventModal isOpen={!!deleteEvent} onClose={() => setDeleteEvent(null)} event={deleteEvent} onDelete={handleDelete} />
    </div>
  );
};

export default Events;
