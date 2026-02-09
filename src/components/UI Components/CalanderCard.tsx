"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarCard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md"
      />
    </div>
  );
}
