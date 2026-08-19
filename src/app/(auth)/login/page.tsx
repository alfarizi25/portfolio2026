"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-wider mb-2">ABDEE.</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest">Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-12">
          <div className="space-y-2">
            <label htmlFor="email" className="sr-only">Email</label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="Email" 
              className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="sr-only">Password</label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="Password" 
              className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full tracking-widest uppercase text-xs h-12 mt-8" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Authenticating..." : "Enter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
