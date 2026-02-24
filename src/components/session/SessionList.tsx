"use client";

import { useState } from "react";
import { sessionListItems } from "@/data/mockData";
import { Search, BarChart3, RefreshCw } from "lucide-react";

interface SessionListProps {
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  incidentTitle: string;
}

export const SessionList = ({
  activeSessionId,
  onSelectSession,
  incidentTitle,
}: SessionListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-[240px] bg-sf-white border-r border-sf-border flex flex-col shrink-0 h-full">
      <div className="p-3 border-b border-sf-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center">
            <span className="text-sf-error text-xs">⚠</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-sf-text truncate">{incidentTitle}</h3>
            <p className="text-xs text-sf-text-secondary truncate">
              Above 2% in the last 5 minutes · Service Agent
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-sf-bg" aria-label="Chart view" tabIndex={0}>
            <BarChart3 size={14} className="text-sf-text-secondary" />
          </button>
          <button className="p-1 rounded hover:bg-sf-bg" aria-label="Refresh" tabIndex={0}>
            <RefreshCw size={14} className="text-sf-text-secondary" />
          </button>
        </div>
      </div>

      <div className="p-2 border-b border-sf-border">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-sf-text-secondary" size={12} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full h-[28px] pl-7 pr-2 rounded border border-sf-border text-xs focus:outline-none focus:border-sf-blue"
            aria-label="Search sessions"
          />
        </div>
      </div>

      <div className="p-2 border-b border-sf-border">
        <span className="text-xs text-sf-text-secondary">Timestamp ↓</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sessionListItems.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`w-full text-left px-3 py-3 border-b border-sf-border text-xs hover:bg-sf-row-hover ${
              session.id === activeSessionId ? "bg-sf-sidebar-active" : ""
            }`}
            tabIndex={0}
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3 h-3 rounded border-sf-border"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Select session ${session.sessionId}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sf-text font-medium truncate">
                  {session.timestamp}
                </p>
                <p className="text-sf-text-secondary truncate">
                  {session.sessionId}
                </p>
                <p className="text-sf-text-secondary truncate">
                  {session.agentName}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
