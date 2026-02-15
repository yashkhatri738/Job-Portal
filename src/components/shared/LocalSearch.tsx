"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce"; // I'll check if this exists or create it

interface LocalSearchProps {
  placeholder?: string;
  queryParam?: string;
  className?: string;
}

export default function LocalSearch({
  placeholder = "Search...",
  queryParam = "q",
  className,
}: LocalSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialValue = searchParams.get(queryParam) || "";
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedValue) {
      params.set(queryParam, debouncedValue);
    } else {
      params.delete(queryParam);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedValue, pathname, queryParam, router, searchParams]);

  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 h-10 rounded-xl border-gray-200 focus-visible:ring-primary/20 transition-all"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-3 h-3 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
