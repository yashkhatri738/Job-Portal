import { getApplicantApplications } from "@/lib/actions/applicant/status.queries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { Briefcase, Building2, Calendar, ChevronRight, MapPin, Search } from "lucide-react";
import LocalSearch from "@/components/shared/LocalSearch";

interface StatusPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function StatusPage({ searchParams }: StatusPageProps) {
  const { q } = await searchParams;
  const applications = await getApplicantApplications(q);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Applications</h1>
          <p className="text-muted-foreground">Track and manage your current job application statuses.</p>
        </div>
        <LocalSearch placeholder="Search applications..." className="md:w-72" />
      </div>

      {(!applications || applications.length === 0) ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            {q ? <Search className="w-8 h-8 text-gray-400" /> : <Briefcase className="w-8 h-8 text-gray-400" />}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {q ? `No results found for "${q}"` : "No applications found"}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            {q 
              ? "Try adjusting your search terms to find what you're looking for." 
              : "You haven't applied to any jobs yet. Start your journey by exploring available opportunities!"
            }
          </p>
          {!q && (
            <Link 
              href="/dashboard" 
              className="mt-6 inline-flex items-center px-6 py-3 rounded-xl bg-primary text-white font-semibold transition-transform hover:scale-105"
            >
              Browse Jobs
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <Link key={app.id} href={`/status/${app.id}`}>
              <Card className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar className="w-16 h-16 rounded-xl border border-gray-100 shadow-sm transition-transform group-hover:scale-105">
                      <AvatarImage src={app.job.employer?.avatarUrl || ""} alt={app.job.employer?.name || "Company"} />
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">
                        {app.job.employer?.name?.charAt(0) || "C"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                          {app.job.title}
                        </h3>
                        <Badge variant="outline" className={`capitalize px-3 py-1 font-semibold ${getStatusColor(app.status)}`}>
                          {app.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4" />
                          <span>{app.job.employer?.name || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{app.job.location || "Remote"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>Applied {format(new Date(app.appliedAt), "MMM d, yyyy")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-primary font-bold transition-all group-hover:translate-x-1">
                      <span className="hidden md:inline">View Details</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "applied": return "bg-blue-50 text-blue-700 border-blue-100";
    case "reviewing": return "bg-amber-50 text-amber-700 border-amber-100";
    case "shortlisted": return "bg-purple-50 text-purple-700 border-purple-100";
    case "selected": return "bg-green-50 text-green-700 border-green-100";
    case "rejected": return "bg-red-50 text-red-700 border-red-100";
    default: return "bg-gray-50 text-gray-700 border-gray-100";
  }
};
