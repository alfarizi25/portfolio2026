import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-12">
      <div className="bg-[#FF006E] border-4 border-black p-8 shadow-brutalist relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-white uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Welcome back.</h1>
          <p className="text-black bg-[#FFD23F] inline-block px-4 py-2 border-brutalist font-bold shadow-brutalist-sm">
            Logged in as {user?.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border-4 border-black bg-white shadow-brutalist flex flex-col items-start gap-4 hover-brutalist transition-all group">
          <div className="w-16 h-16 bg-[#06D6A0] border-4 border-black shadow-brutalist-sm flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Projects</h2>
          <p className="text-lg font-bold text-zinc-600 mb-4">
            Manage your design and photography portfolio.
          </p>
          <a href="/admin/projects" className="px-6 py-3 bg-black text-white font-black uppercase tracking-widest text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,210,63,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(255,210,63,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
            View Projects &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
