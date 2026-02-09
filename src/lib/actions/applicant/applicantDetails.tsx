import { db } from "@/config/db";
import { applicants } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getApplicantDetails = async (applicantId: number) => {
    // Implementation to fetch employer details from the database
    const [applicant] = await db
        .select()
        .from(applicants)
        .where(eq(applicants.id,applicantId));
    
    return applicant;
}