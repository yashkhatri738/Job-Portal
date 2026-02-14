import { MIN_EDUCATION } from "@/config/constants";
import { z } from "zod";

export const applicantDetailsSchema = z.object({
  biography: z.string().optional(),
  dateOfBirth: z.string().optional(), // Expecting YYYY-MM-DD
  nationality: z.string().optional(),
  maritalStatus: z.enum(["single", "married", "divorced"]).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  education: z.enum(MIN_EDUCATION).optional(),
  experience: z.string().optional(),
  websiteUrl: z.union([z.string().url(), z.literal("")]).optional(),
  location: z.string().optional(),
  resumeUrl: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export type ApplicantDetailsSchema = z.infer<typeof applicantDetailsSchema>;
