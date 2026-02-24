"use client";

import { Severity } from "@/lib/types";

interface SeverityBadgeProps {
  severity: Severity;
}

export const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  return (
    <span className="text-sm text-sf-text font-medium">{severity}</span>
  );
};
