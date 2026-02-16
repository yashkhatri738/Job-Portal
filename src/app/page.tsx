import { getAllJobs } from "@/lib/actions/employer/jobDetails";
import PublicNavbar from "@/components/shared/PublicNavbar";
import Hero from "@/components/shared/Hero";
import JobCard from "@/components/shared/JobCard";
import CTASection from "@/components/shared/CTASection";
import PublicFooter from "@/components/shared/PublicFooter";

export default async function Home() {
  const allJobs = await getAllJobs();
  
  // Take only the first 20 jobs for the landing page
  const recentJobs = allJobs.slice(0, 20);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <PublicNavbar />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Recent Jobs Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Featured Job <span className="text-blue-600">Opportunities</span>
                </h2>
                <p className="text-gray-500 text-lg max-w-xl">
                  Explore the latest openings from world-class companies. 
                  Your next big career move is just a click away.
                </p>
              </div>
              <button className="text-blue-600 font-bold hover:underline underline-offset-4 flex items-center gap-2">
                See all jobs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {recentJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentJobs.map((jobData: any) => (
                  <JobCard 
                    key={jobData.job.id} 
                    job={jobData.job} 
                    employer={jobData.employer} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-lg">No jobs found. Check back later!</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <PublicFooter />
    </div>
  );
}
