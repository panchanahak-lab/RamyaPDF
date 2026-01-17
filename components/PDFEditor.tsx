
import React, { useState, useEffect, useRef } from 'react';
import { 
  Type, 
  Pencil, 
  Highlighter, 
  Trash2, 
  Download, 
  Share2, 
  Plus, 
  Layers, 
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  MousePointer2,
  FileSearch,
  CheckCircle2,
  X,
  Copy,
  Check,
  Loader2,
  Files,
  ArrowRight,
  FileArchive,
  Image,
  FileText,
  Scissors,
  Settings,
  RefreshCw,
  Crop,
  Stamp,
  LayoutGrid,
  Send,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  Clock,
  Cloud,
  FilePlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { performOCR, summarizePDF, chatWithPDF } from '../services/geminiService';

interface PDFEditorProps {
  fileName: string;
  tool: string;
  onClose: () => void;
}

const ProcessingView = ({ tool, fileName, onClose }: { tool: string, fileName: string, onClose: () => void }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const startProcessing = () => {
    setIsProcessing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 10;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setIsProcessing(false);
        setIsComplete(true);
      }
      setProgress(p);
    }, 200);
  };

  const getToolIcon = () => {
    if (tool.includes('Compress')) return <FileArchive className="w-12 h-12 text-blue-500" />;
    if (tool.includes('Merge')) return <Files className="w-12 h-12 text-green-500" />;
    if (tool.includes('Split')) return <Scissors className="w-12 h-12 text-red-400" />;
    if (tool.includes('Convert') || tool.includes('to')) return <RefreshCw className="w-12 h-12 text-purple-500" />;
    if (tool.includes('Create')) return <FilePlus className="w-12 h-12 text-purple-500" />;
    return <Settings className="w-12 h-12 text-slate-500" />;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="p-12 text-center">
          <div className="bg-slate-50 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            {getToolIcon()}
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{tool}</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Process <span className="font-bold text-slate-900 dark:text-white">{fileName}</span> securely in the cloud.</p>

          {!isProcessing && !isComplete && (
            <div className="space-y-6">
              {tool.includes('Compress') && (
                <div className="flex justify-center gap-4">
                  {['Low', 'Medium', 'High'].map((level) => (
                    <button key={level} className="px-6 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group">
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-red-600">{level}</div>
                      <div className="text-xs text-slate-400">Compression</div>
                    </button>
                  ))}
                </div>
              )}
              
              {tool.includes('Merge') && (
                 <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                   <div className="flex flex-col items-center gap-2 text-slate-400">
                     <Plus className="w-8 h-8" />
                     <span className="font-bold text-sm">Add more files to merge</span>
                   </div>
                 </div>
              )}

              <button 
                onClick={startProcessing}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-900/20 transition-all w-full md:w-auto"
              >
                Start {tool}
              </button>
            </div>
          )}

          {isProcessing && (
            <div className="max-w-md mx-auto space-y-4">
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-red-600"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm font-bold text-slate-400 animate-pulse">Processing document...</p>
            </div>
          )}

          {isComplete && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-green-500 font-bold bg-green-50 dark:bg-green-900/20 py-2 rounded-lg max-w-xs mx-auto">
                <CheckCircle2 className="w-5 h-5" />
                <span>Success!</span>
              </div>
              <div className="flex gap-4 justify-center">
                 <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Download className="w-4 h-4" /> Download File
                 </button>
                 <button onClick={() => { setIsProcessing(false); setIsComplete(false); }} className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Start Over
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- New Components ---

const TextToolbar = () => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700 shadow-xl"
  >
    <div className="flex items-center gap-1 border-r border-slate-700 pr-2">
      <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"><Bold className="w-3.5 h-3.5" /></button>
      <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"><Italic className="w-3.5 h-3.5" /></button>
    </div>
    <div className="flex items-center gap-1 border-r border-slate-700 pr-2">
      <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"><AlignLeft className="w-3.5 h-3.5" /></button>
      <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"><AlignCenter className="w-3.5 h-3.5" /></button>
      <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"><AlignRight className="w-3.5 h-3.5" /></button>
    </div>
    <select className="bg-transparent text-xs text-white font-bold outline-none cursor-pointer w-16">
      <option value="12">12 px</option>
      <option value="14">14 px</option>
      <option value="16">16 px</option>
      <option value="18">18 px</option>
    </select>
    <div className="w-4 h-4 rounded-full bg-red-500 border border-white/20 cursor-pointer"></div>
  </motion.div>
);

const ChatInterface = ({ analysisContext }: { analysisContext: string }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await chatWithPDF(analysisContext, userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="text-center text-slate-500 text-xs mt-10">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Ask anything about your document.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
              m.role === 'user' 
                ? 'bg-red-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-300 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none">
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 relative">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your question..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-10 text-xs text-white placeholder:text-slate-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="absolute right-2 top-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---

const PDFEditor: React.FC<PDFEditorProps> = ({ fileName, tool, onClose }) => {
  const isProcessingTool = ['Compress', 'Merge', 'Split', 'Convert', 'to', 'OCR', 'Create'].some(t => tool.includes(t) || tool.includes('Word') || tool.includes('Excel') || tool.includes('JPG'));

  if (isProcessingTool && tool !== 'OCR') {
    return <ProcessingView tool={tool} fileName={fileName} onClose={onClose} />;
  }

  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'draw' | 'highlight'>('select');
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiMode, setAiMode] = useState<'summary' | 'chat'>('summary');
  const [isCopied, setIsCopied] = useState(false);
  const [comments, setComments] = useState<{id: string, user: string, text: string, time: string}[]>([]);

  // Mock Context for AI
  const mockTextContext = "RamyaPDF Service Agreement. This document outlines the terms and conditions for premium usage, data privacy protocols, and intellectual property rights. Users agree to the secure processing of their documents via our encrypted cloud infrastructure.";

  // Set initial tool state based on the passed tool prop
  useEffect(() => {
    if (tool === 'Fill & Sign') setActiveTool('draw');
    if (tool === 'Edit') setActiveTool('text');
  }, [tool]);

  const handleAiAnalyze = async () => {
    setIsAiLoading(true);
    setAiAnalysis(null);
    
    try {
      const summary = await summarizePDF(mockTextContext);
      setAiAnalysis(summary);
    } catch (error) {
      setAiAnalysis("Analysis failed. Please check your API key.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCopy = async () => {
    if (aiAnalysis) {
      await navigator.clipboard.writeText(aiAnalysis);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const addComment = () => {
    const newComment = {
      id: Math.random().toString(36),
      user: 'You',
      text: 'Need to review this section.',
      time: 'Just now'
    };
    setComments([...comments, newComment]);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 dark:bg-slate-950 flex flex-col text-white transition-colors duration-500">
      {/* Editor Header */}
      <div className="h-16 bg-slate-800 dark:bg-slate-900/50 border-b border-slate-700 dark:border-slate-800 flex items-center justify-between px-6 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight truncate max-w-[200px]">{fileName}</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] text-red-500 font-black uppercase tracking-widest flex items-center gap-1">
                 {tool} Workspace
               </span>
               <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 ml-2">
                 <Cloud className="w-3 h-3" /> Saved to Cloud
               </span>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900/50 dark:bg-black/20 p-1.5 rounded-2xl border border-slate-700 dark:border-slate-800">
              {[
                { id: 'select', icon: MousePointer2 },
                { id: 'text', icon: Type },
                { id: 'draw', icon: Pencil },
                { id: 'highlight', icon: Highlighter }
              ].map(t => (
                <button 
                  key={t.id}
                  onClick={() => setActiveTool(t.id as any)}
                  className={`p-2.5 rounded-xl transition-all ${activeTool === t.id ? 'bg-red-600 shadow-lg shadow-red-900/20' : 'hover:bg-slate-700 dark:hover:bg-slate-800'}`}
                >
                  <t.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
            
            {/* Contextual Toolbar */}
            <AnimatePresence>
              {activeTool === 'text' && <TextToolbar />}
            </AnimatePresence>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 bg-slate-700 dark:bg-slate-800 hover:bg-slate-600 px-4 py-2 rounded-xl text-xs font-black transition-all">
             <Clock className="w-3.5 h-3.5" /> History
          </button>
          <button className="hidden sm:flex items-center gap-2 bg-slate-700 dark:bg-slate-800 hover:bg-slate-600 px-5 py-2 rounded-xl text-sm font-black transition-all">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 px-5 py-2 rounded-xl text-sm font-black transition-all shadow-xl shadow-red-900/20">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Pages */}
        <div className="w-72 bg-slate-800 dark:bg-slate-900/30 border-r border-slate-700 dark:border-slate-800 hidden lg:flex flex-col p-6 gap-6 overflow-y-auto">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center justify-between">
            Page Layout
            <button onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')} className="p-1 hover:text-white transition-colors">
              <LayoutGrid className={`w-4 h-4 ${viewMode === 'grid' ? 'text-red-500' : ''}`} />
            </button>
          </h3>
          {[1, 2, 3, 4].map(num => (
            <motion.div 
              key={num}
              whileHover={{ scale: 1.02 }}
              onClick={() => { setPage(num); setViewMode('single'); }}
              className={`aspect-[3/4] bg-white rounded-2xl cursor-pointer ring-2 transition-all p-2 flex items-center justify-center text-slate-400 text-xs font-black relative overflow-hidden group
                ${page === num ? 'ring-red-600 bg-red-50' : 'ring-transparent hover:ring-slate-600'}`}
            >
              <div className="bg-slate-100 w-full h-full rounded-xl flex items-center justify-center border border-slate-200">
                Page {num}
              </div>
              
              {tool === 'Delete Pages' && (
                <div className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-3 h-3" />
                </div>
              )}
              
              {page === num && (
                <div className="absolute inset-0 bg-red-600/5 pointer-events-none"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-slate-900 dark:bg-slate-950 overflow-auto relative p-12 items-center transition-colors duration-500">
          
          {viewMode === 'single' ? (
            <>
              {/* Zoom Controls Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-800/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-700 dark:border-slate-800 rounded-2xl px-6 py-3 flex items-center gap-6 shadow-3xl z-10 border-white/5">
                <button onClick={() => setZoom(z => Math.max(z - 10, 50))} className="hover:text-red-500 transition-colors"><ZoomOut className="w-5 h-5" /></button>
                <span className="text-sm font-black tracking-widest min-w-[60px] text-center">{zoom}%</span>
                <button onClick={() => setZoom(z => Math.min(z + 10, 300))} className="hover:text-red-500 transition-colors"><ZoomIn className="w-5 h-5" /></button>
                <div className="w-px h-6 bg-slate-700 dark:bg-slate-800 mx-2"></div>
                <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="hover:text-red-500 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <span className="text-sm font-black tracking-widest px-2">{page} / 4</span>
                <button onClick={() => setPage(p => Math.min(p + 1, 4))} className="hover:text-red-500 transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>

              {/* Document Canvas Placeholder */}
              <motion.div 
                layout
                className="bg-white shadow-3xl rounded-xl origin-top transition-all duration-500 border border-slate-100 overflow-hidden relative" 
                style={{ 
                  width: '800px', 
                  height: '1100px', 
                  transform: `scale(${zoom / 100})` 
                }}
              >
                {tool === 'Crop' && (
                  <div className="absolute inset-20 border-2 border-red-500 border-dashed z-20 pointer-events-none">
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4 border-red-500"></div>
                    <div className="absolute -top-3 -right-3 w-6 h-6 border-t-4 border-r-4 border-red-500"></div>
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-4 border-l-4 border-red-500"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4 border-red-500"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white font-bold px-4 py-2 rounded-full text-xs shadow-xl">
                      Crop Area
                    </div>
                  </div>
                )}

                <div className="p-24 text-slate-800 space-y-8 h-full relative">
                  <div className="absolute top-10 right-10 text-[8px] text-slate-300 font-black tracking-[0.5em] uppercase pointer-events-none">RamyaPDF Secure Engine</div>
                  <h1 className="text-4xl font-black border-b border-slate-200 pb-8 tracking-tighter">Enterprise Master Agreement</h1>
                  <p className="text-base leading-relaxed font-medium">This high-fidelity rendering simulation represents our proprietary PDF layout engine. In production, this layer provides frame-perfect vector rendering for all your professional documents.</p>
                  
                  <div className="space-y-4">
                    <div className="h-1 bg-red-600/20 w-1/4 rounded-full"></div>
                    <p className="text-sm leading-relaxed text-slate-600">The underlying engine supports SVG path manipulation, text reflow optimization, and real-time collaborative state syncing via CRDT protocol.</p>
                  </div>

                  <div className="h-64 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 italic text-sm font-bold relative group">
                    <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    [ Interactive Dynamic Content Surface ]
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signee A</span>
                        <div className={`h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-300 italic ${tool === 'Fill & Sign' ? 'ring-2 ring-red-500 bg-red-50 text-red-400' : ''}`}>
                          {tool === 'Fill & Sign' ? 'Sign Here' : 'Signature Placeholder'}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signee B</span>
                        <div className="h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-300 italic">Signature Placeholder</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <div className="w-full h-full p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-red-500" /> Page Organizer</h2>
              <div className="grid grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className="space-y-3 group cursor-pointer" onClick={() => { setPage(num); setViewMode('single'); }}>
                    <div className="aspect-[3/4] bg-white rounded-xl relative shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                      <div className="absolute top-2 left-2 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold">{num}</div>
                    </div>
                  </div>
                ))}
                <div className="aspect-[3/4] border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer">
                  <div className="text-center text-slate-500">
                    <Plus className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest">Add Page</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - AI & Collaboration */}
        <div className="w-80 bg-slate-800 dark:bg-slate-900 border-l border-slate-700 dark:border-slate-800 flex flex-col hidden xl:flex">
          <div className="flex bg-slate-900/20">
            <button 
              onClick={() => setAiMode('summary')}
              className={`flex-1 py-5 text-xs font-black border-b-2 flex items-center justify-center gap-2 tracking-widest uppercase transition-colors
              ${aiMode === 'summary' ? 'border-red-500 bg-slate-700/50 dark:bg-red-950/20' : 'border-transparent hover:bg-slate-700/50 text-slate-500'}`}
            >
              <Sparkles className={`w-4 h-4 ${aiMode === 'summary' ? 'text-red-500' : ''}`} /> AI Analysis
            </button>
            <button 
              onClick={() => setAiMode('chat')}
              className={`flex-1 py-5 text-xs font-black border-b-2 flex items-center justify-center gap-2 tracking-widest uppercase transition-colors
              ${aiMode === 'chat' ? 'border-red-500 bg-slate-700/50 dark:bg-red-950/20' : 'border-transparent hover:bg-slate-700/50 text-slate-500'}`}
            >
              <MessageSquare className={`w-4 h-4 ${aiMode === 'chat' ? 'text-red-500' : ''}`} /> AI Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {aiMode === 'summary' ? (
              <div className="bg-slate-900/50 dark:bg-black/20 rounded-[2rem] p-6 border border-slate-700 dark:border-slate-800 shadow-inner">
                <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4 flex items-center justify-between tracking-widest">
                  Document Summary
                  <Sparkles className="w-3 h-3 text-red-500" />
                </h4>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAiAnalyze}
                  disabled={isAiLoading}
                  className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 disabled:opacity-70 transition-all shadow-xl shadow-red-900/20 min-h-[44px]"
                >
                  {isAiLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                      >
                        Summarizing...
                      </motion.span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Summarize Content
                    </div>
                  )}
                </motion.button>

                <AnimatePresence>
                  {aiAnalysis && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 text-xs leading-relaxed text-slate-300 font-medium bg-slate-800/50 p-5 rounded-2xl border border-slate-700 relative group/summary overflow-hidden"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <p className="font-black text-red-500 uppercase tracking-widest text-[9px]">Gemini Summary</p>
                        <button 
                          onClick={handleCopy}
                          className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-400 hover:text-white"
                          title="Copy to clipboard"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <div className="text-slate-300">
                        {aiAnalysis}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent pointer-events-none"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Chat Interface
              <div className="bg-slate-900/50 dark:bg-black/20 rounded-[2rem] p-4 border border-slate-700 dark:border-slate-800 shadow-inner h-full">
                <ChatInterface analysisContext={mockTextContext} />
              </div>
            )}

            <div className="pt-6 border-t border-slate-700 dark:border-slate-800 space-y-6">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Comment Stream</h4>
              {comments.length === 0 ? (
                <p className="text-xs text-slate-500 font-medium italic">Collaborate by leaving a comment on any selection.</p>
              ) : (
                <div className="space-y-4">
                  {comments.map(c => (
                    <motion.div 
                      key={c.id} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-900/40 dark:bg-black/20 p-4 rounded-2xl border border-slate-700 dark:border-slate-800"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-red-500 tracking-wider uppercase">{c.user}</span>
                        <span className="text-[9px] text-slate-500 font-bold">{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">{c.text}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                onClick={addComment}
                className="w-full border-2 border-dashed border-slate-700 hover:border-slate-500 py-3 rounded-2xl text-[10px] font-black text-slate-500 hover:text-slate-300 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
              >
                <Plus className="w-3 h-3" /> Insert Insight
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFEditor;
