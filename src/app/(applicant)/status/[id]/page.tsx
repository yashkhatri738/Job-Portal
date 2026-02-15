import { getApplicationDetails } from "@/lib/actions/applicant/status.queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Briefcase, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Mail, 
  MapPin, 
  Phone,
  Clock,
  Info
} from "lucide-react";

interface StatusDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function StatusDetailsPage({ params }: StatusDetailsPageProps) {
  const { id } = await params;
  const application = await getApplicationDetails(parseInt(id));

  if (!application) {
    notFound();
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied": return <Clock className="w-5 h-5 text-blue-600" />;
      case "selected": return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="rounded-xl group">
          <Link href="/status">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Applications
          </Link>
        </Button>
        <Badge variant="outline" className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${getStatusColor(application.status)}`}>
          {application.status.toUpperCase()}
        </Badge>
      </div>

      <Card className="rounded-3xl border-0 shadow-2xl shadow-gray-100 overflow-hidden bg-white">
        <div className="h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b" />
        <CardContent className="p-10 -mt-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl bg-white shrink-0">
              <AvatarImage src={application.job.employer?.avatarUrl || ""} />
              <AvatarFallback className="text-3xl font-extrabold bg-primary/10 text-primary">
                {application.job.employer?.name?.charAt(0) || "C"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4 pt-10 md:pt-16">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                {application.job.title}
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-lg text-muted-foreground font-semibold">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  {application.job.employer?.name}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {application.job.location || "Remote"}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-100">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-black text-gray-400">Date Applied</p>
              <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <Calendar className="w-5 h-5 text-primary/60" />
                {format(new Date(application.appliedAt), "MMM d, yyyy")}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-black text-gray-400">Job Type</p>
              <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <Briefcase className="w-5 h-5 text-primary/60" />
                <span className="capitalize">{application.job.jobType || "Full-time"}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-black text-gray-400">Current Status</p>
              <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                {getStatusIcon(application.status)}
                <span className="capitalize">{application.status}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-3xl border-0 shadow-xl shadow-gray-50 bg-white overflow-hidden">
            <CardHeader className="border-b bg-gray-50/50 px-8 py-6">
              <CardTitle className="text-xl font-extrabold flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" /> Cover Letter
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {application.coverLetter}
              </p>
            </CardContent>
          </Card>

          {application.employerNotes && (
            <Card className="rounded-3xl border-0 shadow-xl bg-primary/5 ring-1 ring-primary/20 overflow-hidden">
              <CardHeader className="border-b border-primary/10 px-8 py-6">
                <CardTitle className="text-xl font-extrabold flex items-center gap-3 text-primary">
                  <Info className="w-5 h-5" /> Employer Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 font-semibold text-primary/80 italic text-lg whitespace-pre-line">
                {application.employerNotes}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          <Card className="rounded-3xl border-0 shadow-xl shadow-gray-50 bg-white overflow-hidden">
            <CardHeader className="border-b bg-gray-50/50 px-8 py-6">
              <CardTitle className="text-xl font-extrabold">Applicant Data</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-gray-900 font-bold">
                  <Mail className="w-5 h-5 text-primary/60" />
                  {application.email}
                </div>
                <p className="text-sm text-muted-foreground ml-8">Email Address</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-gray-900 font-bold">
                  <Phone className="w-5 h-5 text-primary/60" />
                  {application.phoneNumber}
                </div>
                <p className="text-sm text-muted-foreground ml-8">Phone Number</p>
              </div>
              <Button asChild className="w-full h-14 rounded-2xl text-lg font-bold mt-4" variant="secondary">
                <a href={application.resumeUrl} target="_blank" rel="noreferrer">
                  View Full Resume
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-xl shadow-gray-50 bg-white overflow-hidden p-8 text-center bg-gray-900 text-white">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-full">
                <Briefcase className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold mb-2">Internal Job ID</h3>
            <code className="text-primary font-black text-2xl tracking-widest bg-white/5 py-2 px-6 rounded-xl block">
              #{application.job.id}
            </code>
            <p className="mt-6 text-sm text-gray-400 leading-relaxed font-medium">
              Reference this ID when contacting the employer or support.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
