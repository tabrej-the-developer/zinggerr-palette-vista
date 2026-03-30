import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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

const RoleModal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => (
  <AnimatePresence>
    {isOpen && (
      <Backdrop onClose={onClose}>
        <div className={`${maxWidth} mx-auto rounded-2xl shadow-glass border overflow-hidden`}
          style={{ background: 'var(--surface-solid)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-lg font-semibold text-main">{title}</h3>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[rgba(var(--primary-rgb),0.1)]">
              <X size={18} className="text-muted-custom" />
            </button>
          </div>
          <div className="px-6 py-5">
            {children}
          </div>
        </div>
      </Backdrop>
    )}
  </AnimatePresence>
);

export default RoleModal;
