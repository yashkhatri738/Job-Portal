"use client";

import  Link  from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  User,
} from "lucide-react";
import { LogoutAction } from "@/lib/actions/auth.action";

type Props = {
  applicant: any;
  user: any;
};

const navigationLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/profile", icon: User },
  // { name: "Jobs", href: "/jobs", icon: Briefcase },
  // { name: "Post a Job", href: "/jobs/new", icon: Plus },
  // { name: "Saved Candidates", href: "/saved-candidates", icon: Bookmark},
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Status", href: "/status", icon: Briefcase },
  // { name: "Plan & Billing", href: "/plan-billing", icon: CreditCard },
  // { name: "All Companies", href: "/companies", icon: Building },
];
const ApplicantSidebar = ({ applicant, user }: Props) => {
 const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex-1 space-y-4 py-6 px-4">
        <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50/50 p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <p className="text-sm font-bold text-gray-900 truncate">
            {user?.name ?? "Applicant Name"}
          </p>
          <p className="text-xs text-blue-600 font-bold truncate mt-1 uppercase tracking-wider">
            {applicant?.education ?? "Education"}
          </p>
        </div>
        
        <nav className="space-y-2">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1"
                      : "text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100/50">
        <button
          onClick={() => {
            LogoutAction();
          }}
          className="flex items-center w-full gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all duration-300 group hover:translate-x-1"
        >
          <LogOut className="h-5 w-5 text-rose-400 group-hover:text-rose-600" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ApplicantSidebar;
