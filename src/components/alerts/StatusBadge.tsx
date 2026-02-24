"use client";

import { IncidentStatus } from "@/lib/types";

const statusStyles: Record<IncidentStatus, string> = {
  New: "bg-sf-new text-white",
  Acknowledged: "bg-sf-acknowledged text-white",
  Closed: "bg-sf-closed text-white",
};

interface StatusBadgeProps {
  status: IncidentStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};
