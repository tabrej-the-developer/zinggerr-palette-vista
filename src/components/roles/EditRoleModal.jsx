import { useState, useEffect } from 'react';
import RoleModal from './RoleModal';

const inputStyle = {
  background: 'var(--surface)',
  borderColor: 'var(--border)',
  color: 'var(--text-main)',
};

const EditRoleModal = ({ isOpen, onClose, role, onUpdate }) => {
  const [form, setForm] = useState({ displayName: '', name: '', description: '' });

  useEffect(() => {
    if (role) {
      setForm({ displayName: role.displayName, name: role.name, description: role.description });
    }
  }, [role]);

  const handleUpdate = () => {
    if (!form.displayName.trim() || !form.name.trim()) return;
    onUpdate({ ...role, ...form });
    onClose();
  };

  return (
    <RoleModal isOpen={isOpen} onClose={onClose} title="Edit Role">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-custom mb-1.5">Display Name</label>
          <input
            type="text"
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2"
            style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-custom mb-1.5">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2"
            style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-custom mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all resize-none focus:outline-none focus:ring-2"
            style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <button onClick={onClose}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-custom transition-all hover:bg-[rgba(var(--primary-rgb),0.05)]">
          Cancel
        </button>
        <button onClick={handleUpdate}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-glow hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
          Update Role
        </button>
      </div>
    </RoleModal>
  );
};

export default EditRoleModal;
