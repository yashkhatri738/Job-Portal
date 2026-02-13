"use server";

import { getJobDetails } from "@/lib/actions/employer/jobDetails";
import JobItemCard from "@/components/UI Components/employer/JobItemCard";

export default async function MyJobsPage() {
  const result = await getJobDetails();

  if (Array.isArray(result)) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Jobs</h1>
        {result.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No jobs posted yet.
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
