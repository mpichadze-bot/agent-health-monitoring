"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { incidentSessions } from "@/data/mockData";
import { RowActionMenu } from "@/components/alerts/RowActionMenu";
import { Search, Filter, LayoutGrid, Check, ChevronDown } from "lucide-react";

interface SessionsTableProps {
  incidentId: string;
}

export const SessionsTable = ({ incidentId }: SessionsTableProps) => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(true);
  const [subcategoryFilter, setSubcategoryFilter] = useState("All");
  const [agentTypeFilter, setAgentTypeFilter] = useState("All");
  const [modalityFilter, setModalityFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  const filteredSessions = incidentSessions.filter((session) => {
    if (searchText) {
      const q = searchText.toLowerCase();
      return (
        session.sessionId.toLowerCase().includes(q) ||
        session.agentName.toLowerCase().includes(q) ||
        (session.userMessages?.toLowerCase().includes(q) ?? false) ||
        (session.subagent?.toLowerCase().includes(q) ?? false) ||
        (session.agentTool?.toLowerCase().includes(q) ?? false)
      );
    }
    return true;
  });

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-sf-text mb-1">Incidents</h2>
        <p className="text-sm text-sf-text-secondary">
          Nov 25, 2025 3:02 PM · {filteredSessions.length} items · Sorted by Timestamp
        </p>
      </div>

      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer" tabIndex={0}>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`w-4 h-4 rounded border flex items-center justify-center ${
                showDetails
                  ? "bg-sf-blue border-sf-blue"
                  : "border-sf-border bg-sf-white"
              }`}
              role="checkbox"
              aria-checked={showDetails}
            >
              {showDetails && <Check size={12} className="text-white" />}
            </button>
            <span className="text-sm text-sf-text">Show details</span>
          </label>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-sf-text-secondary">Filter by:</span>

            <div className="flex items-center gap-1">
              <span className="text-sf-text">Subcategory</span>
              <div className="relative">
                <select
                  value={subcategoryFilter}
                  onChange={(e) => setSubcategoryFilter(e.target.value)}
                  className="h-[28px] px-2 pr-6 rounded border border-sf-border text-xs appearance-none bg-white"
                  aria-label="Filter by subcategory"
                >
                  <option>All</option>
                  <option>Vehicle Availability</option>
                  <option>Contract Confirmation</option>
                </select>
                <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-sf-text-secondary pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sf-text">Agent Type</span>
              <div className="relative">
                <select
                  value={agentTypeFilter}
                  onChange={(e) => setAgentTypeFilter(e.target.value)}
                  className="h-[28px] px-2 pr-6 rounded border border-sf-border text-xs appearance-none bg-white"
                  aria-label="Filter by agent type"
                >
                  <option>All</option>
                  <option>Service</option>
                  <option>Sales</option>
                </select>
                <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-sf-text-secondary pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sf-text">Modality</span>
              <div className="relative">
                <select
                  value={modalityFilter}
                  onChange={(e) => setModalityFilter(e.target.value)}
                  className="h-[28px] px-2 pr-6 rounded border border-sf-border text-xs appearance-none bg-white"
                  aria-label="Filter by modality"
                >
                  <option>All</option>
                  <option>MIAW</option>
                  <option>Facebook Messenger</option>
                </select>
                <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-sf-text-secondary pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sf-text-secondary" size={14} />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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

      <div className="bg-sf-white border border-sf-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sf-border bg-sf-bg/50">
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Session ID ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Agent Name ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">User Messages ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Subagent ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Agent tool ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Channel ▾</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Timestamp ↓ ▾</th>
              <th className="w-[40px]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
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
                <td className="px-4 py-3 text-sf-text text-xs max-w-[250px]">
                  <div className={showDetails ? "whitespace-pre-line line-clamp-4" : "truncate"}>
                    {session.userMessages || "-"}
                  </div>
                </td>
                <td className="px-4 py-3 text-sf-text">{session.subagent || "-"}</td>
                <td className="px-4 py-3 text-sf-text text-xs">{session.agentTool || "-"}</td>
                <td className="px-4 py-3 text-sf-text">{session.channel}</td>
                <td className="px-4 py-3 text-sf-text whitespace-pre-line">{session.timestamp}</td>
                <td className="px-4 py-3">
                  <RowActionMenu
                    items={[
                      { label: "Edit in Builder", onClick: () => router.push("/builder") },
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
            {filteredSessions.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sf-text-secondary">
                  No sessions match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
