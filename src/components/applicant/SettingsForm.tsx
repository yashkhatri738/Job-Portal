"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicantDetailsSchema, ApplicantDetailsSchema } from "@/lib/schemaValidation/applicant.schema";
import { updateApplicantDetails } from "@/lib/actions/applicant/applicantDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { Camera, Loader } from "lucide-react";
import { MIN_EDUCATION } from "@/config/constants";

interface SettingsFormProps {
  initialData?: ApplicantDetailsSchema;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ApplicantDetailsSchema>({
    resolver: zodResolver(applicantDetailsSchema),
    defaultValues: {
      biography: initialData?.biography || "",
      dateOfBirth: initialData?.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : "",
      nationality: initialData?.nationality || "",
      maritalStatus: initialData?.maritalStatus,
      gender: initialData?.gender,
      education: initialData?.education,
      experience: initialData?.experience || "",
      websiteUrl: initialData?.websiteUrl || "",
      location: initialData?.location || "",
      avatarUrl: initialData?.avatarUrl || "",
      resumeUrl: initialData?.resumeUrl || "",
    },
  });

  const { watch, setValue } = form;

  const onSubmit = (data: ApplicantDetailsSchema) => {
    startTransition(async () => {
      try {
        const result = await updateApplicantDetails(data);
        if (result.success) {
            toast.success("Profile updated successfully");
        }
      } catch (error) {
        toast.error("Failed to update profile");
        console.error(error);
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Applicant Details</h2>
        <p className="text-gray-500">Update your personal information and profile details.</p>
      </div>

      <div className="grid gap-4">
        {/* Avatar + Resume Uploads */}
        <div className="grid gap-4">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <div className="w-full h-full rounded-full overflow-hidden border bg-muted">
                {watch("avatarUrl") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={watch("avatarUrl")} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">Avatar</div>
                )}
              </div>
              <div className="absolute bottom-0 right-0">
                <UploadButton
                  endpoint="imageUploader"
                  appearance={{
                    button: "w-8 h-8 rounded-full bg-primary text-white shadow flex items-center justify-center",
                    allowedContent: "hidden",
                  }}
                  content={{ button: <Camera size={14} /> }}
                  onClientUploadComplete={(res) => {
                    const url = res?.[0]?.ufsUrl || "";
                    if (url) {
                      setValue("avatarUrl", url, { shouldDirty: true });
                      toast.success("Avatar uploaded");
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Resume</Label>
            <div className="flex items-center gap-4">
              <div>
                {watch("resumeUrl") ? (
                  <a href={watch("resumeUrl")} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
                    View uploaded resume
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">No resume uploaded</p>
                )}
              </div>

              <UploadButton
                endpoint="resumeUploader"
                content={{ button: <span className="text-sm">Upload Resume</span> }}
                onClientUploadComplete={(res) => {
                  const url = res?.[0]?.ufsUrl || "";
                  if (url) {
                    setValue("resumeUrl", url, { shouldDirty: true });
                    toast.success("Resume uploaded");
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="biography">Biography</Label>
          <Textarea
            id="biography"
            {...form.register("biography")}
            placeholder="Tell us about yourself"
            className="min-h-[100px]"
          />
          {form.formState.errors.biography && (
            <p className="text-red-500 text-sm">{form.formState.errors.biography.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
                id="dateOfBirth"
                type="date"
                {...form.register("dateOfBirth")}
            />
             {form.formState.errors.dateOfBirth && (
                <p className="text-red-500 text-sm">{form.formState.errors.dateOfBirth.message}</p>
            )}
            </div>

            <div className="grid gap-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
                id="nationality"
                {...form.register("nationality")}
                placeholder="e.g. American"
            />
            {form.formState.errors.nationality && (
                <p className="text-red-500 text-sm">{form.formState.errors.nationality.message}</p>
            )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Controller
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
             {form.formState.errors.maritalStatus && (
                <p className="text-red-500 text-sm">{form.formState.errors.maritalStatus.message}</p>
            )}
            </div>

            <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Controller
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
             {form.formState.errors.gender && (
                <p className="text-red-500 text-sm">{form.formState.errors.gender.message}</p>
            )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="education">Education</Label>
                <Controller
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select education" />
                            </SelectTrigger>
                            <SelectContent>
                                {MIN_EDUCATION.map((edu) => (
                                    <SelectItem key={edu} value={edu}>
                                        {edu.charAt(0).toUpperCase() + edu.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                 {form.formState.errors.education && (
                    <p className="text-red-500 text-sm">{form.formState.errors.education.message}</p>
                )}
            </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="experience">Experience</Label>
          <Textarea
            id="experience"
            // Assuming Textarea component has a header prop based on usage in other files, but checking existing usage might be good. 
                      // Wait, I saw "header" prop in my thoughtful mental model of Textarea? 
                      // Let's check Textarea implementation if it errors. I'll assume standard props for now or check usage later.
                      // Actually, looking at `ui/textarea.tsx` in list_dir output, it has bytes, so I can view it if needed.
                      // For now I'll use standard props + className.
            {...form.register("experience")}
            placeholder="Describe your work experience..."
            className="min-h-[100px]"
          />
           {form.formState.errors.experience && (
                <p className="text-red-500 text-sm">{form.formState.errors.experience.message}</p>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
                id="websiteUrl"
                type="url"
                {...form.register("websiteUrl")}
                placeholder="https://example.com"
            />
             {form.formState.errors.websiteUrl && (
                <p className="text-red-500 text-sm">{form.formState.errors.websiteUrl.message}</p>
            )}
            </div>

            <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
                id="location"
                {...form.register("location")}
                placeholder="City, Country"
            />
             {form.formState.errors.location && (
                <p className="text-red-500 text-sm">{form.formState.errors.location.message}</p>
            )}
            </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
