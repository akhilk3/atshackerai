import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-400 tracking-tight">
          ATShacker.ai
        </div>
        <nav>
          {/* CHANGED: Swapped /app to /dashboard */}
          <Link 
            href="/dashboard" 
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all font-medium shadow-[0_0_20px_rgba(79,70,229,0.3)]"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto text-center px-6 pt-24 pb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Beating the System Just Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Intelligent</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Stop letting robotic Applicant Tracking Systems ghost your resume. 
          Tailor, optimize, and clear the filters in less than 60 seconds.
        </p>

        {/* CHANGED: Swapped /app to /dashboard */}
        <Link 
          href="/dashboard" 
          className="inline-block px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20"
        >
          Get Started Free
        </Link>
      </main>

      {/* Rest of your Features / Motto / Vision grids stay exactly the same below... */}
    </div>
  );
}