'use client';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function AllInOneApp() {
  // Navigation & Session State
  const [step, setStep] = useState<'login' | 'dashboard'>('login');
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState('');

  // Diagnostics State
  const [jd, setJd] = useState('');
  const [fileText, setFileText] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);

  // Firebase Google OAuth Sign-In Handler
  const handleGoogleSignIn = async () => {
    setAuthError('');
    const provider = new GoogleAuthProvider();
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setStep('dashboard');
    } catch (err: any) {
      console.error('OAuth Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup closed before completion. Please try again.');
      } else {
        setAuthError(err.message || 'Authentication failed. Please verify your connection.');
      }
    }
  };

  // Log Out Handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setStep('login');
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  // Resume File Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileText(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  // Execute Real AI Vector Score Sweep via Backend Secure Routing
  const handleExecuteSweep = async () => {
    if (!jd || !fileText) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jd: jd,
          resumeText: fileText,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis request rejected by server array.');
      }

      const data = await response.json();
      setResult({
        score: data.score,
        feedback: data.feedback,
      });
    } catch (err: any) {
      console.error('Sweep Failure:', err);
      setResult({
        score: 0,
        feedback: `[CRITICAL EXEGESIS ERROR]: Failed to map AI pipeline.\nVerify your GEMINI_API_KEY is configured inside your .env.local file environment.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-indigo-500/30">
      
      {/* Global Header */}
      <header className="border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            atshacker.ai
          </span>
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 uppercase tracking-widest">
            Console v1.0
          </span>
        </div>
        {step === 'dashboard' && (
          <div className="flex items-center space-x-4">
            {user?.photoURL && (
              <img src={user.photoURL} alt="Avatar" className="w-6 h-6 rounded-full border border-slate-700" />
            )}
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">{user?.displayName || user?.email}</span>
            <button 
              onClick={handleSignOut}
              className="text-xs font-medium text-rose-400 hover:text-rose-300 transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
        
        {/* OAUTH LOGIN OVERLAY */}
        {step === 'login' && (
          <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-sm text-center">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Access the Terminal
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              Authenticate via secure identity provider to unlock the application diagnostics suite.
            </p>
            
            {authError && (
              <p className="text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg mb-4 text-left">
                {authError}
              </p>
            )}

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-3 shadow-lg shadow-white/5 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        )}

        {/* PROTECTED DASHBOARD TERMINAL */}
        {step === 'dashboard' && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Form Submissions */}
            <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Target Job Description</h3>
                <p className="text-xs text-slate-400">Paste the core structural requirements of your targeted role.</p>
                <textarea
                  placeholder="Paste Job Description requirements here..."
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 placeholder-slate-700 focus:outline-none focus:border-indigo-500 transition resize-none mt-3"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-1">Upload Profile Matrix</h3>
                <p className="text-xs text-slate-400">Provide your plaintext resume blueprint file (.txt / .md).</p>
                
                <div className="mt-3 relative border border-dashed border-slate-800 hover:border-slate-700 transition rounded-xl bg-slate-950/40 group">
                  <input
                    type="file"
                    accept=".txt,.md"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="p-8 text-center space-y-2">
                    <span className="block text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition">
                      {fileName || 'Select resume blueprint file'}
                    </span>
                    <span className="block text-xs text-slate-500">
                      Plaintext formats map straight to parser architectures
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleExecuteSweep}
                disabled={loading || !fileText || !jd}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 font-bold rounded-xl text-sm transition tracking-wide shadow-lg"
              >
                {loading ? 'Processing Array Matrices...' : 'Execute Vector Score Sweep'}
              </button>
            </div>

            {/* Right Column: Dynamic System Diagnostics */}
            <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm min-h-[460px] flex flex-col justify-between space-y-6">
              {result ? (
                <div className="space-y-6 flex-1">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-bold uppercase tracking-wider text-xs text-indigo-400">Calculated ATS Score Match</h3>
                    <span className={`text-2xl font-black font-mono ${result.score >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {result.score}%
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Flagged Vector Gaps</h4>
                    <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">
                      {result.feedback}
                    </div>
                  </div>

                  {/* PREMIUM 1:1 CALL-TO-ACTION UPGRADE OFFER */}
                  {result.score < 85 && (
                    <div className="border border-amber-500/30 bg-amber-500/5 p-5 rounded-xl space-y-4 mt-4 animate-fade-in">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide">Shape Your Resume with AI & HR 1:1</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Unlock full premium structural adjustments, complete portfolio restructuring, and 
                            <strong className="text-white"> 1 Full Year of dedicated referral support</strong> to bypass standard filtering protocols.
                          </p>
                        </div>
                        <span className="text-sm font-black font-mono text-white bg-amber-500/20 border border-amber-500/30 px-2 py-1 rounded">
                          ₹499/yr
                        </span>
                      </div>

                      <div className="border-t border-slate-800/80 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="font-mono text-[11px] text-slate-400 space-y-0.5">
                          <div><span className="text-slate-500">UPI ID:</span> 9347521606@ybl</div>
                          <div><span className="text-slate-500">NAME:</span> Kethiri Akhil</div>
                        </div>
                        
                        <a 
                          href="upi://pay?pa=9347521606@ybl&pn=Kethiri%20Akhil&am=499&cu=INR"
                          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold rounded-lg text-center transition tracking-wide active:scale-95"
                        >
                          Pay via UPI
                        </a>
                      </div>

                      <p className="text-[10px] font-mono text-slate-500 text-center border-t border-slate-900 pt-2">
                        ➔ Send UTR transaction receipt on WhatsApp along with your resume blueprint file to complete processing.
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                    <span className="text-indigo-400 font-mono text-sm">&lt;/&gt;</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1 text-slate-200">Terminal Awaiting Data Array</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Provide a targeted job profile and load your resume matrix to map algorithmic compliance scores.
                  </p>
                </div>
              )}

              <footer className="border-t border-slate-800/60 pt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>SYSTEM ENVIRONMENT: LOCALHOST</span>
                <span>OAUTH COMPLIANCE VERIFIED</span>
              </footer>
            </div>

          </div>
        )}
      </main>

      <footer className="text-center py-6 text-xs text-slate-600 border-t border-t-slate-900/60 bg-slate-950">
        © 2026 ATShacker.ai. All rights reserved. Managed with pure Firebase Core integration.
      </footer>
    </div>
  );
}