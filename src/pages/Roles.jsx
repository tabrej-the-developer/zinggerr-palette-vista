import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Plus, Shield, Home, ChevronRight } from 'lucide-react';
import RoleTable from '@/components/roles/RoleTable';
import CreateRoleModal from '@/components/roles/CreateRoleModal';
import EditRoleModal from '@/components/roles/EditRoleModal';
import DeleteRoleModal from '@/components/roles/DeleteRoleModal';

const INITIAL_ROLES = [
  { id: 1, displayName: 'Super Admin', name: 'super_admin', description: 'Full system access with all permissions' },
  { id: 2, displayName: 'Admin', name: 'admin', description: 'Manage users, courses, and settings' },
  { id: 3, displayName: 'Faculty', name: 'faculty', description: 'Create and manage courses and grades' },
  { id: 4, displayName: 'Student', name: 'student', description: 'Access enrolled courses and materials' },
  { id: 5, displayName: 'Moderator', name: 'moderator', description: 'Moderate discussions and content' },
];

const Roles = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [deleteRole, setDeleteRole] = useState(null);

  const filtered = useMemo(() =>
    roles.filter(r =>
      r.displayName.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase())
    ), [roles, search]);

  const handleCreate = (newRole) => {
    setRoles(prev => [...prev, { ...newRole, id: Date.now() }]);
  };

  const handleUpdate = (updated) => {
    setRoles(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleDelete = (id) => {
    setRoles(prev => prev.filter(r => r.id !== id));
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
          <span className="text-main font-medium">Roles</span>
        </div>

        <div className="glass-surface rounded-2xl p-6 shadow-glass">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-main">Roles</h1>
              <p className="text-sm text-muted-custom mt-0.5">Manage roles and permissions</p>
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
          <Plus size={16} /> Add Role
        </motion.button>

        <div className="relative w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-custom pointer-events-none" />
          <input
            type="text"
            placeholder="Search roles..."
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
        <RoleTable roles={filtered} onEdit={setEditRole} onDelete={setDeleteRole} />
      </motion.div>

      {/* Modals */}
      <CreateRoleModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onSave={handleCreate} />
      <EditRoleModal isOpen={!!editRole} onClose={() => setEditRole(null)} role={editRole} onUpdate={handleUpdate} />
      <DeleteRoleModal isOpen={!!deleteRole} onClose={() => setDeleteRole(null)} role={deleteRole} onDelete={handleDelete} />
    </div>
  );
};

export default Roles;
