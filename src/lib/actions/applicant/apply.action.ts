"use server";

import { getCurrentUser } from "@/lib/actions/auth.queries";
import { db } from "@/config/db";
import { jobs } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";

type ApplicationPayload = {
  jobId: number;
  jobTitle?: string;
  name: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  resumeUrl?: string;
};

export const createApplicationAction = async (payload: ApplicationPayload) => {
  const user = await getCurrentUser();
  if (!user) {
    return { status: 'ERROR', message: 'Unauthorized' };
  }

  try {

    console.log('Application received', { userId: user.id, ...payload });

    // Optionally revalidate job or applications pages
    try { revalidatePath(`/apply/${payload.jobId}`); } catch (e) {}

    return { status: 'SUCCESS', message: 'Application submitted' };
  } catch (err) {
    console.error('createApplicationAction error', err);
    return { status: 'ERROR', message: 'Server error' };
  }
};
