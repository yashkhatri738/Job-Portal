"use server";

import { db } from "@/config/db";
import { jobApplications, jobs } from "@/drizzle/schema";
import { eq, and, desc, or, like } from "drizzle-orm";
import { getCurrentUser } from "../auth.queries";
import { revalidatePath } from "next/cache";

export const getEmployerCandidates = async (search?: string) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "employer") {
    return null;
  }

  try {
    const applications = await db.query.jobApplications.findMany({
      where: (table, { and, exists, select }) => {
        // We only want applications for jobs owned by this employer
        const ownedJobsSubquery = db
          .select()
          .from(jobs)
          .where(and(eq(jobs.employersId, user.id), eq(jobs.id, jobApplications.jobId)));
          
        return and(
          // exists(...) or some join-based filter
        );
      },
      // findMany with 'with' is easier if we use direct joins for complex filtering
      // or we just fetch all applications and filter in JS if the count is manageable, 
      // but let's try a better query.
    });

    // Actually, a more straightforward join is better here
    const results = await db
      .select({
        application: jobApplications,
        job: jobs,
      })
      .from(jobApplications)
      .innerJoin(jobs, eq(jobApplications.jobId, jobs.id))
      .where(
        and(
          eq(jobs.employersId, user.id),
          search 
            ? or(
                like(jobApplications.name, `%${search}%`),
                like(jobs.title, `%${search}%`)
              )
            : undefined
        )
      )
      .orderBy(desc(jobApplications.appliedAt));

    return results;
  } catch (error) {
    console.error("getEmployerCandidates error:", error);
    return null;
  }
};

export const getCandidateDetailsById = async (applicationId: number) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "employer") {
    return null;
  }

  try {
    const result = await db
      .select({
        application: jobApplications,
        job: jobs,
      })
      .from(jobApplications)
      .innerJoin(jobs, eq(jobApplications.jobId, jobs.id))
      .where(and(eq(jobApplications.id, applicationId), eq(jobs.employersId, user.id)))
      .limit(1)
      .then(res => res[0]);

    return result;
  } catch (error) {
    console.error("getCandidateDetailsById error:", error);
    return null;
  }
};

export const updateApplicationStatus = async (applicationId: number, status: string) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "employer") {
    return { status: "ERROR", message: "Unauthorized" };
  }

  try {
    // Verify ownership first
    const ownSubquery = await db
        .select({ id: jobApplications.id })
        .from(jobApplications)
        .innerJoin(jobs, eq(jobApplications.jobId, jobs.id))
        .where(and(eq(jobApplications.id, applicationId), eq(jobs.employersId, user.id)))
        .limit(1);

    if (ownSubquery.length === 0) {
        return { status: "ERROR", message: "Application not found or unauthorized" };
    }

    await db
      .update(jobApplications)
      .set({ status })
      .where(eq(jobApplications.id, applicationId));

    revalidatePath(`/employer/candidates`);
    revalidatePath(`/employer/candidates/${applicationId}`);
    
    return { status: "SUCCESS", message: `Status updated to ${status}` };
  } catch (error) {
    console.error("updateApplicationStatus error:", error);
    return { status: "ERROR", message: "Failed to update status" };
  }
};
