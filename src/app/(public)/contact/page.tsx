"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Camera, Briefcase, Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);
    
    if (result.error) {
      setErrorMessage(result.error);
      setStatus("error");
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    }
  }
  return (
    <div className="container mx-auto px-6 max-w-7xl pt-24 pb-20">

      {/* Header */}
      <div className="mb-12 md:mb-16 border-brutalist shadow-brutalist bg-[#FFD23F] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="inline-block px-4 py-1.5 bg-white border-2 border-black font-black text-sm tracking-widest uppercase mb-4 shadow-[4px_4px_0_0_#000]">
            Contact
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black uppercase leading-none drop-shadow-[4px_4px_0_rgba(255,255,255,1)]">
            Let's Talk!
          </h1>
          <p className="text-white bg-black border-2 border-black px-4 py-2 text-xl md:text-2xl font-black mt-4 shadow-[4px_4px_0_0_#FF006E]">
            No boring projects allowed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* Left Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 bg-[#3A86FF] border-brutalist shadow-brutalist p-8 md:p-12"
        >
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {/* Honeypot field for anti-spam */}
            <input type="text" name="bot-field" className="hidden" />

            {status === "success" && (
              <div className="bg-[#06D6A0] text-black border-4 border-black p-4 font-bold shadow-[4px_4px_0_0_#000]">
                Pesan berhasil dikirim! Saya akan segera menghubungi Anda.
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-500 text-white border-4 border-black p-4 font-bold shadow-[4px_4px_0_0_#000]">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="text-xl font-black text-white uppercase tracking-widest">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-white border-4 border-black px-6 py-4 text-lg font-bold text-black focus:outline-none focus:shadow-[4px_4px_0_0_#FFD23F] transition-all"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="text-xl font-black text-white uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-white border-4 border-black px-6 py-4 text-lg font-bold text-black focus:outline-none focus:shadow-[4px_4px_0_0_#FFD23F] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="subject" className="text-xl font-black text-white uppercase tracking-widest">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                className="w-full bg-white border-4 border-black px-6 py-4 text-lg font-bold text-black focus:outline-none focus:shadow-[4px_4px_0_0_#FFD23F] transition-all"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="message" className="text-xl font-black text-white uppercase tracking-widest">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell me all the juicy details..."
                className="w-full bg-white border-4 border-black px-6 py-4 text-lg font-bold text-black focus:outline-none focus:shadow-[4px_4px_0_0_#FFD23F] transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#FF006E] text-white border-4 border-black px-8 py-6 text-2xl font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_0_#000] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all shadow-[8px_8px_0_0_#000] disabled:opacity-70"
            >
              {status === "loading" ? "Sending..." : "Send Message"} <Send className="w-8 h-8" strokeWidth={3} />
            </button>
          </form>
        </motion.div>

        {/* Right Column: Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          {/* Email Card */}
          <div className="bg-[#06D6A0] border-brutalist shadow-brutalist p-8 flex flex-col items-center justify-center text-center hover-brutalist">
            <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
              <Mail className="w-10 h-10 text-black" strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black text-black uppercase mb-2">Email Me</h3>
            <a href="mailto:abdee@example.com" className="text-xl font-bold text-black underline decoration-4 decoration-black hover:text-white transition-colors">ale.alfarizi12@gmail.com</a>
          </div>

          {/* Location Card */}
          <div className="bg-[#FF006E] border-brutalist shadow-brutalist p-8 flex flex-col items-center justify-center text-center hover-brutalist">
            <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
              <MapPin className="w-10 h-10 text-black" strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase mb-2">Location</h3>
            <p className="text-xl font-bold text-white">Cirebon, West Java, ID</p>
          </div>

          {/* Socials Card */}
          <div className="bg-white border-brutalist shadow-brutalist p-8">
            <h3 className="text-3xl font-black text-black uppercase mb-8 text-center tracking-tighter">Stalk Me Here</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="flex flex-col items-center justify-center gap-3 p-6 bg-[#FFD23F] border-4 border-black hover-brutalist-sm shadow-[4px_4px_0_0_#000] group">
                <Camera className="w-12 h-12 text-black group-hover:scale-110 transition-transform" strokeWidth={2} />
                <span className="font-black text-black uppercase tracking-widest">Insta</span>
              </a>
              <a href="https://www.linkedin.com/in/abdee-alfarizi2507/" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 p-6 bg-[#3A86FF] border-4 border-black hover-brutalist-sm shadow-[4px_4px_0_0_#000] group">
                <Briefcase className="w-12 h-12 text-black group-hover:scale-110 transition-transform" strokeWidth={2} />
                <span className="font-black text-black uppercase tracking-widest">LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
