import { useState } from 'react';
import RoleModal from './RoleModal';

const inputStyle = {
  background: 'var(--surface)',
  borderColor: 'var(--border)',
  color: 'var(--text-main)',
};

const CreateRoleModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({ displayName: '', name: '', description: '' });

  const handleSave = () => {
    if (!form.displayName.trim() || !form.name.trim()) return;
    onSave(form);
    setForm({ displayName: '', name: '', description: '' });
    onClose();
  };

  const handleClose = () => {
    setForm({ displayName: '', name: '', description: '' });
    onClose();
  };

  return (
    <RoleModal isOpen={isOpen} onClose={handleClose} title="Create New Role">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-custom mb-1.5">Display Name</label>
          <input
            type="text"
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
            placeholder="e.g. Super Admin"
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
            placeholder="e.g. super_admin"
            className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2"
            style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-custom mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe the role's purpose..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all resize-none focus:outline-none focus:ring-2"
            style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <button onClick={handleClose}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-custom transition-all hover:bg-[rgba(var(--primary-rgb),0.05)]">
          Cancel
        </button>
        <button onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-glow hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
          Save Role
        </button>
      </div>
    </RoleModal>
  );
};

export default CreateRoleModal;
