import React from 'react'
import { getAllJobs } from '@/lib/actions/employer/jobDetails'
import JobCard from '@/components/UI Components/applicant/JobCard'
import LocalSearch from '@/components/shared/LocalSearch'

interface DashboardProps {
  searchParams: Promise<{ q?: string }>;
}

const Dashboard = async ({ searchParams }: DashboardProps) => {
  const { q } = await searchParams;
  const jobs = await getAllJobs(q)
  
  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Latest Job Openings</h1>
        <LocalSearch placeholder="Search jobs, companies, or tags..." className="md:w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map(({ job, employer }) => (
            <JobCard 
              key={job.id} 
              job={{
                ...job,
                createdAt: new Date(job.createdAt),
                employer: employer ? {
                  name: employer.name,
                  logo: employer.avatarUrl
                } : null
              }} 
            />
          ))
        ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed">
                <p className="text-xl font-semibold text-gray-900">
                  {q ? `No jobs found matching "${q}"` : "No jobs found"}
                </p>
                <p className="text-muted-foreground mt-2">
                  {q ? "Try adjusting your filters or search keywords." : "Check back later for new opportunities."}
                </p>
            </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

