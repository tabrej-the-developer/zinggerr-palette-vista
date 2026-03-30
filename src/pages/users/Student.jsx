import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, ChevronDown, Home, ChevronRight, Edit3, Info, Trash2,
  ChevronLeft, ChevronsLeft, ChevronsRight, Users, X, Check,
  Eye, EyeOff, Lock, Mail, Phone, User, Upload, Camera
} from 'lucide-react';

const SAMPLE_STUDENTS = [
  { id: 3, name: 'Raj Patel', email: 'raj.p@zinggerr.com', username: 'raj_p', phone: '+91 87654 32100', role: 'Student', gender: 'Male', status: false, avatar: '' },
  { id: 5, name: 'Vikram Singh', email: 'vikram.s@zinggerr.com', username: 'vikram_s', phone: '+91 99887 76655', role: 'Student', gender: 'Male', status: true, avatar: '' },
  { id: 7, name: 'Alex Turner', email: 'alex.t@zinggerr.com', username: 'alex_t', phone: '+44 7700 900123', role: 'Student', gender: 'Other', status: false, avatar: '' },
];

const ROLES = ['Admin', 'Instructor', 'Student', 'Faculty', 'Moderator'];

const roleBadgeStyle = (role) => {
  const map = {
    Admin: { bg: 'rgba(239,68,68,0.12)', text: '#EF4444', border: 'rgba(239,68,68,0.2)' },
    Faculty: { bg: 'rgba(34,197,94,0.12)', text: '#22C55E', border: 'rgba(34,197,94,0.2)' },
    Student: { bg: 'rgba(var(--primary-rgb),0.12)', text: 'var(--primary)', border: 'rgba(var(--primary-rgb),0.2)' },
    Instructor: { bg: 'rgba(245,158,11,0.12)', text: '#F59E0B', border: 'rgba(245,158,11,0.2)' },
    Moderator: { bg: 'rgba(168,85,247,0.12)', text: '#A855F7', border: 'rgba(168,85,247,0.2)' },
  };
  return map[role] || map.Student;
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.35, ease: 'easeOut' } }),
};

// ── Modal Backdrop ──
const Backdrop = ({ children, onClose }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
      className="w-full"
    >
      {children}
    </motion.div>
  </motion.div>
);

// ── Info Modal ──
const InfoModal = ({ user, onClose }) => {
  if (!user) return null;
  const fields = [
    { label: 'Username', value: user.username },
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone },
    { label: 'Role', value: user.role },
    { label: 'Gender', value: user.gender },
    { label: 'Status', value: user.status ? 'Active' : 'Inactive' },
  ];
  return (
    <Backdrop onClose={onClose}>
      <div className="max-w-md mx-auto rounded-2xl p-6 glass-surface shadow-glass">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-main">Student Details</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
            <X size={18} className="text-muted-custom" />
          </button>
        </div>
        <div className="flex flex-col items-center mb-5">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3"
            style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <p className="text-main font-semibold text-lg">{user.name}</p>
        </div>
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.label} className="flex justify-between items-center py-2 px-3 rounded-xl" style={{ background: 'var(--border)' }}>
              <span className="text-sm text-muted-custom">{f.label}</span>
              <span className="text-sm font-medium text-main">{f.value}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose}
          className="w-full mt-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-glow"
          style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
          Close
        </button>
      </div>
    </Backdrop>
  );
};

// ── Delete Modal ──
const DeleteModal = ({ user, onClose, onConfirm }) => {
  if (!user) return null;
  return (
    <Backdrop onClose={onClose}>
      <div className="max-w-sm mx-auto rounded-2xl p-6 glass-surface shadow-glass text-center">
        <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)' }}>
          <Trash2 size={24} style={{ color: '#EF4444' }} />
        </div>
        <h3 className="text-lg font-bold text-main mb-2">Delete Student</h3>
        <p className="text-sm text-muted-custom mb-6">
          Are you sure you want to delete <span className="font-semibold text-main">{user.name}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:bg-[var(--border)]"
            style={{ borderColor: 'var(--border)', color: 'var(--text-main)' }}>
            Cancel
          </button>
          <button onClick={() => { onConfirm(user.id); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: '#EF4444' }}>
            Delete
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

// ── Edit Modal ──
const EditModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({ ...user });
  if (!user) return null;
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <Backdrop onClose={onClose}>
      <div className="max-w-lg mx-auto rounded-2xl p-6 glass-surface shadow-glass max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-main">Edit Student</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
            <X size={18} className="text-muted-custom" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-custom mb-1.5 block">Full Name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-solid text-main border outline-none transition-all focus:shadow-glow"
              style={{ borderColor: 'var(--border)' }} />
          </div>
          {/* Username */}
          <div>
            <label className="text-xs font-medium text-muted-custom mb-1.5 block">Username</label>
            <input value={form.username} onChange={e => set('username', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-solid text-main border outline-none transition-all focus:shadow-glow"
              style={{ borderColor: 'var(--border)' }} />
          </div>
          {/* Email */}
          <div>
            <label className="text-xs font-medium text-muted-custom mb-1.5 block">Email</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-solid text-main border outline-none transition-all focus:shadow-glow"
              style={{ borderColor: 'var(--border)' }} />
          </div>
          {/* Phone */}
          <div>
            <label className="text-xs font-medium text-muted-custom mb-1.5 block">Phone</label>
            <input value={form.phone} onChange={e => set('phone', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-solid text-main border outline-none transition-all focus:shadow-glow"
              style={{ borderColor: 'var(--border)' }} />
          </div>
          {/* Role */}
          <div>
            <label className="text-xs font-medium text-muted-custom mb-1.5 block">Role</label>
            <select value={form.role} onChange={e => set('role', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-solid text-main border outline-none transition-all focus:shadow-glow appearance-none"
              style={{ borderColor: 'var(--border)' }}>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          {/* Gender */}
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-custom mb-2 block">Gender</label>
            <div className="flex gap-2">
              {['Male', 'Female', 'Other'].map(g => (
                <button key={g} onClick={() => set('gender', g)}
                  className="flex-1 py-2 rounded-xl text-sm font-medium border transition-all"
                  style={{
                    borderColor: form.gender === g ? 'var(--primary)' : 'var(--border)',
                    background: form.gender === g ? 'rgba(var(--primary-rgb),0.1)' : 'transparent',
                    color: form.gender === g ? 'var(--primary)' : 'var(--text-muted)',
                  }}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          {/* Status */}
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-custom mb-2 block">Status</label>
            <div className="flex gap-2">
              {[{ l: 'Active', v: true }, { l: 'Inactive', v: false }].map(s => (
                <button key={s.l} onClick={() => set('status', s.v)}
                  className="flex-1 py-2 rounded-xl text-sm font-medium border transition-all"
                  style={{
                    borderColor: form.status === s.v ? 'var(--primary)' : 'var(--border)',
                    background: form.status === s.v ? 'rgba(var(--primary-rgb),0.1)' : 'transparent',
                    color: form.status === s.v ? 'var(--primary)' : 'var(--text-muted)',
                  }}>
                  {s.l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:bg-[var(--border)]"
            style={{ borderColor: 'var(--border)', color: 'var(--text-main)' }}>
            Cancel
          </button>
          <button onClick={() => { onSave(form); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-glow"
            style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
            Save Changes
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

// ── Status Toggle ──
const StatusToggle = ({ active, onChange }) => (
  <button onClick={() => onChange(!active)}
    className="relative w-11 h-6 rounded-full transition-colors duration-300"
    style={{ background: active ? 'var(--primary)' : 'var(--border)' }}>
    <motion.span
      className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md"
      animate={{ x: active ? 20 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  </button>
);

// ── Main Component ──
const StudentList = () => {
  const [students, setStudents] = useState(SAMPLE_STUDENTS);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [infoUser, setInfoUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState('All');

  const uniqueRoles = useMemo(() => ['All', ...new Set(students.map(u => u.role))], [students]);

  const filtered = useMemo(() =>
    students.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      return matchesSearch && matchesRole;
    }), [students, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleStatus = (id) => setStudents(prev => prev.map(u => u.id === id ? { ...u, status: !u.status } : u));
  const handleDelete = (id) => setStudents(prev => prev.filter(u => u.id !== id));
  const handleSave = (updated) => setStudents(prev => prev.map(u => u.id === updated.id ? updated : u));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-surface rounded-2xl p-5 shadow-glass">
        <div>
          <h1 className="text-2xl font-bold text-main flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
              <Users size={18} />
            </div>
            Student List
          </h1>
          <p className="text-sm text-muted-custom mt-1">Manage all students in your system</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-custom">
          <Link to="/" className="hover:text-main transition-colors flex items-center gap-1">
            <Home size={13} /> Home
          </Link>
          <ChevronRight size={12} />
          <span>Students</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }} className="font-medium">List</span>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-custom">Show</span>
          <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
            className="px-3 py-2 rounded-xl text-sm bg-surface-solid text-main border outline-none transition-all focus:shadow-glow appearance-none cursor-pointer"
            style={{ borderColor: 'var(--border)' }}>
            {[5, 10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="text-sm text-muted-custom">entries</span>
          <span className="text-sm text-muted-custom ml-3">Role</span>
          <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-xl text-sm bg-surface-solid text-main border outline-none transition-all focus:shadow-glow appearance-none cursor-pointer"
            style={{ borderColor: 'var(--border)' }}>
            {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-custom" />
          <input
            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search students..."
            className="pl-9 pr-4 py-2.5 rounded-xl text-sm bg-surface-solid text-main border outline-none transition-all focus:shadow-glow w-full sm:w-72"
            style={{ borderColor: 'var(--border)' }}
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
        className="glass-surface rounded-2xl shadow-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['#', 'Student', 'Username', 'Phone', 'Role', 'Gender', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-muted-custom uppercase tracking-wider">{h}</th>
                ))}
                </tr>
            </thead>
            <tbody>
              {paginated.map((user, i) => (
                <motion.tr key={user.id}
                  variants={fadeUp} initial="hidden" animate="visible" custom={i + 3}
                  className="group transition-colors duration-200"
                  style={{ borderBottom: '1px solid var(--border)' }}
                  whileHover={{ backgroundColor: 'rgba(var(--primary-rgb),0.04)' }}>
                  {/* # */}
                  <td className="px-5 py-4 font-mono-nums text-muted-custom">{(page - 1) * perPage + i + 1}</td>
                  {/* Student */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-main text-sm">{user.name}</p>
                        <p className="text-xs text-muted-custom">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  {/* Username */}
                  <td className="px-5 py-4 text-main font-medium">@{user.username}</td>
                  {/* Phone */}
                  <td className="px-5 py-4 text-muted-custom font-mono-nums text-xs">{user.phone}</td>
                  {/* Role */}
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                      style={{
                        background: roleBadgeStyle(user.role).bg,
                        color: roleBadgeStyle(user.role).text,
                        border: `1px solid ${roleBadgeStyle(user.role).border}`,
                      }}>
                      {user.role}
                    </span>
                  </td>
                  {/* Gender */}
                  <td className="px-5 py-4 text-muted-custom">{user.gender}</td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusToggle active={user.status} onChange={() => toggleStatus(user.id)} />
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      {[
                        { icon: Edit3, tip: 'Edit', onClick: () => setEditUser(user), color: 'var(--primary)' },
                        { icon: Info, tip: 'Info', onClick: () => setInfoUser(user), color: 'var(--secondary)' },
                        { icon: Trash2, tip: 'Delete', onClick: () => setDeleteUser(user), color: '#EF4444' },
                      ].map(({ icon: Icon, tip, onClick, color }) => (
                        <button key={tip} onClick={onClick} title={tip}
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                          style={{ color }}
                          onMouseEnter={e => e.currentTarget.style.background = `${color}15`}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Icon size={16} />
                        </button>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-muted-custom">No students found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs text-muted-custom">
            Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1}
              className="p-2 rounded-lg transition-colors disabled:opacity-30" style={{ color: 'var(--text-muted)' }}>
              <ChevronsLeft size={16} />
            </button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-2 rounded-lg transition-colors disabled:opacity-30" style={{ color: 'var(--text-muted)' }}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
              Math.max(0, page - 3), Math.min(totalPages, page + 2)
            ).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className="w-8 h-8 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: p === page ? 'var(--primary)' : 'transparent',
                  color: p === page ? '#fff' : 'var(--text-muted)',
                }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-2 rounded-lg transition-colors disabled:opacity-30" style={{ color: 'var(--text-muted)' }}>
              <ChevronRight size={16} />
            </button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
              className="p-2 rounded-lg transition-colors disabled:opacity-30" style={{ color: 'var(--text-muted)' }}>
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {infoUser && <InfoModal user={infoUser} onClose={() => setInfoUser(null)} />}
        {deleteUser && <DeleteModal user={deleteUser} onClose={() => setDeleteUser(null)} onConfirm={handleDelete} />}
        {editUser && <EditModal user={editUser} onClose={() => setEditUser(null)} onSave={handleSave} />}
      </AnimatePresence>
    </div>
  );
};

export default StudentList;