"use server";

import { getCurrentUser } from "@/lib/actions/auth.queries";
import { db } from "@/config/db";
import { jobApplications } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

type ApplicationPayload = {
  jobId: number;
  name: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  resumeUrl: string;
};

export const createApplicationAction = async (payload: ApplicationPayload) => {
  const user = await getCurrentUser();
  if (!user) {
    return { status: "ERROR", message: "Unauthorized" };
  }

  // Ensure user is an applicant
  if (user.role !== "applicant") {
    return { status: "ERROR", message: "Only applicants can apply for jobs" };
  }

  try {
    // Check if user already applied
    const existing = await db.query.jobApplications.findFirst({
      where: and(
        eq(jobApplications.jobId, payload.jobId),
        eq(jobApplications.applicantId, user.id)
      ),
    });

    if (existing) {
      return { status: "ERROR", message: "You have already applied for this job" };
    }

    // Insert application
    await db.insert(jobApplications).values({
      jobId: payload.jobId,
      applicantId: user.id,
      name: payload.name,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      coverLetter: payload.coverLetter,
      resumeUrl: payload.resumeUrl,
      status: "applied",
    });

    // Optionally revalidate job or applications pages
    try {
      revalidatePath(`/apply/${payload.jobId}`);
      revalidatePath("/dashboard"); // Assuming this exists or will exist
    } catch (e) {}

    return { status: "SUCCESS", message: "Application submitted successfully" };
  } catch (err) {
    console.error("createApplicationAction error", err);
    return { status: "ERROR", message: "Failed to submit application. Please try again." };
  }
};

