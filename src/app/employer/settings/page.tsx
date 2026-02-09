import { getEmployerDetails } from "@/lib/actions/employer/employerDetails";
import SettingsForm from "./settings-form";
import { EmployerProfileData } from "@/lib/schemaValidation/employer.schema";

const SettingsPage = async () => {
  const employer = await getEmployerDetails();

  return (
    <div className="max-w-5xl mx-auto pt-6">
      <h1 className="text-2xl font-semibold mb-6 text-foreground">Company Details</h1>

      <SettingsForm
        initialData={
          {
            name: employer.name || "",
            description: employer.description || "",
            organizationType: employer.organizationType || "development" ,
            teamSize: employer.teamSize || "1",
            location: employer.location || "",
            websiteUrl: employer.websiteUrl || "",
            yearOfEstablishment: employer.yearOfEstablishment?.toString(),
            avatarUrl: employer.avatarUrl || "",
            bannerImageUrl: employer.bannerImageUrl || "",
          } as EmployerProfileData
        }
      />
    </div>
  );
};

export default SettingsPage;
