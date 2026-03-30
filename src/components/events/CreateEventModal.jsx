import { useState } from 'react';
import RoleModal from '@/components/roles/RoleModal';

const inputStyle = {
  background: 'var(--surface)',
  borderColor: 'var(--border)',
  color: 'var(--text-main)',
};

const emptyForm = { title: '', bgColor: '#6C8CFF', textColor: '#FFFFFF', startDate: '', endDate: '', description: '' };

const CreateEventModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({ ...emptyForm });

  const handleSave = () => {
    if (!form.title.trim() || !form.startDate || !form.endDate) return;
    onSave(form);
    setForm({ ...emptyForm });
    onClose();
  };

  const handleClose = () => {
    setForm({ ...emptyForm });
    onClose();
  };

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <RoleModal isOpen={isOpen} onClose={handleClose} title="Create Event" maxWidth="max-w-xl">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
        <Field label="Title">
          <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
            placeholder="Event title" className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2"
            style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Background Color">
            <div className="flex items-center gap-2">
              <input type="color" value={form.bgColor} onChange={e => set('bgColor', e.target.value)}
                className="w-10 h-10 rounded-lg border cursor-pointer" style={{ borderColor: 'var(--border)' }} />
              <input type="text" value={form.bgColor} onChange={e => set('bgColor', e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2"
                style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }} />
            </div>
          </Field>
          <Field label="Text Color">
            <div className="flex items-center gap-2">
              <input type="color" value={form.textColor} onChange={e => set('textColor', e.target.value)}
                className="w-10 h-10 rounded-lg border cursor-pointer" style={{ borderColor: 'var(--border)' }} />
              <input type="text" value={form.textColor} onChange={e => set('textColor', e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2"
                style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }} />
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Start Date & Time">
            <input type="datetime-local" value={form.startDate} onChange={e => set('startDate', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2"
              style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }} />
          </Field>
          <Field label="End Date & Time">
            <input type="datetime-local" value={form.endDate} onChange={e => set('endDate', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2"
              style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }} />
          </Field>
        </div>

        <Field label="Description">
          <textarea value={form.description} onChange={e => set('description', e.target.value)}
            placeholder="Describe the event..." rows={4}
            className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all resize-none focus:outline-none focus:ring-2"
            style={{ ...inputStyle, '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)' }} />
        </Field>

        {/* Preview */}
        <Field label="Preview">
          <div className="rounded-xl p-4 text-sm font-medium" style={{ backgroundColor: form.bgColor, color: form.textColor }}>
            {form.title || 'Event Title'}
          </div>
        </Field>
      </div>

      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <button onClick={handleClose}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-custom transition-all hover:bg-[rgba(var(--primary-rgb),0.05)]">
          Cancel
        </button>
        <button onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-glow hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
          Create Event
        </button>
      </div>
    </RoleModal>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-muted-custom mb-1.5">{label}</label>
    {children}
  </div>
);

export default CreateEventModal;
