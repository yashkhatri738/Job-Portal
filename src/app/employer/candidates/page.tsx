import React from "react";
import { getEmployerCandidates } from "@/lib/actions/employer/candidate.action";
import CandidateCard from "@/components/UI Components/employer/CandidateCard";
import LocalSearch from "@/components/shared/LocalSearch";
import { Users, Search } from "lucide-react";

interface CandidatesPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function CandidatesPage({ searchParams }: CandidatesPageProps) {
  const { q } = await searchParams;
  const results = await getEmployerCandidates(q);

  return (
    <div className="container mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">Manage and track all applicants for your job postings.</p>
        </div>
        <LocalSearch placeholder="Search candidates or jobs..." className="md:w-80" />
      </div>

      {(!results || results.length === 0) ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            {q ? <Search className="w-8 h-8 text-gray-400" /> : <Users className="w-8 h-8 text-gray-400" />}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {q ? `No results found for "${q}"` : "No candidates yet"}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            {q 
              ? "Try adjusting your search terms to find what you're looking for." 
              : "When people apply to your job postings, they will appear here."
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(({ application, job }) => (
            <CandidateCard key={application.id} application={application} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
