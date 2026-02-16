"use client"

import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with Professional Palette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Job Portal Hero"
          fill
          className="object-cover blur-[2px] opacity-70 scale-105"
          priority
        />
        {/* RGBA Overlay matching the image tones (Neutral/Cool) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/60 via-slate-50/70 to-white/90"></div>
        
        {/* Professional Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-200/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Slogan */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Find Your <span className="text-blue-600">Next</span> Opportunity
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover thousands of job opportunities from top companies worldwide. 
              Start your journey to a fulfilling career today.
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="max-w-3xl mx-auto bg-white p-2 md:p-3 rounded-2xl shadow-2xl shadow-blue-100/50 border border-gray-100 flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full flex items-center group">
              <Search className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input 
                placeholder="Job title, keywords..." 
                className="pl-12 h-14 border-none focus-visible:ring-0 text-lg w-full placeholder:text-gray-400"
              />
            </div>
            
            <div className="hidden md:block w-px h-8 bg-gray-200"></div>
            
            <div className="relative flex-1 w-full flex items-center group">
              <MapPin className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input 
                placeholder="City or remote" 
                className="pl-12 h-14 border-none focus-visible:ring-0 text-lg w-full placeholder:text-gray-400"
              />
            </div>
            
            <Button className="w-full md:w-auto h-14 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300">
              Find Jobs
            </Button>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
            <span>Popular:</span>
            {["Frontend", "Backend", "Product Manager", "UI Designer", "Data Analyst"].map((tag) => (
              <button key={tag} className="px-3 py-1 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
