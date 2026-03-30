import { AlertTriangle } from 'lucide-react';
import RoleModal from './RoleModal';

const DeleteRoleModal = ({ isOpen, onClose, role, onDelete }) => {
  const handleDelete = () => {
    onDelete(role.id);
    onClose();
  };

  return (
    <RoleModal isOpen={isOpen} onClose={onClose} title="Delete Role" maxWidth="max-w-md">
      <div className="text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
          style={{ background: 'rgba(239,68,68,0.1)' }}>
          <AlertTriangle size={28} style={{ color: '#EF4444' }} />
        </div>
        <div>
          <p className="text-main font-semibold text-base">Are you sure you want to delete this role?</p>
          {role && (
            <p className="text-muted-custom text-sm mt-1">
              Role "<span className="font-medium text-main">{role.displayName}</span>" will be permanently removed.
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <button onClick={onClose}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-custom transition-all hover:bg-[rgba(var(--primary-rgb),0.05)]">
          Cancel
        </button>
        <button onClick={handleDelete}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>
          Delete Role
        </button>
      </div>
    </RoleModal>
  );
};

export default DeleteRoleModal;
