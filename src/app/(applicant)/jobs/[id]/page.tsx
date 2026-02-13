import React from 'react'
import { getJobWithEmployer } from '@/lib/actions/employer/jobDetails'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Briefcase, DollarSign, Clock, Building2, Globe } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface PageProps {
  params: Promise<{ id: string }>
}

const JobDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params
  const jobData = await getJobWithEmployer(parseInt(id))

  if (!jobData) {
    notFound()
  }

  const { job, employer } = jobData

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/dashboard" className="text-blue-600 hover:underline flex items-center gap-2">
            &larr; Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="p-8 border-b">
            <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                        <Building2 className="w-5 h-5" />
                        <span className="font-medium">{employer?.name || 'Unknown Company'}</span>
                    </div>
                </div>
                {job.jobType && <Badge className="text-lg px-4 py-1">{job.jobType}</Badge>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{job.location || 'Remote'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span>
                        {job.minSalary && job.maxSalary 
                            ? `${job.salaryCurrency || '$'} ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}` 
                            : 'Salary not disclosed'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span>{job.workType}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                    <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                        {job.description}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="font-medium mb-2 text-gray-900">Experience</h3>
                            <p className="text-gray-700">{job.experience || 'Not specified'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="font-medium mb-2 text-gray-900">Education</h3>
                            <p className="text-gray-700 capitalize">{job.minEducation || 'Not specified'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="font-medium mb-2 text-gray-900">Career Level</h3>
                            <p className="text-gray-700 capitalize">{job.jobLevel || 'Not specified'}</p>
                        </div>
                     </div>
                </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="font-semibold text-lg mb-4">About the Company</h3>
                    {employer?.avatarUrl && (
                        <div className="mb-4">
                           {/* Assuming Next.js Image or simple img tag if optimization not configured/domain allowed */}
                           <img src={employer.avatarUrl} alt={employer.name || 'Company Logo'} className="w-16 h-16 rounded-full object-cover" />
                        </div>
                    )}
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        {employer?.description || 'No company description available.'}
                    </p>
                    {employer?.websiteUrl && (
                        <a href={employer.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium">
                            <Globe className="w-4 h-4" />
                            Visit Website
                        </a>
                    )}
                     <div className="mt-6 pt-6 border-t">
                        <Button className="w-full" size="lg">Apply Now</Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
