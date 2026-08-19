"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — brand gold on hover */}
        <Link
          href="/"
          className="font-display text-lg sm:text-xl tracking-[0.2em] font-light text-foreground hover:text-brand transition-colors duration-300"
        >
          ABDEE.
        </Link>

        <nav className="flex gap-6 sm:gap-10 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[10px] sm:text-[11px] tracking-[0.25em] uppercase transition-colors duration-200 shrink-0 relative",
                pathname === link.href
                  ? "text-brand"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              {/* Active underline */}
              {pathname === link.href && (
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-brand" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
