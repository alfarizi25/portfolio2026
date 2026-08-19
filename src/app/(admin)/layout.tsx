import { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Admin Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#3A86FF] border-b-4 md:border-b-0 md:border-r-4 border-black p-8 flex flex-col justify-between shadow-[8px_0_0_0_rgba(0,0,0,1)] z-10">
        <div>
          <div className="font-display text-3xl font-black tracking-tighter mb-12 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
            ABDEE.<br/><span className="text-[#FFD23F] text-xl font-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] tracking-widest">ADMIN</span>
          </div>
          <nav className="flex flex-col gap-4">
            <Link 
              href="/admin" 
              className="px-4 py-3 bg-white text-black font-black uppercase tracking-widest text-sm border-4 border-black shadow-brutalist-sm hover-brutalist-sm text-center"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/projects" 
              className="px-4 py-3 bg-white text-black font-black uppercase tracking-widest text-sm border-4 border-black shadow-brutalist-sm hover-brutalist-sm text-center"
            >
              Projects
            </Link>
            <Link 
              href="/" 
              target="_blank"
              className="px-4 py-3 bg-[#06D6A0] text-black font-black uppercase tracking-widest text-sm border-4 border-black shadow-brutalist-sm hover-brutalist-sm mt-8 flex items-center justify-center gap-2"
            >
              View Site ↗
            </Link>
          </nav>
        </div>
        
        <form action={logout}>
          <button type="submit" className="w-full px-4 py-3 bg-[#FF006E] text-white font-black uppercase tracking-widest text-sm border-4 border-black shadow-brutalist-sm hover-brutalist-sm mt-12 md:mt-0">
            Log out
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-background bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px]">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
