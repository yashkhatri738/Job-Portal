"use client"

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">JobPortal</span>
            </Link>
            <p className="text-gray-500 leading-relaxed max-w-xs">
              Connecting talented professionals with their dream careers worldwide. Your future starts here.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Job Seekers */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">For Job Seekers</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link href="/jobs" className="hover:text-blue-600 transition-colors">Browse Jobs</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Career Advice</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Resume Builder</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Salary Tools</Link></li>
            </ul>
          </div>

          {/* Column 3 - Employers */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">For Employers</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link href="/employer/dashboard" className="hover:text-blue-600 transition-colors">Post a Job</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Browse Candidates</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Hiring Solutions</Link></li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 JobPortal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="flex items-center text-sm text-gray-400 gap-2">
              <Mail className="w-4 h-4" /> support@jobportal.com
            </p>
            <p className="flex items-center text-sm text-gray-400 gap-2">
              <Phone className="w-4 h-4" /> +1 (234) 567-890
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
