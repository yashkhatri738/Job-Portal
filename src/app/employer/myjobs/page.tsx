"use server";

import { getJobDetails } from "@/lib/actions/employer/jobDetails";
import JobItemCard from "@/components/UI Components/employer/JobItemCard";
import LocalSearch from "@/components/shared/LocalSearch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface MyJobsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function MyJobsPage({ searchParams }: MyJobsPageProps) {
  const { q } = await searchParams;
  const result = await getJobDetails(q);

  if (Array.isArray(result)) {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">My Jobs</h1>
            <p className="text-muted-foreground">Manage and track your job postings.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <LocalSearch placeholder="Search your jobs..." className="w-full sm:w-72" />
            <Link href="/employer/jobs">
              <Button className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 rounded-xl px-6">
                <Plus className="w-4 h-4" />
                Post New Job
              </Button>
            </Link>
          </div>
        </div>

        {result.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-xl font-semibold text-gray-900">
              {q ? `No matches found for "${q}"` : "No jobs posted yet"}
            </p>
            <p className="text-muted-foreground mt-2">
              {q ? "Try a different search term." : "Start by creating your first job posting."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {result.map((job) => (
              <JobItemCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="container mx-auto py-8 text-center text-red-500">
      Failed to load jobs. Please try again later.
    </div>
  );
}
