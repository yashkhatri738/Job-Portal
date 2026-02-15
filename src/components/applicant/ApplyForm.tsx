"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { createApplicationAction } from "@/lib/actions/applicant/apply.action";
import { Loader2, CheckCircle2, FileText, Phone, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

const applySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  resumeUrl: z.string().url("Please upload your resume"),
});

type FormValues = z.infer<typeof applySchema>;

interface ApplyFormProps {
  jobId: number;
  jobTitle?: string;
  initial?: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}

export default function ApplyForm({ jobId, jobTitle, initial }: ApplyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      name: initial?.name || "",
      email: initial?.email || "",
      phoneNumber: initial?.phoneNumber || "",
      coverLetter: "",
      resumeUrl: "",
    },
  });

  const resumeUrl = watch("resumeUrl");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await createApplicationAction({ jobId, ...data });
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Failed to submit application");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Apply for Job</h2>
          <p className="text-muted-foreground mt-1">
            Applying for: <span className="font-semibold text-primary">{jobTitle}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs font-medium text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" /> Phone Number
          </Label>
          <Input
            id="phoneNumber"
            placeholder="+91 9876543210"
            className={errors.phoneNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-xs font-medium text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverLetter" className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> Cover Letter
          </Label>
          <Textarea
            id="coverLetter"
            placeholder="Tell us why you're a good fit for this role..."
            className={`min-h-[150px] resize-none ${
              errors.coverLetter ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
            {...register("coverLetter")}
          />
          <div className="flex justify-between items-center">
            {errors.coverLetter ? (
              <p className="text-xs font-medium text-red-500 text-balance">{errors.coverLetter.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground italic">Minimum 50 characters</p>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-xl bg-gray-50 p-6 border border-dashed border-gray-300">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <Label className="text-base font-semibold">Resume / CV</Label>
              <p className="text-sm text-muted-foreground">PDF, DOCX up to 4MB</p>
            </div>
            
            <UploadButton
              endpoint="resumeUploader"
              className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-button:rounded-lg ut-allowed-content:hidden"
              onClientUploadComplete={(res) => {
                const url = res?.[0]?.ufsUrl || "";
                if (url) {
                  setValue("resumeUrl", url, { shouldValidate: true });
                  toast.success("Resume uploaded successfully!");
                }
              }}
              onUploadError={(error: Error) => {
                toast.error(`UPLOAD ERROR: ${error.message}`);
              }}
            />
          </div>

          {resumeUrl && (
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100 animate-in fade-in slide-in-from-bottom-1">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Resume Uploaded</p>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  View Document
                </a>
              </div>
            </div>
          )}
          {errors.resumeUrl && (
            <p className="text-xs font-medium text-red-500">{errors.resumeUrl.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button
            type="submit"
            size="lg"
            className="flex-1 rounded-xl h-12 text-base font-semibold shadow-lg shadow-primary/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-xl h-12 px-8"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

