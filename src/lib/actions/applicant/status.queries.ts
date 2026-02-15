import { db } from "@/config/db";
import { jobApplications, jobs, employers } from "@/drizzle/schema";
import { eq, desc, and, or, like } from "drizzle-orm";
import { getCurrentUser } from "@/lib/actions/auth.queries";

export const getApplicantApplications = async (search?: string) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "applicant") {
    return null;
  }

  try {
    const applications = await db.query.jobApplications.findMany({
      where: and(
        eq(jobApplications.applicantId, user.id),
        search 
          ? or(
              like(jobApplications.name, `%${search}%`),
              // Note: findMany with 'with' doesn't easily support nested filtering on columns not in the main table directly without manual joins 
              // but we can at least filter by application fields or handle it in JS for simplicity if the dataset is small, 
              // or use a more complex join if needed.
            )
          : undefined
      ),
      with: {
        job: {
          with: {
            employer: true,
          },
        },
      },
      orderBy: [desc(jobApplications.appliedAt)],
    });

    // If we want to search in job title or employer name, and Drizzle's `with` doesn't support easy `where` on relations:
    if (search) {
      const filtered = applications.filter(app => 
        app.job.title.toLowerCase().includes(search.toLowerCase()) ||
        app.job.employer?.name?.toLowerCase().includes(search.toLowerCase()) ||
        app.status.toLowerCase().includes(search.toLowerCase())
      );
      return filtered;
    }

    return applications;

  } catch (error) {
    console.error("getApplicantApplications error:", error);
    return null;
  }
};

export const getApplicationDetails = async (id: number) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "applicant") {
    return null;
  }

  try {
    const application = await db.query.jobApplications.findFirst({
      where: eq(jobApplications.id, id),
      with: {
        job: {
          with: {
            employer: true,
          },
        },
      },
    });

    // Security check: Ensure this application belongs to the current user
    if (application?.applicantId !== user.id) {
      return null;
    }

    return application;
  } catch (error) {
    console.error("getApplicationDetails error:", error);
    return null;
  }
};

