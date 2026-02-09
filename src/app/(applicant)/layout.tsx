import Navbar from "@/components/UI Components/applicant/applicantNavbar";
import ApplicantSidebar from "@/components/UI Components/applicant/applicantSidebar";
import { getApplicantDetails } from "@/lib/actions/applicant/applicantDetails";
import { getCurrentUser } from "@/lib/actions/auth.queries";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  console.log("Current User in Applicant Layout:", user);
  if(!user) return redirect('/login');
  
  if(user.role !== "applicant") return redirect('/login');

  const applicantId = user.id;

  const applicantDetails = await getApplicantDetails(applicantId);
  console.log("Applicant Details:", applicantDetails);

  return <>
   <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-background border-b">
        <Navbar />
      </nav>
      <div className="flex">
        <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r bg-background">
          <ApplicantSidebar applicant={applicantDetails}  user={user} />
        </aside>
        <main className="ml-64 mt-16 w-full p-6 flex justify-center">
          <div className="w-full max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
</>;
}
