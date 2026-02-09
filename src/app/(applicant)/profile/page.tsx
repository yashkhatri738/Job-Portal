import { getApplicantDetails } from "@/lib/actions/applicant/applicantDetails";
import { getCurrentUser } from "@/lib/actions/auth.queries";

const Profile = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }
  const applicant = await getApplicantDetails(user?.id);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-100 object-cover"
          />
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-500 text-sm">{applicant.location}</p>
          {applicant.websiteUrl && (
            <a
              href={applicant.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm block mt-2"
            >
              {applicant.websiteUrl}
            </a>
          )}
          <button className="mt-6 w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {applicant.biography}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-6 space-y-3">
              <h4 className="font-semibold">Personal Information</h4>
              <InfoRow
                label="Date of Birth"
                value={
                  applicant.dateOfBirth
                    ? new Date(applicant.dateOfBirth).toLocaleDateString()
                    : "—"
                }
              />
              <InfoRow label="Gender" value={applicant.gender} />
              <InfoRow label="Marital Status" value={applicant.maritalStatus} />
              <InfoRow label="Nationality" value={applicant.nationality} />
            </div>
            <div className="bg-white rounded-2xl shadow p-6 space-y-3">
              <h4 className="font-semibold">Professional Information</h4>
              <InfoRow label="Education" value={applicant.education} />
              <InfoRow label="Location" value={applicant.location} />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <p className="text-gray-600 text-sm">{applicant.experience}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoRow{
    label: string;
    value: string | null;
}
const InfoRow = ({ label, value }: InfoRow) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium capitalize">{value || "—"}</span>
  </div>
);

export default Profile;
