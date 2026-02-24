"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { incidentSessions } from "@/data/mockData";
import { RowActionMenu } from "@/components/alerts/RowActionMenu";
import { Search, Filter, LayoutGrid, Check } from "lucide-react";

interface SessionsTableProps {
  incidentId: string;
}

export const SessionsTable = ({ incidentId }: SessionsTableProps) => {
  const router = useRouter();
  const [expandRows, setExpandRows] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const displayedSessions = incidentSessions.slice(0, 2);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-sf-text mb-1">Incidents</h2>
        <p className="text-sm text-sf-text-secondary">
          Nov 25, 2025 3:02 PM · {displayedSessions.length} items · Sorted by Timestamp · Filtered by None
        </p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer" tabIndex={0}>
            <button
              onClick={() => setExpandRows(!expandRows)}
              className={`w-4 h-4 rounded border flex items-center justify-center ${
                expandRows
                  ? "bg-sf-blue border-sf-blue"
                  : "border-sf-border bg-sf-white"
              }`}
              role="checkbox"
              aria-checked={expandRows}
            >
              {expandRows && <Check size={12} className="text-white" />}
            </button>
            <span className="text-sm text-sf-text">Expand Rows</span>
          </label>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-sf-blue hover:underline"
            tabIndex={0}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sf-text-secondary" size={14} />
            <input
              type="text"
              placeholder="Search..."
              className="h-[32px] pl-8 pr-3 w-[180px] rounded-md border border-sf-border bg-sf-white text-sm focus:outline-none focus:border-sf-blue"
              aria-label="Search sessions"
            />
          </div>
          <button className="p-1.5 rounded-md border border-sf-border bg-sf-white hover:bg-sf-row-hover" aria-label="Filter" tabIndex={0}>
            <Filter size={14} className="text-sf-blue" />
          </button>
          <button className="p-1.5 rounded-md border border-sf-border bg-sf-white hover:bg-sf-row-hover" aria-label="Table view" tabIndex={0}>
            <LayoutGrid size={14} className="text-sf-text-secondary" />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="flex items-center gap-4 mb-3 p-3 bg-sf-white border border-sf-border rounded-lg">
          <span className="text-sm text-sf-text-secondary">Filter by:</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-sf-text">Topic</span>
            <select className="h-[30px] px-2 pr-6 rounded border border-sf-border text-sm" aria-label="Filter by topic">
              <option>All</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-sf-text">Action</span>
            <select className="h-[30px] px-2 pr-6 rounded border border-sf-border text-sm" aria-label="Filter by action">
              <option>All</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-sf-text">Modality</span>
            <select className="h-[30px] px-2 pr-6 rounded border border-sf-border text-sm" aria-label="Filter by modality">
              <option>All</option>
            </select>
          </div>
        </div>
      )}

      <div className="bg-sf-white border border-sf-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sf-border bg-sf-bg/50">
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Session ID ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Agent API Name ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Alert Summary ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Topic ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Action ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Channel ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Timestamp ↓ ▾</th>
              <th className="w-[40px]"></th>
            </tr>
          </thead>
          <tbody>
            {displayedSessions.map((session) => (
              <tr
                key={session.id}
                className="border-b border-sf-border last:border-b-0 hover:bg-sf-row-hover"
              >
                <td className="px-4 py-3">
                  <button
                    onClick={() =>
                      router.push(`/alerts/${incidentId}/session/${session.id}`)
                    }
                    className="text-sf-blue hover:underline text-left"
                    tabIndex={0}
                  >
                    {session.sessionId}
                  </button>
                  {session.alertSummary !== "Label" && (
                    <span className="ml-1 inline-block w-4 h-4 bg-green-100 rounded text-[10px] text-green-700 text-center leading-4">
                      ◻
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => router.push("/builder")}
                    className="text-sf-blue hover:underline text-left"
                    tabIndex={0}
                    aria-label={`Open ${session.agentName} in Builder`}
                  >
                    {session.agentName}
                  </button>
                </td>
                <td className="px-4 py-3 text-sf-text text-xs max-w-[200px]">
                  <div className={expandRows ? "whitespace-pre-line" : "truncate"}>
                    {session.alertSummary}
                  </div>
                </td>
                <td className="px-4 py-3 text-sf-text">{session.topic}</td>
                <td className="px-4 py-3 text-sf-text">{session.action}</td>
                <td className="px-4 py-3 text-sf-text">{session.channel}</td>
                <td className="px-4 py-3 text-sf-text">{session.timestamp}</td>
                <td className="px-4 py-3">
                  <RowActionMenu
                    items={[
                      { label: "Edit in Builder", onClick: () => {} },
                      {
                        label: "Go To Session Details",
                        onClick: () =>
                          router.push(
                            `/alerts/${incidentId}/session/${session.id}`
                          ),
                      },
                      { label: "Go to Scale Center", onClick: () => {} },
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
