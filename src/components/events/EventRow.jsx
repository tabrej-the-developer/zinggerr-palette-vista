import { Pencil, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const formatDateTime = (dt) => {
  if (!dt) return '';
  const d = new Date(dt);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const EventRow = ({ event, onEdit, onDelete }) => {
  return (
    <>
      <td className="px-5 py-4">
        <span className="font-semibold text-main">{event.title}</span>
      </td>
      <td className="px-5 py-4">
        <div className="text-xs text-muted-custom space-y-0.5">
          <div>{formatDateTime(event.startDate)}</div>
          <div className="text-[10px] text-muted-custom opacity-60">to</div>
          <div>{formatDateTime(event.endDate)}</div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger>
              <div className="w-7 h-7 rounded-lg border shadow-sm" style={{ backgroundColor: event.bgColor, borderColor: 'var(--border)' }} />
            </TooltipTrigger>
            <TooltipContent>Background: {event.bgColor}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="w-7 h-7 rounded-lg border shadow-sm flex items-center justify-center text-[9px] font-bold"
                style={{ backgroundColor: event.textColor, borderColor: 'var(--border)', color: event.bgColor }}>
                A
              </div>
            </TooltipTrigger>
            <TooltipContent>Text: {event.textColor}</TooltipContent>
          </Tooltip>
        </div>
      </td>
      <td className="px-5 py-4 max-w-[220px]">
        <p className="text-muted-custom text-xs truncate">{event.description}</p>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => onEdit(event)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[rgba(var(--primary-rgb),0.1)]">
                <Pencil size={15} style={{ color: 'var(--primary)' }} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => onDelete(event)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-red-50">
                <Trash2 size={15} className="text-red-400" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>
      </td>
    </>
  );
};

export default EventRow;
