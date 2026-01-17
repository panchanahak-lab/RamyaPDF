
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ToolCard from './components/ToolCard';
import PDFEditor from './components/PDFEditor';
import CookieConsent from './components/CookieConsent';
import { TermsOfService, PrivacyPolicy, Disclaimer, SecurityCompliance } from './components/LegalContent';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileEdit, 
  FileArchive, 
  Files, 
  Scissors, 
  Type, 
  ShieldCheck, 
  PenTool, 
  Image, 
  FileText,
  Cloud,
  Clock,
  LayoutDashboard,
  Zap,
  CheckCircle,
  Crown,
  UploadCloud,
  Lock,
  Globe,
  Plus,
  ArrowRight,
  Sparkles as SparklesIcon,
  FileX,
  FileUp,
  LayoutGrid,
  Camera,
  Wrench,
  ScanText,
  Presentation,
  Table,
  Code,
  RotateCw,
  Binary,
  Stamp,
  Crop,
  Unlock,
  EyeOff,
  Columns,
  Layers,
  SquareMousePointer,
  FileInput,
  Trash2,
  Scaling,
  MousePointer2,
  Grid3X3,
  Languages,
  X,
  Check,
  Cookie,
  Shield,
  FilePlus
} from 'lucide-react';
import { User, UserFile } from './types';

type AppView = 'home' | 'dashboard' | 'terms' | 'privacy' | 'disclaimer' | 'compliance';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [user, setUser] = useState<User | null>(null);
  const [activeEditorFile, setActiveEditorFile] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [hasConsented, setHasConsented] = useState(false);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [pendingTool, setPendingTool] = useState<string | null>(null);

  useEffect(() => {
    const hours = new Date().getHours();
    const isNightTime = hours >= 19 || hours < 7;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = isNightTime || systemPrefersDark ? 'dark' : 'light';
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const handleToolClick = (toolName: string) => {
    if (!user) {
      setPendingTool(toolName);
      setIsAuthModalOpen(true);
      return;
    }
    setActiveTool(toolName);
    setActiveEditorFile(`Sample_${toolName.replace(/\s+/g, '_')}.pdf`);
  };

  const closeEditor = () => {
    setActiveEditorFile(null);
    setActiveTool(null);
  };

  const handleAuth = () => {
    // In a real app, validation would occur here.
    // For demo purposes, we proceed if manual consent is checked or if coming from social buttons (implicit)
    
    setUser({
      id: '1',
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      avatar: 'https://picsum.photos/100/100?random=10',
      plan: 'free'
    });
    setIsAuthModalOpen(false);

    // Redirect to the tool the user originally tried to access
    if (pendingTool) {
      setActiveTool(pendingTool);
      setActiveEditorFile(`Sample_${pendingTool.replace(/\s+/g, '_')}.pdf`);
      setPendingTool(null);
    }
  };

  const dashboardFiles: UserFile[] = [
    { id: '1', name: 'Contract_Draft.pdf', size: '2.4 MB', uploadedAt: new Date(), type: 'pdf', status: 'ready' },
    { id: '2', name: 'Identity_Card_Scan.jpg', size: '1.1 MB', uploadedAt: new Date(), type: 'jpg', status: 'completed' },
    { id: '3', name: 'Financial_Report_2023.pdf', size: '12.8 MB', uploadedAt: new Date(), type: 'pdf', status: 'ready' }
  ];

  const toolCategories = [
    {
      name: "Merge & Split",
      tools: [
        { name: "Merge", icon: Files, color: "bg-green-500", desc: "Combine multiple PDFs." },
        { name: "Split", icon: Scissors, color: "bg-red-400", desc: "Separate a PDF into parts." },
        { name: "Alternate & Mix", icon: Layers, color: "bg-green-600", desc: "Mix pages from two PDFs." },
        { name: "Organize", icon: SquareMousePointer, color: "bg-green-700", desc: "Reorder or move pages." },
        { name: "Extract Pages", icon: FileInput, color: "bg-red-500", desc: "Save pages as new PDF." },
        { name: "Split by bookmarks", icon: Code, color: "bg-red-600", desc: "Split at bookmark points." },
      ]
    },
    {
      name: "Edit & Sign",
      tools: [
        { name: "Create PDF", icon: FilePlus, color: "bg-purple-500", desc: "Start a new document." },
        { name: "Edit", icon: FileEdit, color: "bg-purple-500", desc: "Modify text and images." },
        { name: "Fill & Sign", icon: PenTool, color: "bg-purple-600", desc: "Complete and sign docs." },
        { name: "Create Forms", icon: MousePointer2, color: "bg-purple-400", desc: "Build interactive PDF forms." },
        { name: "Delete Pages", icon: Trash2, color: "bg-purple-700", desc: "Remove unwanted pages." },
        { name: "Grayscale", icon: EyeOff, color: "bg-slate-500", desc: "Remove color from documents." },
        { name: "Flatten", icon: Layers, color: "bg-slate-400", desc: "Render annotations into PDF." },
      ]
    },
    {
      name: "Convert PDF",
      tools: [
        { name: "PDF to Word", icon: FileText, color: "bg-blue-600", desc: "Export to editable Word." },
        { name: "PDF to Excel", icon: Table, color: "bg-green-600", desc: "Extract data to sheets." },
        { name: "PDF to JPG", icon: Image, color: "bg-amber-500", desc: "Pages to high-res images." },
        { name: "PDF to Text", icon: Type, color: "bg-slate-600", desc: "Extract raw plain text." },
        { name: "Word to PDF", icon: FileText, color: "bg-blue-400", desc: "Convert docx to PDF." },
        { name: "JPG to PDF", icon: Image, color: "bg-amber-400", desc: "Images to document." },
        { name: "Excel to PDF", icon: Table, color: "bg-emerald-500", desc: "Convert spreadsheets to PDF." },
        { name: "Text to PDF", icon: Type, color: "bg-slate-700", desc: "Convert plain text to PDF." },
      ]
    },
    {
      name: "Other Tools",
      tools: [
        { name: "Compress", icon: FileArchive, color: "bg-blue-500", desc: "Reduce file size." },
        { name: "Crop", icon: Crop, color: "bg-pink-400", desc: "Trim page margins." },
        { name: "Resize", icon: Scaling, color: "bg-pink-300", desc: "Change page dimensions." },
        { name: "Watermark", icon: Stamp, color: "bg-slate-500", desc: "Add logo or text stamp." },
        { name: "Bates Numbering", icon: Binary, color: "bg-pink-500", desc: "Index for legal docs." },
        { name: "OCR", icon: ScanText, color: "bg-indigo-500", desc: "Make scans searchable." },
      ]
    }
  ];

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-700 overflow-x-hidden selection:bg-red-500 selection:text-white">
      <Header 
        user={user} 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAuth={() => setIsAuthModalOpen(true)} 
        onNavigate={(v) => setView(v as AppView)} 
        onToolClick={handleToolClick}
      />

      <main className="flex-1 z-10">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <section className="pt-20 pb-16 px-4 text-center max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-red-100 dark:border-red-900/20">
                  <CheckCircle className="w-3 h-3" /> Free Forever
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                  100% Free PDF Editor. <br className="hidden md:block" />
                  <span className="text-red-600 relative inline-block">
                    Sign Up for Free Access.
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-200 dark:text-red-900/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                       <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                  Edit, merge, and sign documents in seconds. No watermarks, no hidden fees—just powerful PDF tools ready when you are.
                </p>

                <div className="flex flex-col items-center gap-6">
                  <button 
                    onClick={() => handleToolClick('Edit')}
                    className="bg-red-600 hover:bg-red-700 text-white text-lg md:text-xl font-bold py-4 px-10 rounded-2xl shadow-xl shadow-red-600/20 transition-all hover:scale-105 hover:-translate-y-1 flex items-center gap-3"
                  >
                    <UploadCloud className="w-6 h-6" />
                    Upload PDF to Edit
                  </button>

                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> Secure processing</span>
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> No credit card needed</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-green-500" /> Files deleted after 2h</span>
                  </div>
                </div>
              </section>

              <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="space-y-16">
                  {toolCategories.map((category) => (
                    <div key={category.name} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{category.name}</h2>
                        <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {category.tools.map((tool) => (
                          <ToolCard 
                            key={tool.name}
                            title={tool.name}
                            description={tool.desc}
                            icon={tool.icon}
                            color={tool.color}
                            onClick={() => handleToolClick(tool.name)}
                            isPremium={(tool as any).isPremium}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-slate-50 dark:bg-slate-900/50 py-20 mt-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto"><Lock className="w-6 h-6" /></div>
                    <h3 className="font-bold text-lg dark:text-white">Secure Processing</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Files stay private. Automatically deleted after 2 hours.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"><Languages className="w-6 h-6" /></div>
                    <h3 className="font-bold text-lg dark:text-white">Multi-Language</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Supporting over 20 languages for a global workflow.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto"><Cloud className="w-6 h-6" /></div>
                    <h3 className="font-bold text-lg dark:text-white">Cloud Integrated</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Import/Export directly from Google Drive or Dropbox.</p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-7xl mx-auto px-4 md:px-8 py-16"
            >
              <div className="flex flex-col md:flex-row gap-12">
                <aside className="w-full md:w-64 space-y-8">
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 text-white font-bold rounded-xl text-sm shadow-md">
                      <LayoutDashboard className="w-4 h-4" /> My Documents
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-semibold">
                      <Clock className="w-4 h-4" /> History
                    </button>
                  </div>
                </aside>

                <div className="flex-1 space-y-8">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold dark:text-white">Your Workspace</h1>
                    <button onClick={() => { setActiveTool('Edit'); setActiveEditorFile('New.pdf'); }} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700 shadow-sm">
                      <UploadCloud className="w-5 h-5" /> Upload PDF
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Size</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {dashboardFiles.map(file => (
                          <tr key={file.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 flex items-center gap-3">
                              <FileText className="w-4 h-4 text-red-500" />
                              <span className="font-semibold dark:text-slate-200">{file.name}</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500">{file.size}</td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => handleToolClick('Edit')} className="text-red-600 font-bold hover:underline">Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'terms' && <motion.div key="terms" variants={pageVariants}><TermsOfService /></motion.div>}
          {view === 'privacy' && <motion.div key="privacy" variants={pageVariants}><PrivacyPolicy /></motion.div>}
          {view === 'disclaimer' && <motion.div key="disclaimer" variants={pageVariants}><Disclaimer /></motion.div>}
          {view === 'compliance' && <motion.div key="compliance" variants={pageVariants}><SecurityCompliance /></motion.div>}
        </AnimatePresence>
      </main>

      <footer className="bg-slate-950 text-slate-500 py-16 px-4 md:px-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-red-600 p-1 rounded-lg"><FileText className="text-white w-4 h-4" /></div>
                <span className="text-white font-bold text-lg">RamyaPDF</span>
              </div>
              <p className="text-sm leading-relaxed">Secure, efficient, and AI-powered document tools for professionals across India and the globe.</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Solutions</h4>
              <ul className="text-sm space-y-2">
                <li><button onClick={() => setView('home')} className="hover:text-red-500">All Tools</button></li>
                <li><button className="hover:text-red-500">API Integration</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><button onClick={() => setView('terms')} className="hover:text-red-500">Terms of Service</button></li>
                <li><button onClick={() => setView('privacy')} className="hover:text-red-500">Privacy Policy</button></li>
                <li><button onClick={() => setView('disclaimer')} className="hover:text-red-500">Disclaimer</button></li>
                <li><button onClick={() => setIsCookieSettingsOpen(true)} className="hover:text-red-500">Cookie Preferences</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">&copy; 2026 RamyaPDF Inc. Based in Odisha, India.</p>
            <div className="flex gap-6 text-xs font-semibold">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">Github</a>
            </div>
          </div>
        </div>
      </footer>

      {activeEditorFile && activeTool && (
        <PDFEditor 
          fileName={activeEditorFile} 
          tool={activeTool}
          onClose={closeEditor} 
        />
      )}

      {/* Global Cookie Consent System */}
      <CookieConsent 
        onNavigate={(viewName) => setView(viewName)} 
        isOpenManual={isCookieSettingsOpen}
        onCloseManual={() => setIsCookieSettingsOpen(false)}
      />

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[120] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-slate-900 p-10 rounded-3xl w-full max-w-md relative shadow-2xl border border-slate-200 dark:border-slate-800">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
            
            <div className="text-center mb-8">
              <div className="bg-red-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="text-white w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black dark:text-white">Join RamyaPDF</h2>
              <p className="text-slate-500 text-sm mt-2">Professional document tools at your fingertips.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                <input type="email" placeholder="sarah@company.com" className="w-full p-4 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-red-500 transition-all outline-none" />
              </div>

              {/* Legal Consent Checkbox */}
              <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => setHasConsented(!hasConsented)}
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 transition-all flex items-center justify-center
                    ${hasConsented ? 'bg-red-600 border-red-600' : 'border-slate-300 dark:border-slate-700'}`}
                >
                  {hasConsented && <Check className="w-3.5 h-3.5 text-white stroke-[4]" />}
                </button>
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  By continuing, I agree to RamyaPDF's {' '}
                  <button onClick={() => { setIsAuthModalOpen(false); setView('terms'); }} className="text-red-600 font-bold hover:underline">Terms of Service</button>
                  {' '} and {' '}
                  <button onClick={() => { setIsAuthModalOpen(false); setView('privacy'); }} className="text-red-600 font-bold hover:underline">Privacy Policy</button>.
                </p>
              </div>

              <button 
                onClick={handleAuth} 
                disabled={!hasConsented}
                className={`w-full py-4 rounded-2xl font-black text-sm transition-all shadow-lg
                  ${hasConsented 
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-900/20' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'}`}
              >
                Create Account
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-400 tracking-widest"><span className="bg-white dark:bg-slate-900 px-3">or social</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleAuth} className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-[12px] font-bold">
                  <Globe className="w-4 h-4 text-slate-400" /> Google
                </button>
                <button onClick={handleAuth} className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-[12px] font-bold">
                  <Cloud className="w-4 h-4 text-slate-400" /> Apple
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default App;
