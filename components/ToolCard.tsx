
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  isPremium?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon: Icon, color, onClick, isPremium }) => {
  return (
    <motion.div 
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onClick}
      className="group relative bg-white dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-red-400 hover:shadow-lg transition-all cursor-pointer flex items-center gap-3.5"
    >
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
        <Icon className={`w-4 h-4 ${color.replace('bg-', 'text-')}`} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-[13px] leading-tight group-hover:text-red-600 transition-colors truncate">
          {title}
        </h3>
      </div>

      {isPremium && (
        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
          NEW
        </span>
      )}
    </motion.div>
  );
};

export default ToolCard;
