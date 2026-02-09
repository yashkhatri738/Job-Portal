import Navbar from "@/components/UI Components/employer/employerNavbar";
import EmployerSidebar from "@/components/UI Components/employer/employerSidebar";
import { getCurrentUser } from "@/lib/actions/auth.queries";
import { getEmployerDetails } from "@/lib/actions/employer/employerDetails";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  if (user.role !== "employer") return redirect("/login");

  const employerDetails = await getEmployerDetails();

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-background border-b">
        <Navbar 
          // userAvatar={employerDetails?.avatarUrl || " "}
          userName={employerDetails?.name || user.name || "User"}
          companyLogo={employerDetails?.bannerImageUrl || ""}
        />
      </nav>
      <div className="flex">
        <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r bg-background">
          <EmployerSidebar employer={employerDetails}  user={user} />
        </aside>
        <main className="ml-64 mt-16 w-full p-6 flex justify-center">
          <div className="w-full max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
