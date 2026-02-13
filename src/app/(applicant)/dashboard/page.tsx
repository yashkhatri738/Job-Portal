import React from 'react'
import { getAllJobs } from '@/lib/actions/employer/jobDetails'
import JobCard from '@/components/UI Components/applicant/JobCard'

const Dashboard = async () => {
  const jobs = await getAllJobs()
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Job Openings</h1>
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
            <div className="col-span-full text-center text-gray-500 py-10">
                No jobs found.
            </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
