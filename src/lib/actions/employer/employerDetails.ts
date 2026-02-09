"use server"

import { db } from "@/config/db";
import { employers, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../auth.queries";
import { EmployerProfileData } from "@/lib/schemaValidation/employer.schema";

export const getEmployerDetails = async () => {
    // Implementation to fetch employer details from the database

    const user = await getCurrentUser();

    if (!user || user.role !== "employer") {
      throw new Error("Unauthorized access");
    }

    const [employer] = await db
        .select()
        .from(employers)
        .where(eq(employers.id,user.id));
    
    return employer;
}

export const updateEmployerProfileAction = async (
  data: EmployerProfileData
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "employer") {
      return { status: "ERROR", message: "Unauthorized" };
    }

    const {
      name,
      description,
      yearOfEstablishment,
      location,
      websiteUrl,
      organizationType,
      teamSize,
      avatarUrl,
      bannerImageUrl,
    } = data;

    const updatedEmployer = await db
      .update(employers)
      .set({
        name,
        description,
        avatarUrl,
        location,
        websiteUrl,
        organizationType,
        teamSize,
        bannerImageUrl,
        yearOfEstablishment: yearOfEstablishment
          ? parseInt(yearOfEstablishment)
          : null,
      })
      .where(eq(employers.id, currentUser.id));

    console.log("employers ", updatedEmployer);

    if (avatarUrl) {
      await db
        .update(users)
        .set({
          avatarUrl,
        })
        .where(eq(users.id, currentUser.id));
    }
    console.log("avatarUrl ", avatarUrl);
    return { status: "SUCCESS", message: "Profile updated successfully" };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};