import { getJobWithEmployer } from "@/lib/actions/employer/jobDetails";
import { getCurrentUser } from "@/lib/actions/auth.queries";
import ApplyForm from "@/components/applicant/ApplyForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ApplyPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const jobData = await getJobWithEmployer(parseInt(id));
  const user = await getCurrentUser();

  if (!jobData) return <div className="p-6">Job not found</div>;

  const { job } = jobData;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <ApplyForm jobId={job.id} jobTitle={job.title} initial={{ name: user?.name || '', email: user?.email || '', phoneNumber: user?.phoneNumber || '' }} />
      </div>
    </div>
  );
};

export default ApplyPage;
