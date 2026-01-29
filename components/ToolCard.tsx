
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  isLocked?: boolean;
  badge?: string | null;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon: Icon, color, onClick, badge, isLocked }) => {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onClick}
      className={`group relative bg-white dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-all cursor-pointer flex items-center gap-3.5 ${isLocked ? 'grayscale-[0.5]' : 'hover:border-red-400 hover:shadow-lg'}`}
    >
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all flex-shrink-0`}>
        {isLocked ? <div className="text-slate-400"><Icon className="w-5 h-5" /></div> : <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />}
      </div>

      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-[13px] leading-tight group-hover:text-red-600 transition-colors truncate flex items-center gap-1">
          {title}
          {isLocked && <span className="text-xs">🔒</span>}
        </h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>

      {badge && !isLocked && (
        <span className={`absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${badge === 'ENTERPRISE' ? 'bg-slate-800 text-white dark:bg-slate-700' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
          {badge}
        </span>
      )}
    </motion.div>
  );
};

export default ToolCard;
