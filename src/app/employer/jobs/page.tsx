import { JobForm } from "@/components/UI Components/employer/jobForm";
import { getJobDetailsById } from "@/lib/actions/employer/jobDetails";

const JobsPage = async ({ searchParams }: { searchParams: { jobId?: string } }) => {
    const { jobId } = await searchParams;
    let initialData = null;

    if (jobId) {
        const jobData = await getJobDetailsById(Number(jobId));
        if (Array.isArray(jobData) && jobData.length > 0) {
            initialData = jobData[0];
        }
    }

    return (
        <div>
            <JobForm initialData={initialData} isEditMode={!!initialData} />
        </div>
    )
}

export default JobsPage;