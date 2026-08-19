import { FloatingNav } from "@/components/layout/FloatingNav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F6] text-zinc-900 font-sans selection:bg-fuchsia-500/30">
      <FloatingNav />

      <main className="flex-1 w-full pt-28 pb-16">
        {children}
      </main>

      <footer className="py-8 border-t border-zinc-200 mt-auto">
        <div className="container mx-auto px-6 text-center text-sm font-semibold text-zinc-400">
          © {new Date().getFullYear()} Abdee Alfarizi.
        </div>
      </footer>
    </div>
  );
}
