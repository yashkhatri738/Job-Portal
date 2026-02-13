"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteJobDetails } from "@/lib/actions/employer/jobDetails";
import { ConfirmationDialog } from "@/components/UI Components/employer/ConfirmationDialog";

interface JobActionsProps {
  jobId: number;
}

export const JobActions = ({ jobId }: JobActionsProps) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    router.push(`/employer/jobs?jobId=${jobId}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteJobDetails(jobId);
      if (res.status === "SUCCESS") {
        toast.success(res.message);
        router.push("/employer/myjobs");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete job");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 mt-6">
        <Button onClick={handleEdit} className="w-full sm:w-auto">
          <Edit className="w-4 h-4 mr-2" />
          Edit Job
        </Button>
        <Button
          variant="destructive"
          onClick={() => setIsDeleteDialogOpen(true)}
          className="w-full sm:w-auto"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Job
        </Button>
      </div>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Job"
        description="Are you sure you want to delete this job? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
};
