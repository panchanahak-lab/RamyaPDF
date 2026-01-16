
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, BarChart, Layout, X, Check, ChevronRight, MousePointerClick } from 'lucide-react';

interface CookieConsentProps {
  onNavigate: (view: 'privacy') => void;
  isOpenManual: boolean;
  onCloseManual: () => void;
}

type CookieCategory = 'essential' | 'analytics' | 'functional' | 'marketing';

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'ramyapdf_cookie_consent';

const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigate, isOpenManual, onCloseManual }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [consent, setConsent] = useState<ConsentState>({
    essential: true, // Always true
    analytics: false,
    functional: false,
    marketing: false
  });

  // Check storage on mount
  useEffect(() => {
    const storedConsent = localStorage.getItem(STORAGE_KEY);
    if (!storedConsent) {
      // Small delay for better UX on load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      const parsedConsent = JSON.parse(storedConsent);
      setConsent(parsedConsent);
      handleScriptInjection(parsedConsent);
    }
  }, []);

  // Handle manual opening from footer
  useEffect(() => {
    if (isOpenManual) {
      const storedConsent = localStorage.getItem(STORAGE_KEY);
      if (storedConsent) {
        setConsent(JSON.parse(storedConsent));
      }
      setShowSettings(true);
    }
  }, [isOpenManual]);

  const handleScriptInjection = (preferences: ConsentState) => {
    // Logic to enable/disable scripts based on preferences
    if (preferences.analytics) {
      console.log('✅ Google Analytics initialized (Mock)');
      // Real implementation would look like:
      // window.dataLayer = window.dataLayer || [];
      // function gtag(){dataLayer.push(arguments);}
      // gtag('js', new Date());
      // gtag('config', 'G-XXXXXXXX');
    } else {
      console.log('🚫 Google Analytics blocked');
      // Logic to remove cookies if needed
    }
  };

  const savePreferences = (newConsent: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    handleScriptInjection(newConsent);
    setIsVisible(false);
    setShowSettings(false);
    if (onCloseManual) onCloseManual();
  };

  const handleAcceptAll = () => {
    const allAccepted: ConsentState = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true
    };
    savePreferences(allAccepted);
  };

  const handleRejectNonEssential = () => {
    const rejected: ConsentState = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false
    };
    savePreferences(rejected);
  };

  const toggleCategory = (category: CookieCategory) => {
    if (category === 'essential') return;
    setConsent(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const openPrivacy = () => {
    onNavigate('privacy');
    setIsVisible(false); // Temporarily hide banner if navigating away, though usually banners stay until action
  };

  return (
    <>
      {/* Main Banner */}
      <AnimatePresence>
        {isVisible && !showSettings && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6"
          >
            <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
                   <Cookie className="w-5 h-5 text-red-600" />
                   <span>We value your privacy</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  RamyaPDF uses cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. 
                  We respect your data rights under the <span className="font-semibold text-slate-900 dark:text-white">DPDP Act 2023</span>. 
                  You can manage your preferences at any time.
                  <button onClick={openPrivacy} className="ml-1 text-red-600 hover:underline font-medium">Read Privacy Policy</button>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  Customize
                </button>
                <button 
                  onClick={handleRejectNonEssential}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
                >
                  Reject All
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/20 transition-colors whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-950 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Cookie Preferences</h2>
                </div>
                <button 
                  onClick={() => {
                    setShowSettings(false);
                    if (onCloseManual) onCloseManual();
                    // If no consent exists yet, show banner again
                    if (!localStorage.getItem(STORAGE_KEY)) setIsVisible(true);
                  }}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage your cookie settings below. Essential cookies are required for the website to function properly and cannot be disabled.
                </p>

                {/* Essential */}
                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="mt-1">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">Strictly Essential</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">Required</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                      Necessary for security, authentication, and payment processing (Razorpay). These cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="mt-1">
                    <BarChart className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">Performance & Analytics</h3>
                      <button 
                        onClick={() => toggleCategory('analytics')}
                        className={`w-11 h-6 rounded-full transition-colors relative ${consent.analytics ? 'bg-red-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${consent.analytics ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Helps us understand how you use RamyaPDF via Google Analytics, allowing us to improve features and performance.
                    </p>
                  </div>
                </div>

                {/* Functional */}
                <div className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="mt-1">
                    <Layout className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">Functional</h3>
                      <button 
                        onClick={() => toggleCategory('functional')}
                        className={`w-11 h-6 rounded-full transition-colors relative ${consent.functional ? 'bg-red-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${consent.functional ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Saves your UI preferences like dark mode, language settings, and recent tool configurations.
                    </p>
                  </div>
                </div>

                 {/* Marketing */}
                 <div className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="mt-1">
                    <MousePointerClick className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">Marketing</h3>
                      <button 
                        onClick={() => toggleCategory('marketing')}
                        className={`w-11 h-6 rounded-full transition-colors relative ${consent.marketing ? 'bg-red-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${consent.marketing ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
                <button 
                  onClick={() => {
                    setShowSettings(false);
                    if (onCloseManual) onCloseManual();
                    if (!localStorage.getItem(STORAGE_KEY)) setIsVisible(true);
                  }}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => savePreferences(consent)}
                  className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/20 transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
