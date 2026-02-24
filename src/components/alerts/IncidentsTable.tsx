"use client";

import Link from "next/link";
import { incidents } from "@/data/mockData";
import { StatusBadge } from "./StatusBadge";
import { SeverityBadge } from "./SeverityBadge";
import { RowActionMenu } from "./RowActionMenu";
import { useRouter } from "next/navigation";
import { LayoutGrid } from "lucide-react";

export const IncidentsTable = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-sm text-sf-text-secondary">
          50 Items · Sorted by Last Occurrence
        </span>
        <button className="p-1.5 rounded hover:bg-sf-bg border border-sf-border" aria-label="Table view" tabIndex={0}>
          <LayoutGrid size={16} className="text-sf-text-secondary" />
        </button>
      </div>

      <div className="bg-sf-white border border-sf-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sf-border bg-sf-bg/50">
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Alert Name</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Status</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Severity</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Metric</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">
                Last Occurrence ↓
              </th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Agent</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Agent Type</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Trigger</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Reason</th>
              <th className="w-[40px]"></th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                className="border-b border-sf-border last:border-b-0 hover:bg-sf-row-hover"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/alerts/${incident.id}`}
                    className="text-sf-blue hover:underline font-medium"
                    tabIndex={0}
                  >
                    {incident.alertName}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={incident.status} />
                </td>
                <td className="px-4 py-3">
                  <SeverityBadge severity={incident.severity} />
                </td>
                <td className="px-4 py-3 text-sf-text">{incident.metric}</td>
                <td className="px-4 py-3 text-sf-text">{incident.lastOccurrence}</td>
                <td className="px-4 py-3 text-sf-text">{incident.agent}</td>
                <td className="px-4 py-3 text-sf-text">{incident.agentType}</td>
                <td className="px-4 py-3 text-sf-text">{incident.trigger}</td>
                <td className="px-4 py-3 text-sf-text text-xs max-w-[200px]">
                  <div className="whitespace-pre-line line-clamp-4">{incident.reason}</div>
                </td>
                <td className="px-4 py-3">
                  <RowActionMenu
                    items={[
                      { label: "Update Status", onClick: () => {} },
                      {
                        label: "View Details",
                        onClick: () => router.push(`/alerts/${incident.id}`),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
