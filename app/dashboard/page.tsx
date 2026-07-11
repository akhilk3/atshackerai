'use client';

import { useState } from 'react';

export default function DashboardPage() {
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jd || !resume) return alert('Please provide both a Job Description and a Resume.');

    setLoading(true);
    
    // Simulate ATS scanning analysis
    setTimeout(() => {
      setLoading(false);
      setScore(72); // Example simulated score
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white font-sans p-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
          <h1 className="text-2xl font-bold text-indigo-400">ATShacker Workspace</h1>
          <div className="text-sm bg-gray-800 px-4 py-2 rounded-lg text-gray-300">
            Console Mode
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Inputs Panel */}
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleAnalyze} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Job Description</label>
                <textarea
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste the target job description here to analyze hidden keywords..."
                  className="w-full h-48 bg-gray-950 border border-gray-800 rounded-xl p-4 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload Your Current Resume</label>
                <div className="border-2 border-dashed border-gray-800 rounded-xl p-6 text-center hover:border-indigo-500/50 transition-colors cursor-pointer relative bg-gray-950">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <p className="text-sm text-gray-400">
                    {resume ? `Selected: ${resume.name}` : 'Drag & drop your CV here, or click to browse'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Supports PDF or DOCX up to 5MB</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 transition-all text-center"
              >
                {loading ? 'Analyzing Keywords & Matching Context...' : 'Scan & Calculate ATS Match Score'}
              </button>
            </form>
          </div>

          {/* Metrics & Action Panel */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
              <h3 className="text-sm font-medium text-gray-400 mb-4">ATS Compatibility Score</h3>
              
              <div className="w-36 h-36 mx-auto rounded-full border-4 border-gray-800 flex items-center justify-center mb-4 relative">
                <span className="text-4xl font-extrabold tracking-tight">
                  {score !== null ? `${score}%` : '--'}
                </span>
              </div>

              {score !== null && (
                <div className="space-y-4">
                  <p className="text-xs text-amber-400 bg-amber-500/10 py-2 rounded-lg border border-amber-500/20">
                    {score < 85 ? 'Critical structural deficits found.' : 'Excellent optimization tier.'}
                  </p>
                  
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all text-sm"
                  >
                    Unlock Human Expert Tune-Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Manual UPI Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-2 text-indigo-400">Unlock Premium Human Tuning</h3>
            <p className="text-sm text-gray-400 mb-6">
              Get your resume completely restructured and aligned manually by senior technical talent recruiters.
            </p>

            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment Mode:</span>
                <span className="font-semibold text-white">PhonePe UPI</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">UPI Number:</span>
                <span className="font-semibold text-emerald-400 tracking-wider">9347521606</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Amount:</span>
                <span className="font-bold text-white">₹599 INR</span>
              </div>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-4 text-xs text-indigo-300 space-y-2 mb-6">
              <p className="font-semibold">Verification Steps:</p>
              <ol className="list-decimal pl-4 space-y-1 text-gray-300">
                <li>Send exactly ₹599 using PhonePe to the number above.</li>
                <li>Copy your transaction UTR number.</li>
                <li>Share your UTR proof and your resume file directly to us on WhatsApp to begin the manual override processing.</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors"
              >
                Close
              </button>
              <a
                href="https://wa.me/919347521606"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-center transition-colors"
              >
                Send via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}