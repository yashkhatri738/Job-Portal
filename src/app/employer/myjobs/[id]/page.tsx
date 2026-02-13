import { getJobDetailsById } from '@/lib/actions/employer/jobDetails';
import React from 'react';
import { notFound } from 'next/navigation';
import { JobActions } from '@/components/UI Components/employer/JobActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, DollarSign, Clock, Calendar, GraduationCap, Award } from 'lucide-react';
import { format } from 'date-fns';

const JobDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const jobData = await getJobDetailsById(Number(id));

  // Handle case where job is not found or error occurred
  if (!Array.isArray(jobData) || jobData.length === 0) {
    return notFound();
  }

  const job = jobData[0];

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
        <div className="flex flex-wrap gap-2 mt-2 text-muted-foreground">
            {job.location && (
                <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                </div>
            )}
            <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{job.jobType}</span>
            </div>
             <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{job.workType}</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description }} 
              />
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 {job.experience && (
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold flex items-center gap-2"><Award className="w-4 h-4 text-primary"/> Experience</span>
                        <p className="text-muted-foreground">{job.experience}</p>
                    </div>
                 )}
                 {job.minEducation && (
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary"/> Education</span>
                        <p className="text-muted-foreground">{job.minEducation}</p>
                    </div>
                 )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">Level</span>
                    <span className="font-semibold">{job.jobLevel}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">Salary</span>
                    <span className="font-semibold">
                        {job.minSalary && job.maxSalary 
                            ? `${job.salaryCurrency} ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}`
                            : 'Not specified'}
                    </span>
                </div>
                 <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">Period</span>
                    <span className="font-semibold capitalize">{job.salaryPeriod || '-'}</span>
                </div>
                 <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">Posted Date</span>
                    <span className="font-semibold">{format(new Date(job.createdAt), 'MMM dd, yyyy')}</span>
                </div>
                {job.expiresAt && (
                     <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-sm font-medium text-muted-foreground">Expires On</span>
                        <span className="font-semibold">{format(new Date(job.expiresAt), 'MMM dd, yyyy')}</span>
                    </div>
                )}
            </CardContent>
          </Card>

          {job.tags && (
             <Card>
                <CardHeader>
                <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {job.tags.split(',').map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary">{tag.trim()}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
          )}

          <JobActions jobId={job.id} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;