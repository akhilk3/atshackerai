'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Home() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Firebase Google OAuth Sign-In Handler
  const handleGoogleSignIn = async () => {
    setAuthError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        // Automatically route straight to our real application matrix
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('OAuth Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup closed before completion. Please try again.');
      } else {
        setAuthError(err.message || 'Authentication failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-indigo-500/30 flex flex-col justify-between">
      
      {/* Header Area */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          atshacker.ai
        </span>
        {!showLogin ? (
          <button 
            onClick={() => setShowLogin(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-sm transition tracking-wide shadow-lg shadow-indigo-600/20"
          >
            Launch Console
          </button>
        ) : (
          <button 
            onClick={() => setShowLogin(false)}
            className="text-xs font-medium text-slate-400 hover:text-slate-300 transition"
          >
            Back to Home
          </button>
        )}
      </header>

      {/* Main Dynamic Viewport */}
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
        
        {!showLogin ? (
          /* STANDARD HERO VIEW */
          <div className="space-y-8 animate-fade-in">
            <span className="px-3 py-1 text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 uppercase tracking-widest inline-flex items-center gap-1.5">
              ⚡ Next-Generation AI Keyword Parsing Optimization
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-3xl mx-auto">
              Stop getting filtered by cold HR bots. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hack the ATS screen.
              </span>
            </h1>
            <p className="text-slate-400 md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
              "AI tells your score humans Resource fix your resume according to profile and skills"
            </p>
            <div className="pt-4">
              <button
                onClick={() => setShowLogin(true)}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold rounded-xl text-sm transition-all tracking-wide shadow-xl shadow-indigo-600/20 hover:scale-[1.02]"
              >
                Test Your Resume Score Now
              </button>
            </div>
          </div>
        ) : (
          /* UNIFIED SECURE OAUTH LOGIN PORT */
          <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
            <span className="block text-lg font-black tracking-tight text-indigo-400 mb-1">
              atshacker.ai
            </span>
            <h2 className="text-2xl font-bold mb-2 text-white">
              Sign In
            </h2>
            <p className="text-slate-400 text-xs mb-8 max-w-xs mx-auto">
              "AI tells your score humans Resource fix your resume according to profile and skills"
            </p>
            
            {authError && (
              <p className="text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg mb-4 text-left">
                {authError}
              </p>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 disabled:bg-slate-200 text-slate-900 font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-3 shadow-lg shadow-white/5 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loading ? 'Connecting Sync...' : 'Continue with Google'}</span>
            </button>
          </div>
        )}

      </main>

      {/* Footer Area */}
      <footer className="text-center py-6 text-xs text-slate-600 border-t border-t-slate-900/40 bg-slate-950/20">
        © 2026 ATShacker.ai. All rights reserved. Managed with pure Gemini Core integrations.
      </footer>
    </div>
  );
}