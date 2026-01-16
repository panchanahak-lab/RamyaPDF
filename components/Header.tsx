
import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Sun, 
  Moon, 
  ChevronDown, 
  Image, 
  FileEdit, 
  Presentation, 
  Table, 
  Code, 
  ShieldCheck, 
  Files, 
  Scissors, 
  FileArchive, 
  RotateCw, 
  Stamp, 
  PenTool, 
  Lock,
  FileMinus,
  FileInput,
  Type,
  Binary,
  Crop,
  Layers,
  Unlock,
  EyeOff,
  History,
  Zap,
  SquareMousePointer,
  Wrench,
  ScanText,
  Scaling,
  MousePointer2,
  Trash2,
  Maximize2
} from 'lucide-react';
import { User as UserType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  user: UserType | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAuth: () => void;
  onNavigate: (view: 'home' | 'dashboard') => void;
  onToolClick: (toolName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, theme, onToggleTheme, onOpenAuth, onNavigate, onToolClick }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const allToolsMenu = [
    {
      title: "RECENT",
      icon: History,
      items: [
        { name: "Compress", icon: FileArchive, color: "text-blue-500" },
        { name: "Edit", icon: FileEdit, color: "text-purple-500" },
        { name: "Extract Pages", icon: FileInput, color: "text-red-500" },
        { name: "Merge", icon: Files, color: "text-green-500" }
      ]
    },
    {
      title: "MERGE",
      items: [
        { name: "Merge", icon: Files, color: "text-green-500" },
        { name: "Alternate & Mix", icon: Layers, color: "text-green-600" },
        { name: "Organize", icon: SquareMousePointer, color: "text-green-700" }
      ]
    },
    {
      title: "SPLIT",
      items: [
        { name: "Extract Pages", icon: FileInput, color: "text-red-500" },
        { name: "Split by pages", icon: Scissors, color: "text-red-400" },
        { name: "Split in half", icon: ColumnsIcon, color: "text-red-600" },
        { name: "Split by size", icon: Maximize2, color: "text-red-700" }
      ]
    },
    {
      title: "EDIT & SIGN",
      items: [
        { name: "Edit", icon: FileEdit, color: "text-purple-500" },
        { name: "Fill & Sign", icon: PenTool, color: "text-purple-600" },
        { name: "Create Forms", icon: MousePointer2, color: "text-purple-400" },
        { name: "Delete Pages", icon: Trash2, color: "text-purple-700" }
      ]
    },
    {
      title: "SECURITY",
      items: [
        { name: "Protect", icon: Lock, color: "text-slate-800" },
        { name: "Unlock", icon: Unlock, color: "text-slate-600" },
        { name: "Watermark", icon: Stamp, color: "text-slate-500" },
        { name: "Flatten", icon: Layers, color: "text-slate-400" }
      ]
    },
    {
      title: "CONVERT FROM PDF",
      items: [
        { name: "PDF to Excel", icon: Table, color: "text-green-600" },
        { name: "PDF to JPG", icon: Image, color: "text-amber-500" },
        { name: "PDF to Word", icon: FileText, color: "text-blue-500" },
        { name: "PDF to Text", icon: Type, color: "text-slate-500" }
      ]
    },
    {
      title: "OTHER",
      items: [
        { name: "Bates Numbering", icon: Binary, color: "text-pink-500" },
        { name: "Crop", icon: Crop, color: "text-pink-400" },
        { name: "Header & Footer", icon: Type, color: "text-pink-600" },
        { name: "Grayscale", icon: EyeOff, color: "text-pink-700" },
        { name: "Repair", icon: Wrench, color: "text-pink-800" },
        { name: "Resize", icon: Scaling, color: "text-pink-300" }
      ]
    }
  ];

  return (
    <header 
      className="sticky top-0 z-[100] w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 h-16 flex items-center justify-between transition-all duration-500"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="flex items-center gap-6 h-full">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="bg-red-600 p-1.5 rounded-lg">
            <FileText className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">RamyaPDF</span>
        </motion.div>

        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-slate-600 dark:text-slate-400 h-full">
          <button 
            className="hover:text-red-600 dark:hover:text-red-500 transition-colors h-full flex items-center gap-1.5 px-2"
            onMouseEnter={() => setActiveMenu('allTools')}
          >
            All Tools <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === 'allTools' ? 'rotate-180' : ''}`} />
          </button>
          
          {["Compress", "Edit", "Fill & Sign", "Merge", "Delete Pages", "Crop"].map(tool => (
            <button 
              key={tool} 
              onClick={() => onToolClick(tool)}
              className="hover:text-red-600 dark:hover:text-red-500 transition-colors px-2"
            >
              {tool}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6 text-[13px] font-semibold mr-4">
          <button className="hover:text-red-600 dark:hover:text-red-500">Desktop</button>
        </nav>

        <button 
          onClick={onToggleTheme}
          className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {user ? (
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <img src={user.avatar} className="w-8 h-8 rounded-full" alt="Avatar" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button onClick={onOpenAuth} className="text-[13px] font-semibold text-slate-600 dark:text-slate-400">Log in</button>
            <button 
              onClick={onOpenAuth}
              className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-[13px] font-bold shadow-sm"
            >
              Sign up
            </button>
          </div>
        )}
      </div>

      {/* Megamenu Dropdown */}
      <AnimatePresence>
        {activeMenu === 'allTools' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 shadow-2xl border-b border-slate-200 dark:border-slate-800"
            onMouseEnter={() => setActiveMenu('allTools')}
          >
            <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
              {allToolsMenu.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    {section.icon && <section.icon className="w-3.5 h-3.5" />}
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <button 
                          onClick={() => {
                            onToolClick(item.name);
                            setActiveMenu(null);
                          }}
                          className="flex items-center gap-2.5 group w-full text-left"
                        >
                          <item.icon className={`w-3.5 h-3.5 ${item.color} opacity-80 group-hover:opacity-100`} />
                          <span className="text-[13px] text-slate-700 dark:text-slate-300 group-hover:text-red-600 transition-colors">
                            {item.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 py-3 px-8 text-center">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                Automate your workflow with <span className="text-red-600 font-bold">RamyaWorkflows</span> • New
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const ColumnsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="12" x2="12" y1="3" y2="21"/></svg>
);

export default Header;
