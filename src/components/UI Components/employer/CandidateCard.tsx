"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { ChevronRight, Mail, Phone, Calendar, Briefcase } from "lucide-react";

interface CandidateCardProps {
  application: any;
  job: any;
}

export default function CandidateCard({ application, job }: CandidateCardProps) {
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
    <Link href={`/employer/candidates/${application.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-primary/20 cursor-pointer overflow-hidden rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <Avatar className="w-12 h-12 rounded-xl border border-gray-100 shadow-sm transition-transform group-hover:scale-105">
                <AvatarFallback className="bg-primary/5 text-primary font-bold">
                  {application.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {application.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Briefcase className="w-4 h-4" />
                  <span className="truncate max-w-[150px]">{job.title}</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className={`capitalize px-3 py-1 font-semibold ${getStatusColor(application.status)}`}>
              {application.status}
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="truncate">{application.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{application.phoneNumber}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <Calendar className="w-4 h-4" />
              <span>Applied {format(new Date(application.appliedAt), "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-1 text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
              Review <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
