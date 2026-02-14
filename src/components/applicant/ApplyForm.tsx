"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { createApplicationAction } from "@/lib/actions/applicant/apply.action";

interface ApplyFormProps {
  jobId: number;
  jobTitle?: string;
  initial?: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  resumeUrl?: string;
};

export default function ApplyForm({ jobId, jobTitle, initial }: ApplyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: initial?.name || "",
      email: initial?.email || "",
      phoneNumber: initial?.phoneNumber || "",
      coverLetter: "",
      resumeUrl: "",
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await createApplicationAction({ jobId, jobTitle, ...data });
      if (res?.status === 'SUCCESS') {
        toast.success(res.message || 'Application submitted');
      } else {
        toast.error(res?.message || 'Failed to submit application');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold">Apply for: {jobTitle}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register('name', { required: 'Name is required' })} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" {...register('phoneNumber', { required: 'Phone number is required' })} />
        {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea id="coverLetter" {...register('coverLetter', { required: 'Cover letter is required' })} className="min-h-[120px]" />
        {errors.coverLetter && <p className="text-sm text-red-500">{errors.coverLetter.message}</p>}
      </div>

      <div>
        <Label>Resume</Label>
        <div className="flex items-center gap-4">
          <div>
            {watch('resumeUrl') ? (
              <a href={watch('resumeUrl')} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">View uploaded resume</a>
            ) : (
              <p className="text-sm text-muted-foreground">No resume uploaded</p>
            )}
          </div>
          <UploadButton
            endpoint="resumeUploader"
            content={{ button: <span className="text-sm">Upload Resume</span> }}
            onClientUploadComplete={(res) => {
              const url = res?.[0]?.ufsUrl || '';
              if (url) {
                setValue('resumeUrl', url, { shouldDirty: true });
                toast.success('Resume uploaded');
              }
            }}
          />
        </div>
        {!watch('resumeUrl') && <p className="text-sm text-gray-500">Resume is required</p>}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Applying...' : 'Submit Application'}
        </Button>
        <Button variant="ghost" type="button" onClick={() => {
          // simple reset: keep initial values
        }}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
