import { Shield } from 'lucide-react';
import RoleRow from './RoleRow';

const RoleTable = ({ roles, onEdit, onDelete }) => (
  <div className="rounded-2xl border overflow-hidden shadow-glass"
    style={{ background: 'var(--surface-solid)', borderColor: 'var(--border)' }}>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ background: 'rgba(var(--primary-rgb), 0.04)', borderBottom: '1px solid var(--border)' }}>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-custom">Display Name</th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-custom">Name</th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-custom">Description</th>
            <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-custom">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? roles.map((role, i) => (
            <RoleRow key={role.id} role={role} index={i} onEdit={onEdit} onDelete={onDelete} />
          )) : (
            <tr>
              <td colSpan={4} className="text-center py-16">
                <Shield size={40} className="mx-auto mb-3" style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
                <p className="text-muted-custom text-sm">No roles found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default RoleTable;
