import { getCurrentUser } from "@/lib/actions/auth.queries";
import { getApplicantDetails } from "@/lib/actions/applicant/applicantDetails";
import SettingsForm from "@/components/applicant/SettingsForm";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "applicant") {
    redirect("/");
  }

  const applicantDetails = await getApplicantDetails(user.id);
  
  let formattedDetails = undefined;
  if (applicantDetails) {
      formattedDetails = {
          ...applicantDetails,
          dateOfBirth: applicantDetails.dateOfBirth ? new Date(applicantDetails.dateOfBirth).toISOString() : undefined,
          // nulls need to be handled if schema expects optional (undefined)
          biography: applicantDetails.biography || undefined,
          nationality: applicantDetails.nationality || undefined,
          maritalStatus: applicantDetails.maritalStatus || undefined,
          gender: applicantDetails.gender || undefined,
          education: applicantDetails.education || undefined,
          experience: applicantDetails.experience || undefined,
          websiteUrl: applicantDetails.websiteUrl || undefined,
          location: applicantDetails.location || undefined,
          resumeUrl: applicantDetails.resumeUrl || undefined,
          avatarUrl: applicantDetails.avatarUrl || undefined,
      };
  }

  return (
    <div className="container mx-auto py-10">
      <SettingsForm initialData={formattedDetails} />
    </div>
  );
}
