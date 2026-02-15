import React from "react";
import { getCandidateDetailsById } from "@/lib/actions/employer/candidate.action";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { 
  ArrowLeft, Mail, Phone, Calendar, Briefcase, 
  MapPin, FileText, ExternalLink, User, Clock 
} from "lucide-react";
import StatusUpdater from "./StatusUpdater";

interface CandidateDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateDetailsPage({ params }: CandidateDetailsPageProps) {
  const { id } = await params;
  const result = await getCandidateDetailsById(Number(id));

  if (!result) {
    notFound();
  }

  const { application, job } = result;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "applied": return "bg-blue-50 text-blue-700 border-blue-100";
      case "reviewing": return "bg-amber-50 text-amber-700 border-amber-100";
      case "shortlisted": return "bg-purple-50 text-purple-700 border-purple-100";
      case "selected": return "bg-green-50 text-green-700 border-green-100";
      case "rejected": return "bg-red-50 text-red-700 border-red-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link 
        href="/employer/candidates" 
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Candidates
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Candidate Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-3xl shadow-sm border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50/50 p-8 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 rounded-2xl border-4 border-white shadow-md">
                    <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                      {application.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{application.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground font-medium">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.title}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                   <Badge variant="outline" className={`capitalize px-4 py-1.5 text-sm font-bold ${getStatusColor(application.status)}`}>
                    {application.status}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Applied {format(new Date(application.appliedAt), "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-gray-100">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 border-l-4 border-primary pl-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 group hover:text-primary transition-colors">
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                        <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </div>
                      <span className="font-medium">{application.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 group hover:text-primary transition-colors">
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                        <Phone className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </div>
                      <span className="font-medium">{application.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-lg font-bold text-gray-900 border-l-4 border-primary pl-3">Links & Documents</h3>
                   <div className="space-y-3">
                      {application.resumeUrl && (
                        <a 
                          href={application.resumeUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-2xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <span className="font-bold text-primary">View Resume</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-primary pl-3">Cover Letter</h3>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap italic">
                  &quot;{application.coverLetter}&quot;
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Actions & Job Context */}
        <div className="space-y-6">
          <Card className="rounded-3xl shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusUpdater applicationId={application.id} currentStatus={application.status} />
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Job Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                <p className="text-sm font-bold text-gray-900 truncate">{job.title}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <MapPin className="w-3 h-3" />
                  <span>{job.location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Briefcase className="w-3 h-3" />
                  <span>{job.jobType}</span>
                </div>
              </div>
              <Link href={`/employer/jobs?jobId=${job.id}`}>
                <Button variant="outline" className="w-full rounded-xl font-bold py-6 border-gray-200 hover:bg-gray-50 transition-all">
                  View Job Listing
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
