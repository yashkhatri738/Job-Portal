"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, PlusCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-indigo-950 px-8 py-16 md:px-16 md:py-20 shadow-2xl">
          {/* Background Pattern/RGBA Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Ready to Take the <span className="text-blue-400">Next</span> Step?
              </h2>
              <p className="text-indigo-100/80 text-lg md:text-xl">
                Whether you're hiring or job hunting, JobPortal connects you with the right people.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/40">
                  <Search className="w-5 h-5" />
                  Find Jobs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/employer/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-14 px-8 border-indigo-400/30 bg-transparent text-white hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-2">
                  <PlusCircle className="w-5 h-5" />
                  Post Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
