"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 max-w-7xl pt-24 pb-20">

      {/* Hero Header */}
      <div className="mb-20 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block border-brutalist bg-[#FFD23F] px-4 py-2 font-black uppercase tracking-widest text-sm shadow-brutalist-sm mb-8"
        >
          HELLO, WORLD!
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.9] tracking-tighter uppercase mb-8"
        >
          I make <br />
          <span className="text-white [-webkit-text-stroke:4px_black] drop-shadow-[8px_8px_0_rgba(0,0,0,1)]">cool stuff</span><br />
          on the web.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-3xl font-bold max-w-3xl leading-snug border-l-8 border-black pl-6 py-2"
        >
          I have a deep passion for visual arts, with a special focus on graphic design and photography.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

        {/* Profile Card (Left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-4 bg-[#3A86FF] border-brutalist shadow-brutalist p-8 flex flex-col items-center justify-center relative overflow-hidden group hover-brutalist"
        >
          <div className="w-48 h-48 rounded-full border-4 border-black overflow-hidden relative mb-6 z-10 bg-white">
            <Image
              src="/ale.png"
              alt="Abdee Alfarizi"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <h2 className="text-4xl font-black text-white text-center z-10 uppercase tracking-tighter">Abdee Alfarizi</h2>
          <p className="text-black font-black mt-4 z-10 text-center bg-white border-4 border-black px-6 py-2 text-xl shadow-brutalist-sm">Creative Developer</p>
        </motion.div>

        {/* Selected Works Teaser (Right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-8 bg-[#FF006E] border-brutalist shadow-brutalist p-8 flex flex-col justify-between hover-brutalist relative overflow-hidden"
        >
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '24px 24px' }}></div>

          <div className="relative z-10 flex justify-between items-start mb-12">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              Selected <br /> Works
            </h2>
            <Link href="/work" className="w-20 h-20 bg-[#06D6A0] border-4 border-black flex items-center justify-center hover-brutalist-sm bg-white hover:bg-[#FFD23F] transition-colors shadow-brutalist-sm">
              <ArrowUpRight className="w-12 h-12 text-black" strokeWidth={3} />
            </Link>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-6">
            <div className="aspect-[4/3] bg-white border-brutalist overflow-hidden relative group shadow-brutalist-sm hover-brutalist-sm">
              <img src="https://rqnxntusvkjgzzyeankn.supabase.co/storage/v1/object/public/portfolio-media/a-quiet-shift/0.5449980374571928.JPG" className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105" alt="Work 1" />
            </div>
            <div className="aspect-[4/3] bg-white border-brutalist overflow-hidden relative group shadow-brutalist-sm hover-brutalist-sm">
              <img src="https://rqnxntusvkjgzzyeankn.supabase.co/storage/v1/object/public/portfolio-media/lattefolk-tshirtpost/0.46467897347015363.png" className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105" alt="Work 2" />
            </div>
          </div>
        </motion.div>

        {/* Marquee Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-12 border-brutalist shadow-brutalist bg-[#06D6A0] overflow-hidden py-8 relative flex hover-brutalist"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex whitespace-nowrap items-center gap-12"
          >
            <span className="text-5xl font-black uppercase flex items-center gap-6"><Star className="fill-black w-10 h-10" /> UI/UX Design</span>
            <span className="text-5xl font-black uppercase flex items-center gap-6"><Star className="fill-black w-10 h-10" /> Photography</span>
            <span className="text-5xl font-black uppercase flex items-center gap-6"><Star className="fill-black w-10 h-10" /> Front-End Dev</span>
            <span className="text-5xl font-black uppercase flex items-center gap-6"><Star className="fill-black w-10 h-10" /> Graphic Design</span>
            {/* Duplicates for infinite scroll */}
            <span className="text-5xl font-black uppercase flex items-center gap-6"><Star className="fill-black w-10 h-10" /> UI/UX Design</span>
            <span className="text-5xl font-black uppercase flex items-center gap-6"><Star className="fill-black w-10 h-10" /> Photography</span>
            <span className="text-5xl font-black uppercase flex items-center gap-6"><Star className="fill-black w-10 h-10" /> Front-End Dev</span>
            <span className="text-5xl font-black uppercase flex items-center gap-6"><Star className="fill-black w-10 h-10" /> Graphic Design</span>
          </motion.div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="md:col-span-12 bg-white border-brutalist shadow-brutalist p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 hover-brutalist"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Let's Collab</h2>
            <p className="text-2xl font-bold text-zinc-600 max-w-2xl">Got an idea? Let's turn it into reality. No boring projects allowed.</p>
          </div>
          <Link href="/contact" className="bg-[#FF4F00] text-white border-brutalist shadow-brutalist-lg px-12 py-8 text-3xl font-black uppercase hover-brutalist transition-all whitespace-nowrap">
            Hit Me Up!
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
