"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateApplicationStatus } from "@/lib/actions/employer/candidate.action";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

interface StatusUpdaterProps {
  applicationId: number;
  currentStatus: string;
}

const statusOptions = [
  { value: "applied", label: "Applied" },
  { value: "reviewing", label: "Reviewing" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "selected", label: "Selected" },
  { value: "rejected", label: "Rejected" },
];

export default function StatusUpdater({ applicationId, currentStatus }: StatusUpdaterProps) {
  const [status, setStatus] = useState(currentStatus.toLowerCase());
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (status === currentStatus.toLowerCase()) return;
    
    setLoading(true);
    try {
      const res = await updateApplicationStatus(applicationId, status);
      if (res.status === "SUCCESS") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
        setStatus(currentStatus.toLowerCase()); // Reset on failure
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      setStatus(currentStatus.toLowerCase());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Application Status</label>
        <Select value={status} onValueChange={setStatus} disabled={loading}>
          <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:ring-primary/20 bg-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl overflow-hidden shadow-xl border-gray-200">
            {statusOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="py-3 px-4 focus:bg-primary/5 focus:text-primary transition-colors cursor-pointer"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleUpdate} 
        disabled={loading || status === currentStatus.toLowerCase()}
        className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 transition-all shadow-md active:scale-[0.98]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Update Status
          </>
        )}
      </Button>
      
      {status === currentStatus.toLowerCase() && (
        <p className="text-center text-xs text-muted-foreground font-medium italic">
          Current status is {currentStatus}
        </p>
      )}
    </div>
  );
}
