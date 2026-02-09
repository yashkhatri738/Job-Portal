import CalendarCard from "@/components/UI Components/CalanderCard";
import { getCurrentUser } from "@/lib/actions/auth.queries";
import { getEmployerDetails } from "@/lib/actions/employer/employerDetails";
import { redirect } from "next/navigation";

interface HireCardProps {
    title: string;
    count: number;
    percent: string;
}

interface ProgressRow{
    name: string;
    role: string;
    status: string;
}

interface Applicant{
    name: string;
    role: string;
}

const HireCard = ({ title, count, percent }: HireCardProps) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <h4 className="text-sm text-gray-500">{title}</h4>
    <div className="flex items-center justify-between mt-2">
      <span className="text-2xl font-semibold">{count}</span>
      <span className="text-sm text-indigo-600">{percent}</span>
    </div>
  </div>
);

const ProgressRow = ({ name, role, status }: ProgressRow) => (
  <tr className="border-t">
    <td className="py-2">{name}</td>
    <td>{role}</td>
    <td className="text-indigo-600">{status}</td>
  </tr>
);

const Applicant = ({ name, role }: Applicant) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="w-8 h-8 rounded-full bg-gray-300" />
    <div>
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">
        Applied for {role}
      </p>
    </div>
  </div>
);


const Profile = async () => {
  const employer = await getEmployerDetails();

  return (
    <main className="flex-1 bg-[#f5f7fb] p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <div className="flex items-center gap-4 text-gray-500">
          <span>🔍</span>
          <span>✉️</span>
          <span>🔔</span>
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-indigo-600 text-white rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Hello {employer.companyName} 
            </h2>
            <p className="text-sm opacity-90">
              You have new applications waiting for review.
            </p>
            <button className="mt-4 text-sm underline">
              Review applications
            </button>
          </div>
          <div className="hidden md:block w-40 h-32 bg-white/20 rounded-xl" />
        </div>
        {/* CALENDAR */}
        <CalendarCard />
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">
          You need to hire
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <HireCard title="Content Designers" count={3} percent="75%" />
          <HireCard title="Node.js Developers" count={9} percent="25%" />
          <HireCard title="Senior UI Designer" count={1} percent="0%" />
          <HireCard title="Marketing Managers" count={2} percent="45%" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-gray-700">
              Recruitment progress
            </h3>
            <button className="text-indigo-600 text-sm">
              See all
            </button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400">
              <tr>
                <th className="py-2">Full name</th>
                <th>Profession</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <ProgressRow name="John Doe" role="UI Designer" status="Tech interview" />
              <ProgressRow name="Ella Clinton" role="Content Designer" status="Task" />
              <ProgressRow name="Mike Tyler" role="Node.js Developer" status="Resume review" />
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-gray-700">
              New Applicants
            </h3>
            <button className="text-indigo-600 text-sm">
              See all
            </button>
          </div>
          <Applicant name="Lewis S. Cunningham" role="iOS Developer" />
          <Applicant name="Danny Nelson" role="Node.js Developer" />
          <Applicant name="Jennifer Patterson" role="Marketing Manager" />
        </div>

      </div>
    </main>
  );
};

export default Profile;
