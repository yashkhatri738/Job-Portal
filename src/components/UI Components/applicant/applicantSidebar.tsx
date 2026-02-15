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
  { name: "status", href: "/status", icon: Briefcase },
  // { name: "Plan & Billing", href: "/plan-billing", icon: CreditCard },
  // { name: "All Companies", href: "/companies", icon: Building },
];
const ApplicantSidebar = ({ applicant, user }: Props) => {
 const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div>
        <div className="mb-6 rounded-lg border bg-muted p-4 mt-7">
          <p className="text-sm font-medium">{user?.name ?? "Applicant Name"}</p>
          <p className="text-xs text-muted-foreground">
            {applicant?.education ?? "Education"}
          </p>
        </div>
        <nav className="space-y-1">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-muted-foreground hover:bg-muted"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <button
        onClick={() => {
          LogoutAction();
        }}
        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
};

export default ApplicantSidebar;
