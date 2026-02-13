"use server";

import { JobFormData } from "@/lib/schemaValidation/jobs.schema";
import { getCurrentUser } from "../auth.queries";
import { db } from "@/config/db";
import { jobs, employers } from "@/drizzle/schema";
import { jobSchema } from "@/lib/schemaValidation/jobs.schema";
import { eq, and, desc } from "drizzle-orm";

export const createJobDetails = async (data : JobFormData) => {
    try {

        const { success, data: jobData, error} = jobSchema.safeParse(data);
        if (!success) {
            return { status: "ERROR", message: "Invalid data" };
        }

        const user = await getCurrentUser();
        if (!user) {
            throw new Error("Unauthorized");
        }

        await db.insert(jobs).values({
            ...jobData,
            employersId: user.id,
        }); 

        if (error) {
            return { status: "ERROR", message: "Something went wrong, please try again" };
        }   

        return { status: "SUCCESS", message: "Job created successfully" };
    } catch (error) {
        console.error("Error creating job details", error);
        return { status: "ERROR", message: "Something went wrong, please try again" };
    }
};

export const getJobDetails = async () => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error("Unauthorized");
        }

        const jobDetails = await db.select().from(jobs).where(eq(jobs.employersId, user.id));
        return jobDetails;
    } catch (error) {
        console.error("Error getting job details", error);
        return { status: "ERROR", message: "Something went wrong, please try again" };
    }
};

export const getJobDetailsById = async (id: number) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error("Unauthorized");
        }

        const jobDetails = await db.select().from(jobs).where(eq(jobs.id, id));
        return jobDetails;
    } catch (error) {
        console.error("Error getting job details", error);
        return { status: "ERROR", message: "Something went wrong, please try again" };
    }
};  

export const getJobWithEmployer = async (id: number) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error("Unauthorized");
        }

        const job = await db.select({
            job: jobs,
            employer: employers
        })
        .from(jobs)
        .leftJoin(employers, eq(jobs.employersId, employers.id))
        .where(eq(jobs.id, id))
        .then(res => res[0]);
        
        return job;
    } catch (error) {
        console.error("Error getting job details", error);
        return null;
    }
};

export const getAllJobs = async () => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error("Unauthorized");
        }

        const allJobs = await db.select({
            job: jobs,
            employer: employers
        })
        .from(jobs)
        .leftJoin(employers, eq(jobs.employersId, employers.id))
        .orderBy(desc(jobs.createdAt));
        
        return allJobs;
    } catch (error) {
        console.error("Error getting all jobs", error);
        return [];
    }
};

export const deleteJobDetails = async (id: number) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error("Unauthorized");
        }

        await db.delete(jobs).where(eq(jobs.id, id));
        return { status: "SUCCESS", message: "Job deleted successfully" };
    } catch (error) {
        console.error("Error deleting job details", error);
        return { status: "ERROR", message: "Something went wrong, please try again" };
    }
};

export const updateJobDetails = async (id: number, data: JobFormData) => {
    try {
        const { success, data: jobData, error } = jobSchema.safeParse(data);
        if (!success) {
            return { status: "ERROR", message: "Invalid data" };
        }

        const user = await getCurrentUser();
        if (!user) {
            throw new Error("Unauthorized");
        }

        // Verify ownership
        const existingJob = await db.select().from(jobs).where(and(eq(jobs.id, id), eq(jobs.employersId, user.id))).then(res => res[0]);

        if (!existingJob) {
            return { status: "ERROR", message: "Job not found or unauthorized" };
        }

        await db.update(jobs)
            .set({ ...jobData })
            .where(eq(jobs.id, id));

        if (error) {
            return { status: "ERROR", message: "Something went wrong, please try again" };
        }

        return { status: "SUCCESS", message: "Job updated successfully" };
    } catch (error) {
        console.error("Error updating job details", error);
        return { status: "ERROR", message: "Something went wrong, please try again" };
    }
};