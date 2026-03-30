import { motion } from 'framer-motion';
import { Edit3, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.3, ease: 'easeOut' } }),
};

const RoleRow = ({ role, index, onEdit, onDelete }) => (
  <motion.tr
    custom={index}
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    className="group transition-colors"
    style={{ borderBottom: '1px solid var(--border)' }}
    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(var(--primary-rgb), 0.03)'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
  >
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white"
          style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
          {role.displayName.charAt(0)}
        </div>
        <span className="font-semibold text-sm text-main">{role.displayName}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <code className="text-xs px-2.5 py-1 rounded-lg font-mono"
        style={{ background: 'rgba(var(--primary-rgb), 0.08)', color: 'var(--primary)' }}>
        {role.name}
      </code>
    </td>
    <td className="px-6 py-4 text-sm text-muted-custom max-w-xs truncate">{role.description}</td>
    <td className="px-6 py-4">
      <div className="flex items-center justify-end gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={() => onEdit(role)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(var(--primary-rgb), 0.1)'; e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
              <Edit3 size={15} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={() => onDelete(role)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#EF4444'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
              <Trash2 size={15} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </div>
    </td>
  </motion.tr>
);

export default RoleRow;
