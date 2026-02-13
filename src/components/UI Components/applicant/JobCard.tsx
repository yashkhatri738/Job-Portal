import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface JobCardProps {
    job: {
        id: number
        title: string
        location: string | null
        minSalary: number | null
        maxSalary: number | null
        salaryCurrency: string | null
        salaryPeriod: string | null
        jobType: string | null
        createdAt: Date
        employer: {
            name: string | null
            logo: string | null
        } | null
    }
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">{job.employer?.name || 'Unknown Company'}</p>
            </div>
            {job.jobType && <Badge variant="secondary">{job.jobType}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location || 'Remote'}</span>
            </div>
            <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{job.jobType}</span>
            </div>
            <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>
                    {job.minSalary && job.maxSalary 
                        ? `${job.salaryCurrency || '$'}${job.minSalary} - ${job.maxSalary}` 
                        : 'Not disclosed'}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
            <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default JobCard
