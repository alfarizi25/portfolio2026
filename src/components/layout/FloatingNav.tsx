"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "Contact", path: "/contact" },
];

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full sm:w-auto flex justify-center"
    >
      <nav className="flex items-center gap-1 sm:gap-2 px-3 py-3 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl w-fit">
        {links.map((link) => {
          const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
          
          return (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "relative px-4 sm:px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 uppercase tracking-widest",
                isActive 
                  ? "bg-[#FFD23F] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]" 
                  : "text-black hover:bg-zinc-100 hover:border-2 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] border-2 border-transparent"
              )}
            >
              <span className="relative z-10">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
