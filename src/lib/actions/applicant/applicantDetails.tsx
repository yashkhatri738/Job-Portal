"use server";

import { db } from "@/config/db";
import { applicants } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { applicantDetailsSchema, ApplicantDetailsSchema } from "@/lib/schemaValidation/applicant.schema";
import { getCurrentUser } from "@/lib/actions/auth.queries";
import { revalidatePath } from "next/cache";

export const getApplicantDetails = async (applicantId: number) => {
    // Implementation to fetch applicant details from the database
    const [applicant] = await db
        .select()
        .from(applicants)
        .where(eq(applicants.id,applicantId));
    
    return applicant;
}

export const updateApplicantDetails = async (data: ApplicantDetailsSchema) => {
    const user = await getCurrentUser();
    
    if (!user || user.role !== "applicant") {
        throw new Error("Unauthorized");
    }

    const validData = applicantDetailsSchema.parse(data);

    // Check if applicant record exists
    const [existingApplicant] = await db.select().from(applicants).where(eq(applicants.id, user.id));

    const applicantData = {
        ...validData,
        dateOfBirth: validData.dateOfBirth ? new Date(validData.dateOfBirth) : undefined,
    };

    if (existingApplicant) {
        await db.update(applicants).set(applicantData).where(eq(applicants.id, user.id));
    } else {
        await db.insert(applicants).values({
            id: user.id,
            ...applicantData,
        });
    }

    revalidatePath("/settings");
    return { success: true };
}