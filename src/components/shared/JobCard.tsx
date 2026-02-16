"use client"

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, Clock, ArrowUpRight } from "lucide-react";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    location: string | null;
    jobType: string | null;
    createdAt: Date;
  };
  employer: {
    name: string | null;
    avatarUrl: string | null;
  } | null;
}

export default function JobCard({ job, employer }: JobCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-gray-100 hover:border-blue-100 overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden shrink-0">
              {employer?.avatarUrl ? (
                <img src={employer.avatarUrl} alt={employer.name || "Company"} className="w-full h-full object-cover" />
              ) : (
                <Briefcase className="w-6 h-6 text-blue-500" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium">{employer?.name || "Anonymous Company"}</p>
            </div>
          </div>
          <button className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-medium text-xs">
            {job.jobType || "Full-time"}
          </Badge>
          <div className="flex items-center text-gray-400 text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            {job.location || "Remote"}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center text-gray-400 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            {new Date(job.createdAt).toLocaleDateString()}
          </div>
          <Link href={`/jobs/${job.id}`}>
            <span className="text-blue-600 text-sm font-bold cursor-pointer hover:underline underline-offset-4">
              View Details
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
